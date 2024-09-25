package dccs.academy.services;

import dccs.academy.dtos.UserDto;
import dccs.academy.entities.DepartmentEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.exceptions.DuplicateException;
import dccs.academy.repositories.DepartmentRepository;
import dccs.academy.repositories.UserRepository;
import dccs.academy.transfomers.UserTransformer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    DepartmentRepository departmentRepository;

    @Inject
    UserTransformer userTransformer;

    public List<UserDto> getUsers() {
        List<UserEntity> userEntities = userRepository.listAll();
        return userEntities.stream().map(userTransformer::toDto).collect(Collectors.toList());
    }

    public List<UserDto> searchUsers(String firstName, String lastName, String userIndex, String email, String plant, String departmentName) {
        List<UserEntity> userEntities = userRepository.search(firstName, lastName, userIndex, email, plant, departmentName);
        return userEntities.stream().map(userTransformer::toDto).collect(Collectors.toList());
    }

    public UserDto createUser(UserDto userDto) {
        DepartmentEntity department = departmentRepository.findById(userDto.getDepartmentId());
        if (department == null) {
            throw new NotFoundException("Department with ID " + userDto.getDepartmentId() + " not found");
        }

        UserEntity existingUser = userRepository.find("userIndex", userDto.getUserIndex()).firstResult();
        if (existingUser != null) {
            throw new DuplicateException("User with index " + userDto.getUserIndex() + " already exists");
        }

        UserEntity existingEmailUser = userRepository.find("email", userDto.getEmail()).firstResult();
        if (existingEmailUser != null) {
            throw new DuplicateException("Email " + userDto.getEmail() + " is already in use");
        }

        UserEntity userEntity = userTransformer.toEntity(userDto);
        userEntity.setDepartment(department);

        userRepository.persist(userEntity);
        userDto.setId(userEntity.getId());
        return userDto;
    }

    public UserDto updateUser(Long id, UserDto userDto) {
        UserEntity userEntity = userRepository.findById(id);
        if (userEntity == null) {
            throw new NotFoundException("User with ID " + id + " not found");
        }

        UserEntity existingEmailUser = userRepository.find("email", userDto.getEmail()).firstResult();
        if (existingEmailUser != null && !existingEmailUser.getId().equals(id)) {
            throw new DuplicateException("Email " + userDto.getEmail() + " is already in use");
        }

        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setUserIndex(userDto.getUserIndex());
        userEntity.setPlant(userDto.getPlant());
        userRepository.persist(userEntity);

        return userTransformer.toDto(userEntity);
    }

    public UserDto getUser(Long id) {
        UserEntity userEntity = userRepository.findById(id);
        if(userEntity == null) {
            throw new NotFoundException("User with ID " + id + " not found");
        }
        return userTransformer.toDto(userEntity);
    }

    public String deleteUser(Long id) {
        UserEntity userEntity = userRepository.findById(id);
        if(userEntity == null) {
            throw new NotFoundException("User with ID " + id + " not found");
        }
        userRepository.delete(userEntity);
        return "User with ID " + id + " was successfully deleted";
    }

    public Set<UserEntity> getValidUsers(Set<Long> userIds, UserRepository userRepository) {
        if (userIds == null || userIds.isEmpty()) return new HashSet<>();

        return userIds.stream()
                .map(userId -> {
                    UserEntity userEntity = userRepository.findById(userId);
                    if (userEntity == null) {
                        throw new NotFoundException("User with ID " + userId + " not found");
                    }
                    return userEntity;
                })
                .collect(Collectors.toSet());
    }
}