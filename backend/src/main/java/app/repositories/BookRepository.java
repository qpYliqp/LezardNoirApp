package app.repositories;

import app.models.Book;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long>, JpaSpecificationExecutor<Book> {

    @NonNull
    List<Book> findAll();

    List<Book> findAllByTitleStartingWithIgnoreCase(String letter);

    @Query(value = "SELECT DISTINCT LEFT(b.title, 1) AS letter " +
            "FROM book b " +
            "WHERE b.title IS NOT NULL AND b.title != '' " +
            "ORDER BY letter ASC",
            nativeQuery = true)
    List<String> findAllAvailableLetters();


}
