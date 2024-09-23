package dccs.academy.utils;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.List;

public class CriteriaUtils {

    public static <T> void addLikePredicate(List<Predicate> predicates, CriteriaBuilder cb, Root<T> root, String field, String value) {
        if (value != null && !value.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(field)), "%" + value.toLowerCase() + "%"));
        }
    }

    public static <T> void addNestedLikePredicate(List<Predicate> predicates, CriteriaBuilder cb, Root<T> root, String field, String nestedField, String value) {
        if (value != null && !value.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(field).get(nestedField)), "%" + value.toLowerCase() + "%"));
        }
    }
}