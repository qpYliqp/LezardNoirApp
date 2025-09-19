package app.models.filters;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Getter @Setter @NoArgsConstructor
public class BookFilter {
    private String sortBy = "title";
    Sort.Direction sort = Sort.Direction.ASC;
}
