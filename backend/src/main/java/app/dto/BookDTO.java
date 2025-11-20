package app.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class BookDTO {
    private long id;
    private String title;
    private float price;
    private int pages;
    private String isbn;
    private String nuart;
    private String note;
    private String summary;
    private String hook;
    private String marketing;
    private StatusDTO globalStatus;
    private Set<AuthorDTO> authors;
    private String coverFileName;
    private String coverUrl;
    private LocalDate releaseDate;
    private Set<BookStepDTO> bookSteps;

}
