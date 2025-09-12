package app.repositories;

import app.models.Book;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {

    @NonNull
    List<Book> findAll();

}
