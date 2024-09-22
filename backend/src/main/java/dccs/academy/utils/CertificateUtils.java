package dccs.academy.utils;

import dccs.academy.entities.SupplierEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.SupplierRepository;
import dccs.academy.repositories.UserRepository;
import jakarta.ws.rs.NotFoundException;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class CertificateUtils {

    public static SupplierEntity getValidSupplier(Long supplierId, SupplierRepository supplierRepository) {
        if (supplierId == null) return null;

        SupplierEntity supplier = supplierRepository.findById(supplierId);
        if (supplier == null) {
            throw new NotFoundException("Supplier with ID " + supplierId + " not found");
        }
        return supplier;
    }

    public static Set<UserEntity> getValidUsers(Set<Long> userIds, UserRepository userRepository) {
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