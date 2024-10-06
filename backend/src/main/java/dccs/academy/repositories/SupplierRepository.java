package dccs.academy.repositories;

import dccs.academy.entities.SupplierEntity;
import dccs.academy.entities.SupplierEntity_;
import dccs.academy.utils.CriteriaUtils;
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

    CriteriaUtils.addLikePredicate(predicates, cb, supplier, SupplierEntity_.name, name);
    CriteriaUtils.addLikePredicate(
        predicates, cb, supplier, SupplierEntity_.supplierIndex, supplierIndex);
    CriteriaUtils.addLikePredicate(predicates, cb, supplier, SupplierEntity_.city, city);

    cq.where(predicates.toArray(new Predicate[0]));

    return getEntityManager().createQuery(cq).getResultList();
  }
}
