package app.controllers;

import app.dto.AuthorDTO;
import app.dto.BookDTO;
import app.dto.StatusDTO;
import app.models.Status;
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
    public BookDTO addAuthor(@PathVariable Long bookId, @RequestBody AuthorDTO author) {
        return this.bookService.addAuthor(bookId, author.getId());
    }

    @PostMapping("{bookId}/update/status")
    public BookDTO updateGlobalStatus(@PathVariable Long bookId, @RequestBody StatusDTO status) {
        return this.bookService.updateGlobalStatus(bookId, status.getId());
    }

}
