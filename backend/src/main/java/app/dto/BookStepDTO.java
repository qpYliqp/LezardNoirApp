package app.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookStepDTO {

    private long id;
    private ProductionStepDTO step;
    private StatusDTO status;
    private LocalDate endDate;
}
