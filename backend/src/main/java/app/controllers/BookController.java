package app.controllers;

import app.dto.BookDTO;
import app.exceptions.BookException;
import app.mappers.BookMapper;
import app.models.Book;
import app.repositories.BookRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RequestMapping("/books")
@RestController
public class BookController {

    private final BookRepository bookRepository;

    public BookController(final BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(BookMapper.INSTANCE::toDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public BookDTO getBookById(@PathVariable Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookException("Book not found with id: " + id));
        return BookMapper.INSTANCE.toDTO(book);
    }
}
