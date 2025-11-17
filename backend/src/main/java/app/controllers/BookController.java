package app.controllers;

import app.dto.AuthorDTO;
import app.dto.BookDTO;
import app.dto.BookUpdateDTO;
import app.dto.StatusDTO;
import app.services.BookService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequestMapping("/books")
@RestController
public class BookController {

    private static final Logger log = LoggerFactory.getLogger(BookController.class);
    private final BookService bookService;

    public BookController(final BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks(@RequestParam(required = false) String startWithPrefix) {
        log.debug("GET /books - prefix: {}", startWithPrefix);
        return ResponseEntity.ok(this.bookService.getAllBooks(startWithPrefix));
    }

    @GetMapping("/letter")
    public ResponseEntity<Map<String, List<BookDTO>>> getAllBooksGroupedByLetter() {
        log.debug("GET /books/letter");
        return ResponseEntity.ok(this.bookService.getAllBooksGroupedByLetter());
    }

    @GetMapping("/letters-available")
    public ResponseEntity<List<String>> getAllBooksAvailableLetter() {
        log.debug("GET /books/letters-available");
        return ResponseEntity.ok(this.bookService.getAllBooksAvailableLetter());
    }

    @GetMapping("/id")
    public ResponseEntity<BookDTO> getBookById(@RequestParam(required = true) Long bookId) {
        log.debug("GET /books/id - bookId: {}", bookId);
        return ResponseEntity.ok(this.bookService.getBookById(bookId));
    }

    @PostMapping("{bookId}/add/author")
    public ResponseEntity<BookDTO> addAuthor(@PathVariable Long bookId, @RequestBody AuthorDTO author) {
        log.debug("POST /books/{}/add/author", bookId);
        return ResponseEntity.ok(this.bookService.addAuthor(bookId, author.getId()));
    }

    @PostMapping("{bookId}/update/status")
    public ResponseEntity<BookDTO> updateGlobalStatus(@PathVariable Long bookId, @RequestBody StatusDTO status) {
        log.debug("POST /books/{}/update/status", bookId);
        return ResponseEntity.ok(this.bookService.updateGlobalStatus(bookId, status.getId()));
    }

    @PostMapping
    public ResponseEntity<BookDTO> createBook(
            @RequestPart("book") @Valid BookUpdateDTO book,
            @RequestPart(value = "coverFile", required = false) MultipartFile coverFile) {
        log.info("POST /books - Creating book: {}", book.getTitle());
        BookDTO createdBook = bookService.createBook(book, coverFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

}
