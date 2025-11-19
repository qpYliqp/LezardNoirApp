package app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookStepDTO {
    @NotNull(message = "BookStep ID ne peut pas être null")
    private Long id;
    private ProductionStepDTO productionStep;
    private StatusDTO status;
    private LocalDate endDate;
}
