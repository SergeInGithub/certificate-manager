package dccs.academy.seeds;

import dccs.academy.entities.SupplierEntity;
import dccs.academy.repositories.SupplierRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.jboss.logging.Logger;


@ApplicationScoped
public class SupplierSeeder {

    private static final Logger LOGGER = Logger.getLogger(SupplierSeeder.class);

    @Inject
    SupplierRepository supplierRepository;

    @Transactional
    public void seed() {
        if(supplierRepository.count() == 0) {
            LOGGER.info("Seeding suppliers...");

            SupplierEntity supplier1 = new SupplierEntity();
            supplier1.setName("ANDEMIS GmbH");
            supplier1.setSupplierIndex("1");
            supplier1.setCity("Stuttgart");

            SupplierEntity supplier2 = new SupplierEntity();
            supplier2.setName("DAIMLER AG");
            supplier2.setSupplierIndex("1");
            supplier2.setCity("Berlin");

            supplierRepository.persist(supplier1, supplier2);

            LOGGER.info("Suppliers seeded");
        }
    }
}
