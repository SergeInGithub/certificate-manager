package dccs.academy.services;

import dccs.academy.dtos.DepartmentDto;
import dccs.academy.entities.DepartmentEntity;
import dccs.academy.repositories.DepartmentRepository;
import dccs.academy.transfomers.DepartmentTransformer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class DepartmentService {

    @Inject
    DepartmentRepository departmentRepository;

    @Inject
    DepartmentTransformer departmentTransformer;

    public List<DepartmentDto> getDepartments() {
        return departmentRepository.listAll().stream()
                .map(departmentTransformer::toDto)
                .collect(Collectors.toList());
    }

    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        DepartmentEntity departmentEntity = departmentTransformer.toEntity(departmentDto);
        departmentRepository.persist(departmentEntity);
        departmentDto.setId(departmentEntity.getId());
        return departmentDto;
    }

    public DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id);
        if (departmentEntity == null) {
            throw new NotFoundException("Department with id " + id + " not found");
        }
        departmentEntity.setName(departmentDto.getName());
        departmentEntity.setDescription(departmentDto.getDescription());
        return departmentTransformer.toDto(departmentEntity);
    }

    public DepartmentDto getDepartment(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id);
        if(departmentEntity == null) {
            throw new NotFoundException("Department with id " + id + " not found");
        }
        return departmentTransformer.toDto(departmentEntity);
    }

    public String deleteDepartment(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id);
        if (departmentEntity == null) {
            throw new NotFoundException("Department with id " + id + " not found");
        }
        departmentRepository.delete(departmentEntity);
        return "Department with id " + id + " was successfully deleted";
    }
}