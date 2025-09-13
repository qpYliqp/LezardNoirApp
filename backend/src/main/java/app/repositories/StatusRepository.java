package app.repositories;

import app.models.Status;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StatusRepository extends CrudRepository<Status, Long> {

    @Override
    List<Status> findAll();
}
