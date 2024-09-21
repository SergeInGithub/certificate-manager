package com.example.rest.seeds;

import com.example.rest.entities.DepartmentEntity;
import com.example.rest.repositories.DepartmentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

@ApplicationScoped
public class DepartmentSeeder {

    private static final Logger LOGGER = Logger.getLogger(DepartmentSeeder.class);

    @Inject
    DepartmentRepository departmentRepository;

    @Transactional
    public void seed() {
        if (departmentRepository.count() == 0) {
            LOGGER.info("Seeding departments...");

            DepartmentEntity dept1 = new DepartmentEntity();
            dept1.setName("HR");
            dept1.setDescription("Human Resources");

            DepartmentEntity dept2 = new DepartmentEntity();
            dept2.setName("IT");
            dept2.setDescription("Information Technology");

            departmentRepository.persist(dept1, dept2);

            LOGGER.info("Departments seeded.");
        }
    }
}