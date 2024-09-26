package dccs.academy.utils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.metamodel.SingularAttribute;

import java.util.List;

public class CriteriaUtils {

    public static <T> void addLikePredicate(List<Predicate> predicates, CriteriaBuilder cb, Root<T> root, SingularAttribute<T, String> attribute, String value) {
        if (value != null && !value.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(attribute)), "%" + value.toLowerCase() + "%"));
        }
    }

    public static <T, R> void addNestedLikePredicate(List<Predicate> predicates, CriteriaBuilder cb, Root<T> root, SingularAttribute<T, R> field, SingularAttribute<R, String> nestedField, String value) {
        if (value != null && !value.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(field).get(nestedField)), "%" + value.toLowerCase() + "%"));
        }
    }
}