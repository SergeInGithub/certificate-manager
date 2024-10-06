package dccs.academy.repositories;

import dccs.academy.entities.DepartmentEntity_;
import dccs.academy.entities.UserEntity;
import dccs.academy.entities.UserEntity_;
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
public class UserRepository implements PanacheRepository<UserEntity> {

  public List<UserEntity> search(
      String firstName,
      String lastName,
      String userIndex,
      String email,
      String plant,
      String departmentName) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<UserEntity> query = cb.createQuery(UserEntity.class);
    Root<UserEntity> root = query.from(UserEntity.class);

    List<Predicate> predicates = new ArrayList<>();

    CriteriaUtils.addLikePredicate(predicates, cb, root, UserEntity_.firstName, firstName);
    CriteriaUtils.addLikePredicate(predicates, cb, root, UserEntity_.lastName, lastName);
    CriteriaUtils.addLikePredicate(predicates, cb, root, UserEntity_.userIndex, userIndex);
    CriteriaUtils.addLikePredicate(predicates, cb, root, UserEntity_.email, email);
    CriteriaUtils.addLikePredicate(predicates, cb, root, UserEntity_.plant, plant);
    CriteriaUtils.addNestedLikePredicate(
        predicates, cb, root, UserEntity_.department, DepartmentEntity_.name, departmentName);
    query.where(predicates.toArray(new Predicate[0]));
    return getEntityManager().createQuery(query).getResultList();
  }
}
