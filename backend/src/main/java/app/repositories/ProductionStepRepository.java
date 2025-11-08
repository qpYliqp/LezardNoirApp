package app.repositories;

import app.models.ProductionStep;
import lombok.NonNull;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductionStepRepository extends CrudRepository<ProductionStep, Long> {

    @NonNull
    List<ProductionStep> findAll();
}
