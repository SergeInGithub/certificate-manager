package dccs.academy.transfomers;

import dccs.academy.dtos.UserDto;
import dccs.academy.entities.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserTransformer {
    public UserDto toDto(UserEntity userEntity) {
        UserDto userDto = new UserDto();
        userDto.setId(userEntity.getId());
        userDto.setEmail(userEntity.getEmail());
        userDto.setUserIndex(userEntity.getUserIndex());
        userDto.setFirstName(userEntity.getFirstName());
        userDto.setLastName(userEntity.getLastName());
        userDto.setPlant(userEntity.getPlant());
        userDto.setDepartmentId(userEntity.getDepartment().getId());
        return userDto;
    }

    public UserEntity toEntity(UserDto userDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUserIndex(userDto.getUserIndex());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setPlant(userDto.getPlant());
        return userEntity;
    }
}
