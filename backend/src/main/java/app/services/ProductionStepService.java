package app.services;

import app.dto.ProductionStepDTO;
import app.mappers.ProductionStepMapper;
import app.repositories.ProductionStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionStepService {
    @Autowired
    ProductionStepRepository productionStepRepository;


    public List<ProductionStepDTO> getProductionSteps() {
        return this.productionStepRepository.findAll().stream().map(ProductionStepMapper.INSTANCE::toDTO).toList();
    }

}
