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

    @Query("SELECT DISTINCT UPPER(SUBSTRING(b.title, 1, 1)) " +
            "FROM Book b " +
            "WHERE b.title IS NOT NULL " +
            "ORDER BY UPPER(SUBSTRING(b.title, 1, 1)) ASC")
    List<String> findAllAvailableLetters();


}
