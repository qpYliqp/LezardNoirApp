package app.repositories.specifications;

import app.models.Book;
import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {

    public static Specification<Book> startWith(final String prefix) {
        if (prefix == null || prefix.isEmpty()) {
            return null;
        }
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        prefix.toLowerCase() + "%"
                );
    }
}
