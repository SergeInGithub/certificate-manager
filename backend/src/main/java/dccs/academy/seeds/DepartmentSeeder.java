package dccs.academy.seeds;

import dccs.academy.entities.DepartmentEntity;
import dccs.academy.repositories.DepartmentRepository;
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
            dept1.setName("IT");
            dept1.setDescription("Information Technology");

            DepartmentEntity dept2 = new DepartmentEntity();
            dept2.setName("ITM/FP");
            dept2.setDescription("ITM/FP Department");

            departmentRepository.persist(dept1, dept2);

            LOGGER.info("Departments seeded.");
        }
    }
}