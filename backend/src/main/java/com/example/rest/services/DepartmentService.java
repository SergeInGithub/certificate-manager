package com.example.rest.services;

import com.example.rest.dtos.DepartmentDto;
import com.example.rest.entities.DepartmentEntity;
import com.example.rest.exceptions.NotFoundException;
import com.example.rest.repositories.DepartmentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class DepartmentService {

    @Inject
    DepartmentRepository departmentRepository;

    public List<DepartmentDto> getDepartments() {
        return departmentRepository.listAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        DepartmentEntity departmentEntity = toEntity(departmentDto);
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
        return toDto(departmentEntity);
    }

    public DepartmentDto getDepartment(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id);
        if(departmentEntity == null) {
            throw new NotFoundException("Department with id " + id + " not found");
        }
        return toDto(departmentEntity);
    }

    public String deleteDepartment(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id);
        if (departmentEntity == null) {
            throw new NotFoundException("Department with id " + id + " not found");
        }
        departmentRepository.delete(departmentEntity);
        return "Department with id " + id + " was successfully deleted";
    }

    private DepartmentDto toDto(DepartmentEntity departmentEntity) {
        DepartmentDto departmentDto = new DepartmentDto();
        departmentDto.setId(departmentEntity.getId());
        departmentDto.setName(departmentEntity.getName());
        departmentDto.setDescription(departmentEntity.getDescription());
        return departmentDto;
    }

    private DepartmentEntity toEntity(DepartmentDto departmentDto) {
        DepartmentEntity departmentEntity = new DepartmentEntity();
        departmentEntity.setName(departmentDto.getName());
        departmentEntity.setDescription(departmentDto.getDescription());
        return departmentEntity;
    }
}