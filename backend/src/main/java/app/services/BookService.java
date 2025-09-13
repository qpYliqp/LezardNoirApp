package app.services;

import app.dto.BookDTO;
import app.exceptions.AuthorException;
import app.exceptions.BookException;
import app.exceptions.StatusException;
import app.mappers.BookMapper;
import app.models.Author;
import app.models.Book;
import app.models.Status;
import app.repositories.AuthorRepository;
import app.repositories.BookRepository;
import app.repositories.StatusRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    private final StatusRepository statusRepository;



    public BookService(final BookRepository bookRepository, final AuthorRepository authorRepository, final StatusRepository statusRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.statusRepository = statusRepository;

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
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> new BookException("Book not found with bookId: " + bookId));

        Author author = this.authorRepository.findById(authorId)
                .orElseThrow(() -> new AuthorException("Author not found with authorId: " + authorId));

        book.addAuthor(author);
        BookDTO dto = BookMapper.INSTANCE.toDTO(book);
        System.out.println(dto.getPrice());
        return dto;
    }

    @Transactional
    public BookDTO updateGlobalStatus(Long bookId, Long statusId)
    {
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> new BookException("Book not found with bookId: " + bookId));
        Status status = this.statusRepository.findById(statusId)
                .orElseThrow(() -> new StatusException("Author not found with authorId: " + statusId));
        book.setGlobalStatus(status);
        return BookMapper.INSTANCE.toDTO(book);
    }
}
