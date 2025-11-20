package app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookStepCreationDTO {

    @NotNull(message = "Production step is required")
    private ProductionStepDTO productionStep;

    @NotNull(message = "Status is required")
    private StatusDTO status;

    private LocalDate endDate;
}
