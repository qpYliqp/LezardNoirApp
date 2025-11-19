package app.repositories;

import app.models.BookStep;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookStepRepository extends CrudRepository<BookStep, Long> {

    @NonNull
    List<BookStep> findAll();

    @Override
    List<BookStep> findAllById(Iterable<Long> ids);
}
