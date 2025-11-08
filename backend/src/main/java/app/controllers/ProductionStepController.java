package app.controllers;

import app.dto.ProductionStepDTO;
import app.services.ProductionStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/production-step")
@RestController
public class ProductionStepController {

    @Autowired
    private ProductionStepService productionStepService;

    @GetMapping
    public List<ProductionStepDTO> getProductionSteps() {
        return this.productionStepService.getProductionSteps();
    }
}
