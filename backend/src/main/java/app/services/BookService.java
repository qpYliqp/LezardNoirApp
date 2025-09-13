package app.services;

import app.dto.BookDTO;
import app.exceptions.AuthorException;
import app.exceptions.BookException;
import app.mappers.BookMapper;
import app.models.Author;
import app.models.Book;
import app.repositories.AuthorRepository;
import app.repositories.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    public BookService(final BookRepository bookRepository, final AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Transactional(readOnly = true)
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(BookMapper.INSTANCE::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public BookDTO getBookById(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookException("Book not found with bookId: " + bookId));
        return BookMapper.INSTANCE.toDTO(book);
    }

    @Transactional
    public BookDTO addAuthor(Long bookId, Long authorId)
    {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookException("Book not found"));

        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new AuthorException("Author not found"));

        book.addAuthor(author);
        return BookMapper.INSTANCE.toDTO(book);
    }
}
