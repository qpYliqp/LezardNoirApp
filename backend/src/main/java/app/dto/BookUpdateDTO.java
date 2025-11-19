package app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class BookUpdateDTO {
    private long id;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;

    @Positive(message = "Price must be positive")
    private Float price;

    @Min(value = 1, message = "Pages must be at least 1")
    private Integer pages;

    private String isbn;
    private String nuart;
    private String note;
    private String summary;
    private String hook;
    private String marketing;
    private Set<AuthorDTO> authors;
    private LocalDate releaseDate;
    private Set<BookStepDTO> bookSteps;
}
