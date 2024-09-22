package dccs.academy.repositories;

import dccs.academy.entities.SupplierEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class SupplierRepository implements PanacheRepository<SupplierEntity> {

    public List<SupplierEntity> searchSuppliers(String name, String supplierIndex, String city) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<SupplierEntity> cq = cb.createQuery(SupplierEntity.class);
        Root<SupplierEntity> supplier = cq.from(SupplierEntity.class);

        List<Predicate> predicates = new ArrayList<>();

        if (name != null && !name.isEmpty()) {
            predicates.add(cb.like(cb.lower(supplier.get("name")), "%" + name.toLowerCase() + "%"));
        }

        if (supplierIndex != null && !supplierIndex.isEmpty()) {
            predicates.add(cb.like(cb.lower(supplier.get("supplierIndex")), "%" + supplierIndex.toLowerCase() + "%"));
        }

        if (city != null && !city.isEmpty()) {
            predicates.add(cb.like(cb.lower(supplier.get("city")), "%" + city.toLowerCase() + "%"));
        }

        cq.where(predicates.toArray(new Predicate[0]));

        return getEntityManager().createQuery(cq).getResultList();
    }
}
