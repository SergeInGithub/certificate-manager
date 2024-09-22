package dccs.academy.seeds;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class DataSeederManager {

    @Inject
    DepartmentSeeder departmentSeeder;

    @Inject
    UserSeeder userSeeder;

    @Inject SupplierSeeder supplierSeeder;

    @Transactional
    public void seedData(@Observes StartupEvent event) {
        departmentSeeder.seed();
        userSeeder.seed();
        supplierSeeder.seed();
    }
}