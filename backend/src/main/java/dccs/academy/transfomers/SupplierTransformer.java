package dccs.academy.transfomers;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.entities.SupplierEntity;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SupplierTransformer {
    public SupplierDto toDto(SupplierEntity supplierEntity) {
        SupplierDto supplierDto = new SupplierDto();
        supplierDto.setId(supplierEntity.getId());
        supplierDto.setSupplierIndex(supplierEntity.getSupplierIndex());
        supplierDto.setName(supplierEntity.getName());
        supplierDto.setCity(supplierEntity.getCity());
        return supplierDto;
    }

    public SupplierEntity toEntity(SupplierDto supplierDto) {
        SupplierEntity supplierEntity = new SupplierEntity();
        supplierEntity.setSupplierIndex(supplierDto.getSupplierIndex());
        supplierEntity.setName(supplierDto.getName());
        supplierEntity.setCity(supplierDto.getCity());
        return supplierEntity;
    }

}
