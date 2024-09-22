package dccs.academy.transfomers;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.dtos.UserDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class CertificateTransformer {


    @Inject
    UserTransformer userTransformer;

    public CertificateDto toDto(CertificateEntity certificateEntity) {
        CertificateDto certificateDto = new CertificateDto();
        certificateDto.setId(certificateEntity.getId());
        certificateDto.setType(certificateEntity.getType());
        certificateDto.setValidFrom(certificateEntity.getValidFrom());
        certificateDto.setValidTo(certificateEntity.getValidTo());
        certificateDto.setSupplierId(certificateEntity.getSupplier().getId());
        certificateDto.setFileUrl(certificateEntity.getFileUrl());

        Set<Long> assignedUserIds = certificateEntity.getAssignedUsers().stream()
                .map(UserEntity::getId)
                .collect(Collectors.toSet());
        certificateDto.setAssignedUserIds(assignedUserIds);

        Set<UserDto> assignedUsers = certificateEntity.getAssignedUsers().stream()
                .map(userTransformer::toDto)
                .collect(Collectors.toSet());
        certificateDto.setAssignedUsers(assignedUsers);

        return certificateDto;
    }

    public CertificateEntity toEntity(CertificateDto certificateDto) {
        CertificateEntity certificateEntity = new CertificateEntity();
        certificateEntity.setType(certificateDto.getType());
        certificateEntity.setValidFrom(certificateDto.getValidFrom());
        certificateEntity.setValidTo(certificateDto.getValidTo());
        certificateEntity.setFileUrl(certificateDto.getFileUrl());
        return certificateEntity;
    }
}
