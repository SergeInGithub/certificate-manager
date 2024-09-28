package dccs.academy.services;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.CommentEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.CertificateRepository;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.repositories.UserRepository;
import dccs.academy.transfomers.CertificateTransformer;
import dccs.academy.transfomers.CommentTransformer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class CertificateService {

    @Inject
    CertificateRepository certificateRepository;

    @Inject
    SupplierRepository supplierRepository;

    @Inject
    UserRepository userRepository;

    @Inject
    CertificateTransformer certificateTransformer;

    @Inject SupplierService supplierService;

    @Inject
    UserService userService;

    @Inject
    CommentTransformer commentTransformer;

    public List<CertificateDto> getCertificates() {
        List<CertificateEntity> certificateEntities = certificateRepository.listAll();
        return certificateEntities.stream().map(certificateTransformer::toDto).collect(Collectors.toList());
    }

    public CertificateDto createCertificate(CertificateDto certificateDto) {
        CertificateEntity certificateEntity = certificateTransformer.toEntity(certificateDto);
        certificateEntity.setSupplier(supplierService.getValidSupplier(certificateDto.getSupplier().getId(), supplierRepository));
        certificateEntity.setAssignedUsers(userService.getValidUsers(certificateDto.getAssignedUserIds(), userRepository));

        if (certificateDto.getComments() != null) {
            List<CommentEntity> commentEntities = certificateDto.getComments().stream()
                    .map(commentDto -> {
                        CommentEntity commentEntity = commentTransformer.toEntity(commentDto);

                        Set<Long> userIdSet = Collections.singleton(commentDto.getUserId());
                        UserEntity user = userService.getValidUsers(userIdSet, userRepository).iterator().next();

                        commentEntity.setUser(user);
                        commentEntity.setCertificate(certificateEntity);
                        return commentEntity;
                    })
                    .collect(Collectors.toList());

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

        existingCertificate.setSupplier(supplierService.getValidSupplier(certificateDto.getSupplier().getId(), supplierRepository));

        existingCertificate.setType(certificateDto.getType());
        existingCertificate.setValidFrom(certificateDto.getValidFrom());
        existingCertificate.setValidTo(certificateDto.getValidTo());
        existingCertificate.setFileUrl(certificateDto.getFileUrl());

        existingCertificate.setAssignedUsers(userService.getValidUsers(certificateDto.getAssignedUserIds(), userRepository));
        certificateRepository.persist(existingCertificate);
        return certificateTransformer.toDto(existingCertificate);
    }

    public CertificateDto getCertificate(Long id) {
        CertificateEntity certificateEntity = certificateRepository.findById(id);
        if(certificateEntity == null){
            throw new EntityNotFoundException("Certificate with ID " + id + " not found");
        }
        return certificateTransformer.toDto(certificateEntity);
    }

    public String deleteCertificate(Long id) {
        CertificateEntity certificateEntity = certificateRepository.findById(id);
        if(certificateEntity == null){
            throw new EntityNotFoundException("Certificate with ID " + id + " not found");
        }

        certificateRepository.delete(certificateEntity);
        return "Certificate with ID " + id + " was successfully deleted";
    }
}
