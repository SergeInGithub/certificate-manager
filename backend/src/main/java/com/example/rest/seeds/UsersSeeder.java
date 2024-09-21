package com.example.rest.seeds;

import com.example.rest.entities.DepartmentEntity;
import com.example.rest.entities.UsersEntity;
import com.example.rest.repositories.DepartmentRepository;
import com.example.rest.repositories.UsersRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

@ApplicationScoped
public class UsersSeeder {

    private static final Logger LOGGER = Logger.getLogger(UsersSeeder.class);

    @Inject
    UsersRepository usersRepository;

    @Inject
    DepartmentRepository departmentRepository;

    @Transactional
    public void seed() {
        if (usersRepository.count() == 0) {
            LOGGER.info("Seeding users...");

            DepartmentEntity hrDepartment = departmentRepository.findById(1L);
            DepartmentEntity itDepartment = departmentRepository.findById(2L);

            UsersEntity user1 = new UsersEntity();
            user1.setName("John");
            user1.setFirstName("Doe");
            user1.setUserIndex("JD01");
            user1.setPlant(1L);
            user1.setDepartment(hrDepartment);

            UsersEntity user2 = new UsersEntity();
            user2.setName("Jane");
            user2.setFirstName("Smith");
            user2.setUserIndex("JS02");
            user2.setPlant(1L);
            user2.setDepartment(itDepartment);

            usersRepository.persist(user1, user2);

            LOGGER.info("Users seeded.");
        }
    }
}