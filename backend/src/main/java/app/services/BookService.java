package app.services;

import app.dto.BookDTO;
import app.dto.BookUpdateDTO;
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
import app.repositories.specifications.BookSpecification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookService {

    private final BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    private final StatusRepository statusRepository;

    private final MinioService minioService;

    public BookService(final BookRepository bookRepository, final AuthorRepository authorRepository, final StatusRepository statusRepository, final MinioService minioService) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.statusRepository = statusRepository;
        this.minioService = minioService;
    }

    @Transactional(readOnly = true)
    public List<BookDTO> getAllBooks(String startWithPrefix) {
        return this.bookRepository.findAll(BookSpecification.startWith(startWithPrefix))
                .stream()
                .map(this::mapToBookDTOWithUrl)
                .toList();
    }

    @Transactional(readOnly = true)
    public Map<String, List<BookDTO>> getAllBooksGroupedByLetter() throws Exception {
        Map<String, List<BookDTO>> groupedBooks = new LinkedHashMap<>();

        List<String> letters = this.bookRepository.findAllAvailableLetters();

        letters.forEach(letter -> {
            List<BookDTO> books = this.bookRepository
                    .findAllByTitleStartingWithIgnoreCase(letter)
                    .stream()
                    .map(this::mapToBookDTOWithUrl)
                    .toList();
            groupedBooks.put(letter, books);
        });

        return groupedBooks;
    }

    @Transactional(readOnly = true)
    public List<String> getAllBooksAvailableLetter() {
        return this.bookRepository.findAllAvailableLetters();
    }

    @Transactional(readOnly = true)
    public BookDTO getBookById(Long bookId) {
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> new BookException("Book not found with bookId: " + bookId));
        return BookMapper.INSTANCE.toDTO(book);
    }

    @Transactional
    public BookDTO addAuthor(Long bookId, Long authorId) {
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> new BookException("Book not found with bookId: " + bookId));

        Author author = this.authorRepository.findById(authorId)
                .orElseThrow(() -> new AuthorException("Author not found with authorId: " + authorId));

        book.addAuthor(author);
        return BookMapper.INSTANCE.toDTO(book);
    }

    @Transactional
    public BookDTO updateGlobalStatus(Long bookId, Long statusId) throws Exception {
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> new BookException("Book not found with bookId: " + bookId));
        Status status = this.statusRepository.findById(statusId)
                .orElseThrow(() -> new StatusException("Author not found with authorId: " + statusId));
        book.setGlobalStatus(status);
        return this.mapToBookDTOWithUrl(book);
    }


    @Transactional
    public BookDTO createBook(BookUpdateDTO dto) throws Exception {
        Book book = BookMapper.INSTANCE.fromupdateDTOtoEntity(dto);
        if (dto.getCoverFile() != null && !dto.getCoverFile().isEmpty()) {

            String newCoverFileName = this.minioService.updateCover(book.getCoverFileName(), dto.getCoverFile());
            book.setCoverFileName(newCoverFileName);
        }
        bookRepository.save(book);
        return mapToBookDTOWithUrl(book);
    }

    public BookDTO mapToBookDTOWithUrl(Book book) {
        BookDTO dto = BookMapper.INSTANCE.toDTO(book);
        try {
            dto.setCoverUrl(this.minioService.getCover(book.getCoverFileName()));
            return dto;
        } catch (Exception e) {
            return null;
        }
    }
}
