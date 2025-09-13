package app.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
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
}
