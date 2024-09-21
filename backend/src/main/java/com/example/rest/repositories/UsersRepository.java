package com.example.rest.repositories;

import com.example.rest.entities.UsersEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class UsersRepository implements PanacheRepository<UsersEntity> {
    // Some extra queries here
}
