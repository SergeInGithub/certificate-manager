package dccs.academy.services;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.dtos.UserDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.CertificateRepository;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.repositories.UserRepository;
import dccs.academy.transfomers.CertificateTransformer;
import dccs.academy.transfomers.UserTransformer;
import dccs.academy.utils.CertificateUtils;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

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

    public List<CertificateDto> getCertificates() {
        List<CertificateEntity> certificateEntities = certificateRepository.listAll();
        return certificateEntities.stream().map(certificateTransformer::toDto).collect(Collectors.toList());
    }

    public CertificateDto createCertificate(CertificateDto certificateDto) {
        CertificateEntity certificateEntity = certificateTransformer.toEntity(certificateDto);
        certificateEntity.setSupplier(CertificateUtils.getValidSupplier(certificateDto.getSupplierId(), supplierRepository));
        certificateEntity.setAssignedUsers(CertificateUtils.getValidUsers(certificateDto.getAssignedUserIds(), userRepository));

        certificateRepository.persist(certificateEntity);
        certificateDto.setId(certificateEntity.getId());
        return certificateDto;
    }

    public CertificateDto updateCertificate(Long id, CertificateDto certificateDto) {
        CertificateEntity existingCertificate = certificateRepository.findById(id);
        if (existingCertificate == null) {
            throw new NotFoundException("Certificate with ID " + id + " not found");
        }

        existingCertificate.setSupplier(CertificateUtils.getValidSupplier(certificateDto.getSupplierId(), supplierRepository));

        existingCertificate.setType(certificateDto.getType());
        existingCertificate.setValidFrom(certificateDto.getValidFrom());
        existingCertificate.setValidTo(certificateDto.getValidTo());
        existingCertificate.setFileUrl(certificateDto.getFileUrl());

        existingCertificate.setAssignedUsers(CertificateUtils.getValidUsers(certificateDto.getAssignedUserIds(), userRepository));

        certificateRepository.persist(existingCertificate);
        return certificateTransformer.toDto(existingCertificate);
    }

    public CertificateDto getCertificate(Long id) {
        CertificateEntity certificateEntity = certificateRepository.findById(id);
        if(certificateEntity == null){
            throw new NotFoundException("Certificate with ID " + id + " not found");
        }
        return certificateTransformer.toDto(certificateEntity);
    }

    public String deleteCertificate(Long id) {
        CertificateEntity certificateEntity = certificateRepository.findById(id);
        if(certificateEntity == null){
            throw new NotFoundException("Certificate with ID " + id + " not found");
        }

        certificateRepository.delete(certificateEntity);
        return "Certificate with ID " + id + " was successfully deleted";
    }
}
