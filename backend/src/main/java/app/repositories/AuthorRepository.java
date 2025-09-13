package app.repositories;

import app.models.Author;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AuthorRepository extends CrudRepository<Author, Long> {

    @NonNull
    List<Author> findAll();

}