package dccs.academy.services;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.dtos.CommentDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.CommentEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.CertificateRepository;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.repositories.UserRepository;
import dccs.academy.transfomers.CertificateTransformer;
import dccs.academy.transfomers.CommentTransformer;
import dccs.academy.utils.FileConversionUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class CertificateService {

  @Inject CertificateRepository certificateRepository;

  @Inject SupplierRepository supplierRepository;

  @Inject UserRepository userRepository;

  @Inject CertificateTransformer certificateTransformer;

  @Inject SupplierService supplierService;

  @Inject UserService userService;

  @Inject CommentTransformer commentTransformer;

  public List<CertificateDto> getCertificates() {
    List<CertificateEntity> certificateEntities = certificateRepository.listAll();
    return certificateEntities.stream()
        .map(certificateTransformer::toDto)
        .collect(Collectors.toList());
  }

  public CertificateDto createCertificate(CertificateDto certificateDto) {
    CertificateEntity certificateEntity = certificateTransformer.toEntity(certificateDto);
    setSupplierAndUsers(certificateDto, certificateEntity);

    if (certificateDto.getComments() != null) {
      List<CommentEntity> commentEntities =
          processComments(certificateDto.getComments(), certificateEntity);
      certificateEntity.setComments(commentEntities);
    }

    certificateRepository.persist(certificateEntity);
    return certificateTransformer.toDto(certificateEntity);
  }

  public CertificateDto updateCertificate(Long id, CertificateDto certificateDto) {
    CertificateEntity existingCertificate = certificateRepository.findById(id);
    if (existingCertificate == null) {
      throw new EntityNotFoundException("Certificate with ID " + id + " not found");
    }

    setSupplierAndUsers(certificateDto, existingCertificate);
    existingCertificate.setType(certificateDto.getType());
    existingCertificate.setValidFrom(certificateDto.getValidFrom());
    existingCertificate.setValidTo(certificateDto.getValidTo());

    if (certificateDto.getFileUrl() != null) {
      byte[] fileData = FileConversionUtil.convertBase64ToBlob(certificateDto.getFileUrl());
      existingCertificate.setFileData(fileData);
    }

    if (certificateDto.getComments() != null) {
      updateComments(certificateDto, existingCertificate);
    }

    certificateRepository.persist(existingCertificate);
    return certificateTransformer.toDto(existingCertificate);
  }

  public CertificateDto getCertificate(Long id) {
    CertificateEntity certificateEntity = certificateRepository.findById(id);
    if (certificateEntity == null) {
      throw new EntityNotFoundException("Certificate with ID " + id + " not found");
    }
    return certificateTransformer.toDto(certificateEntity);
  }

  public String deleteCertificate(Long id) {
    CertificateEntity certificateEntity = certificateRepository.findById(id);
    if (certificateEntity == null) {
      throw new EntityNotFoundException("Certificate with ID " + id + " not found");
    }

    certificateRepository.delete(certificateEntity);
    return "Certificate with ID " + id + " was successfully deleted";
  }

  private List<CommentEntity> processComments(
      List<CommentDto> commentDtos, CertificateEntity certificateEntity) {
    Set<Long> userIds = commentDtos.stream().map(CommentDto::getUserId).collect(Collectors.toSet());

    Map<Long, UserEntity> userMap =
        userService.getValidUsers(userIds, userRepository).stream()
            .collect(Collectors.toMap(UserEntity::getId, user -> user));

    return commentDtos.stream()
        .map(
            commentDto -> {
              CommentEntity commentEntity = commentTransformer.toEntity(commentDto);
              UserEntity user = userMap.get(commentDto.getUserId());

              commentEntity.setUser(user);
              commentEntity.setCertificate(certificateEntity);
              return commentEntity;
            })
        .collect(Collectors.toList());
  }

  private void updateComments(
      CertificateDto certificateDto, CertificateEntity existingCertificate) {
    List<CommentEntity> existingComments = existingCertificate.getComments();

    Set<Long> existingCommentIds =
        existingComments.stream().map(CommentEntity::getId).collect(Collectors.toSet());

    List<CommentEntity> newComments =
        processComments(
            certificateDto.getComments().stream()
                .filter(commentDto -> !existingCommentIds.contains(commentDto.getId()))
                .collect(Collectors.toList()),
            existingCertificate);

    existingComments.addAll(newComments);
    existingCertificate.setComments(existingComments);
  }

  private void setSupplierAndUsers(
      CertificateDto certificateDto, CertificateEntity certificateEntity) {
    certificateEntity.setSupplier(
        supplierService.getValidSupplier(certificateDto.getSupplier().getId(), supplierRepository));
    certificateEntity.setAssignedUsers(
        userService.getValidUsers(certificateDto.getAssignedUserIds(), userRepository));
  }
}
