package app.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookStepDTO {

    private long id;
    private ProductionStepDTO productionStep;
    private StatusDTO status;
    private LocalDate endDate;
}
