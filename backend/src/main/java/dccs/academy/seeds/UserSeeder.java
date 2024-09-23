package dccs.academy.seeds;

import dccs.academy.entities.DepartmentEntity;
import dccs.academy.entities.UserEntity;
import dccs.academy.repositories.DepartmentRepository;
import dccs.academy.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;

@ApplicationScoped
public class UserSeeder {

    private static final Logger LOGGER = Logger.getLogger(UserSeeder.class);

    @Inject
    UserRepository userRepository;

    @Inject
    DepartmentRepository departmentRepository;

    @Transactional
    public void seed() {
        if (userRepository.count() == 0) {
            LOGGER.info("Seeding users...");

            DepartmentEntity itDepartment = departmentRepository.findById(1L);
            DepartmentEntity itmFpDepartment = departmentRepository.findById(2L);

            UserEntity user1 = new UserEntity();
            user1.setLastName("Simon");
            user1.setFirstName("Zwolfer");
            user1.setUserIndex("ZWOELF");
            user1.setEmail("simonz@mail.com");
            user1.setPlant("096");
            user1.setDepartment(itmFpDepartment);

            UserEntity user2 = new UserEntity();
            user2.setLastName("Wolfgang");
            user2.setFirstName("Tony");
            user2.setUserIndex("WOLFST");
            user2.setEmail("wolfgangs@mail.com");
            user2.setPlant("094");
            user2.setDepartment(itmFpDepartment);

            UserEntity user3 = new UserEntity();
            user3.setLastName("John");
            user3.setFirstName("Doe");
            user3.setUserIndex("DOJOH");
            user3.setEmail("johndoe@mail.com");
            user3.setPlant("094");
            user3.setDepartment(itDepartment);

            userRepository.persist(user1, user2, user3);

            LOGGER.info("Users seeded.");
        }
    }
}