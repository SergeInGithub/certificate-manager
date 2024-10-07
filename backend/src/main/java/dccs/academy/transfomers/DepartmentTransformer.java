package dccs.academy.transfomers;

import dccs.academy.dtos.DepartmentDto;
import dccs.academy.entities.DepartmentEntity;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DepartmentTransformer {
  public DepartmentDto toDto(DepartmentEntity departmentEntity) {
    DepartmentDto departmentDto = new DepartmentDto();
    departmentDto.setId(departmentEntity.getId());
    departmentDto.setName(departmentEntity.getName());
    departmentDto.setDescription(departmentEntity.getDescription());
    return departmentDto;
  }

  public DepartmentEntity toEntity(DepartmentDto departmentDto) {
    DepartmentEntity departmentEntity = new DepartmentEntity();
    departmentEntity.setName(departmentDto.getName());
    departmentEntity.setDescription(departmentDto.getDescription());
    return departmentEntity;
  }
}
