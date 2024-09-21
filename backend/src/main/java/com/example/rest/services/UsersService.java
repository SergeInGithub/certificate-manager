package com.example.rest.services;

import com.example.rest.dtos.UsersDto;
import com.example.rest.entities.DepartmentEntity;
import com.example.rest.entities.UsersEntity;
import com.example.rest.exceptions.DuplicateException;
import com.example.rest.exceptions.NotFoundException;
import com.example.rest.repositories.DepartmentRepository;
import com.example.rest.repositories.UsersRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class UsersService {

    @Inject
    UsersRepository usersRepository;

    @Inject
    DepartmentRepository departmentRepository;

    public List<UsersDto> getUsers() {
        List<UsersEntity> userEntities = usersRepository.listAll();
        return userEntities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public UsersDto createUser(UsersDto usersDto) {
        DepartmentEntity department = departmentRepository.findById(usersDto.getDepartmentId());
        if (department == null) {
            throw new NotFoundException("Department with ID " + usersDto.getDepartmentId() + " not found");
        }

        UsersEntity existingUser = usersRepository.find("userIndex", usersDto.getUserIndex()).firstResult();
        if (existingUser != null) {
            throw new DuplicateException("User with index " + usersDto.getUserIndex() + " already exists");
        }

        UsersEntity usersEntity = toEntity(usersDto);
        usersEntity.setDepartment(department);

        usersRepository.persist(usersEntity);
        usersDto.setId(usersEntity.getId());
        return usersDto;
    }

    public UsersDto updateUser(Long id, UsersDto usersDto) {
        UsersEntity usersEntity = usersRepository.findById(id);
        if (usersEntity == null) {
            throw new NotFoundException("User with ID " + id + " not found");
        }

        usersEntity.setName(usersDto.getName());
        usersEntity.setFirstName(usersDto.getFirstName());
        usersEntity.setUserIndex(usersDto.getUserIndex());
        usersEntity.setPlant(usersDto.getPlant());
        usersRepository.persist(usersEntity);

        return toDto(usersEntity);
    }

    public UsersDto getUser(Long id) {
        UsersEntity usersEntity = usersRepository.findById(id);
        if(usersEntity == null) {
            throw new NotFoundException("User with ID " + id + " not found");
        }
        return toDto(usersEntity);
    }

    public String deleteUser(Long id) {
        UsersEntity usersEntity = usersRepository.findById(id);
        if(usersEntity == null) {
            throw new NotFoundException("User with ID " + id + " not found");
        }
        usersRepository.delete(usersEntity);
        return "User with ID " + id + " was successfully deleted";
    }

    private UsersDto toDto(UsersEntity usersEntity) {
        UsersDto usersDto = new UsersDto();
        usersDto.setId(usersEntity.getId());
        usersDto.setUserIndex(usersEntity.getUserIndex());
        usersDto.setName(usersEntity.getName());
        usersDto.setFirstName(usersEntity.getFirstName());
        usersDto.setPlant(usersEntity.getPlant());
        usersDto.setDepartmentId(usersEntity.getDepartment().getId());
        return usersDto;
    }

    private UsersEntity toEntity(UsersDto usersDto) {
        UsersEntity usersEntity = new UsersEntity();
        usersEntity.setUserIndex(usersDto.getUserIndex());
        usersEntity.setName(usersDto.getName());
        usersEntity.setFirstName(usersDto.getFirstName());
        usersEntity.setPlant(usersDto.getPlant());
        return usersEntity;
    }
}