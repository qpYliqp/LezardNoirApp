package app.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class BookUpdateDTO {
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
}
