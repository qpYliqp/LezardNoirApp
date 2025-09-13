package app.controllers;

import app.dto.AuthorDTO;
import app.dto.BookDTO;
import app.exceptions.BookException;
import app.mappers.BookMapper;
import app.models.Author;
import app.models.Book;
import app.repositories.AuthorRepository;
import app.repositories.BookRepository;
import app.services.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/books")
@RestController
public class BookController {

    private final BookService bookService;


    public BookController(final BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<BookDTO> getAllBooks() {
        return this.bookService.getAllBooks();
    }

    @GetMapping("{bookId}")
    public BookDTO getBookById(@PathVariable Long bookId) {
        return this.bookService.getBookById(bookId);
    }

    @PostMapping("{bookId}/add/author")
    public BookDTO addAuthorToBook(@PathVariable Long bookId, @RequestBody AuthorDTO author) {
        return this.bookService.addAuthor(bookId, author.getId());
    }

}
