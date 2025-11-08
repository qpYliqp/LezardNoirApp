package app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookStepDTO {

    private long id;
    private ProductionStepDTO step;
    private StatusDTO status;
}
