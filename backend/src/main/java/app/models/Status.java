package app.models;

import app.enums.StatusName;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(unique = true)
    private StatusName code;

    @OneToMany(mappedBy = "globalStatus", fetch = FetchType.LAZY)
    private List<Book> books = new ArrayList<>();

    public void addBook(Book book) {
        this.books.add(book);
        book.setGlobalStatus(this);
    }

    public void removeBook(Book book) {
        this.books.remove(book);
        book.setGlobalStatus(null);
    }

}
