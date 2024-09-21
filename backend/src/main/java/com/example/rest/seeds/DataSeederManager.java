package com.example.rest.seeds;

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
    UsersSeeder usersSeeder;

    @Transactional
    public void seedData(@Observes StartupEvent event) {
        departmentSeeder.seed();
        usersSeeder.seed();
    }
}