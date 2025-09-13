package app.dto;

import app.enums.StatusName;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StatusDTO {
    private Long id;
    private String name;
    private StatusName code;
}
