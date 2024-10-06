package dccs.academy.services;

import dccs.academy.dtos.SupplierDto;
import dccs.academy.entities.SupplierEntity;
import dccs.academy.exceptions.DuplicateException;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.transfomers.SupplierTransformer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class SupplierService {

  @Inject SupplierRepository supplierRepository;

  @Inject SupplierTransformer supplierTransformer;

  public List<SupplierDto> getSuppliers() {
    List<SupplierEntity> supplierEntities = supplierRepository.listAll();
    return supplierEntities.stream().map(supplierTransformer::toDto).collect(Collectors.toList());
  }

  public List<SupplierDto> searchSuppliers(String name, String supplierIndex, String city) {
    List<SupplierEntity> suppliers = supplierRepository.searchSuppliers(name, supplierIndex, city);
    return suppliers.stream().map(supplierTransformer::toDto).collect(Collectors.toList());
  }

  public SupplierDto createSupplier(SupplierDto supplierDto) {
    SupplierEntity existingSupplier =
        supplierRepository.find("supplierIndex", supplierDto.getSupplierIndex()).firstResult();
    if (existingSupplier != null) {
      throw new DuplicateException(
          "Supplier with index " + supplierDto.getSupplierIndex() + " already exists");
    }

    SupplierEntity supplierEntity = supplierTransformer.toEntity(supplierDto);
    supplierRepository.persist(supplierEntity);
    supplierDto.setId(supplierEntity.getId());
    return supplierDto;
  }

  public SupplierDto updateSupplier(Long id, SupplierDto supplierDto) {
    SupplierEntity supplierEntity = supplierRepository.findById(id);
    if (supplierEntity == null) {
      throw new EntityNotFoundException("Supplier with ID " + id + " not found");
    }

    supplierEntity.setName(supplierDto.getName());
    supplierEntity.setSupplierIndex(supplierDto.getSupplierIndex());
    supplierEntity.setCity(supplierDto.getCity());
    supplierRepository.persist(supplierEntity);

    return supplierTransformer.toDto(supplierEntity);
  }

  public SupplierDto getSupplier(Long id) {
    SupplierEntity supplierEntity = supplierRepository.findById(id);
    if (supplierEntity == null) {
      throw new EntityNotFoundException("Supplier with ID " + id + " not found");
    }
    return supplierTransformer.toDto(supplierEntity);
  }

  public String deleteSupplier(Long id) {
    SupplierEntity supplierEntity = supplierRepository.findById(id);
    if (supplierEntity == null) {
      throw new EntityNotFoundException("Supplier with ID " + id + " not found");
    }
    supplierRepository.delete(supplierEntity);
    return "Supplier with ID " + id + " was successfully deleted";
  }

  public SupplierEntity getValidSupplier(Long supplierId, SupplierRepository supplierRepository) {
    if (supplierId == null) return null;

    SupplierEntity supplier = supplierRepository.findById(supplierId);
    if (supplier == null) {
      throw new EntityNotFoundException("Supplier with ID " + supplierId + " not found");
    }
    return supplier;
  }
}
