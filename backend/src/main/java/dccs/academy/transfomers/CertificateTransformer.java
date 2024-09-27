package dccs.academy.transfomers;

import dccs.academy.dtos.CertificateDto;
import dccs.academy.dtos.CommentDto;
import dccs.academy.dtos.UserDto;
import dccs.academy.entities.CertificateEntity;
import dccs.academy.entities.CommentEntity;
import dccs.academy.entities.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class CertificateTransformer {

    @Inject CommentTransformer commentTransformer;

    public CertificateDto toDto(CertificateEntity certificateEntity) {
        CertificateDto certificateDto = new CertificateDto();
        SupplierTransformer supplierTransformer = new SupplierTransformer();

        certificateDto.setId(certificateEntity.getId());
        certificateDto.setType(certificateEntity.getType());
        certificateDto.setValidFrom(certificateEntity.getValidFrom());
        certificateDto.setValidTo(certificateEntity.getValidTo());
        certificateDto.setSupplier(supplierTransformer.toDto(certificateEntity.getSupplier()));
        certificateDto.setFileUrl(certificateEntity.getFileUrl());

        Set<Long> assignedUserIds = certificateEntity.getAssignedUsers().stream()
                .map(UserEntity::getId)
                .collect(Collectors.toSet());
        certificateDto.setAssignedUserIds(assignedUserIds);

        if (certificateEntity.getComments() != null) {
            List<CommentDto> commentDtos = certificateEntity.getComments().stream()
                    .map(commentTransformer::toDto)
                    .collect(Collectors.toList());
            certificateDto.setComments(commentDtos);
        }

        return certificateDto;
    }

    public CertificateEntity toEntity(CertificateDto certificateDto) {
        CertificateEntity certificateEntity = new CertificateEntity();
        certificateEntity.setType(certificateDto.getType());
        certificateEntity.setValidFrom(certificateDto.getValidFrom());
        certificateEntity.setValidTo(certificateDto.getValidTo());
        certificateEntity.setFileUrl(certificateDto.getFileUrl());

        if (certificateDto.getComments() != null) {
            List<CommentEntity> commentEntities = certificateDto.getComments().stream()
                    .map(commentTransformer::toEntity)
                    .collect(Collectors.toList());
            certificateEntity.setComments(commentEntities);
        }
        return certificateEntity;
    }
}
