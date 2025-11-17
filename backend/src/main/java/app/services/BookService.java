package app.services;

import app.dto.AuthorDTO;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {

    private static final Logger log = LoggerFactory.getLogger(BookService.class);

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
        log.debug("Fetching books with prefix: {}", startWithPrefix);
        List<BookDTO> books = this.bookRepository.findAll(BookSpecification.startWith(startWithPrefix))
                .stream()
                .map(this::mapToBookDTOWithUrl)
                .toList();
        log.info("Found {} books", books.size());
        return books;
    }

    @Transactional(readOnly = true)
    public Map<String, List<BookDTO>> getAllBooksGroupedByLetter() {
        log.debug("Fetching books grouped by letter");
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

        log.info("Found books for {} letters", letters.size());
        return groupedBooks;
    }

    @Transactional(readOnly = true)
    public List<String> getAllBooksAvailableLetter() {
        return this.bookRepository.findAllAvailableLetters();
    }

    @Transactional(readOnly = true)
    public BookDTO getBookById(Long bookId) {
        log.debug("Fetching book with ID: {}", bookId);
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> {
                    log.error("Book not found with ID: {}", bookId);
                    return new BookException("Book not found with bookId: " + bookId);
                });
        log.info("Found book: {}", book.getTitle());
        return this.mapToBookDTOWithUrl(book);
    }

    @Transactional
    public BookDTO addAuthor(Long bookId, Long authorId) {
        log.debug("Adding author {} to book {}", authorId, bookId);
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> {
                    log.error("Book not found with ID: {}", bookId);
                    return new BookException("Book not found with bookId: " + bookId);
                });

        Author author = this.authorRepository.findById(authorId)
                .orElseThrow(() -> {
                    log.error("Author not found with ID: {}", authorId);
                    return new AuthorException("Author not found with authorId: " + authorId);
                });

        book.addAuthor(author);
        log.info("Added author {} to book {}", author.getName(), book.getTitle());
        return BookMapper.INSTANCE.toDTO(book);
    }

    @Transactional
    public BookDTO updateGlobalStatus(Long bookId, Long statusId) {
        log.debug("Updating status for book {} to {}", bookId, statusId);
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> {
                    log.error("Book not found with ID: {}", bookId);
                    return new BookException("Book not found with bookId: " + bookId);
                });
        Status status = this.statusRepository.findById(statusId)
                .orElseThrow(() -> {
                    log.error("Status not found with ID: {}", statusId);
                    return new StatusException("Status not found with statusId: " + statusId);
                });
        book.setGlobalStatus(status);
        log.info("Updated status for book {} to {}", book.getTitle(), status.getName());
        return this.mapToBookDTOWithUrl(book);
    }


    @Transactional
    public BookDTO createBook(BookUpdateDTO dto, MultipartFile coverFile) {
        log.info("Creating new book: {}", dto.getTitle());
        Book book = BookMapper.INSTANCE.fromupdateDTOtoEntity(dto);

        // Handle cover file upload
        if (coverFile != null && !coverFile.isEmpty()) {
            try {
                log.debug("Uploading cover file for book: {}", dto.getTitle());
                String newCoverFileName = this.minioService.updateCover(book.getCoverFileName(), coverFile);
                book.setCoverFileName(newCoverFileName);
            } catch (Exception e) {
                log.error("Failed to upload cover file for book: {}", dto.getTitle(), e);
                throw new RuntimeException("Failed to upload cover file: " + e.getMessage());
            }
        }

        // Associate authors
        if (dto.getAuthors() != null && !dto.getAuthors().isEmpty()) {
            Set<Long> authorIds = dto.getAuthors().stream()
                    .map(AuthorDTO::getId)
                    .collect(Collectors.toSet());

            log.debug("Associating {} authors with book", authorIds.size());
            List<Author> managedAuthors = (List<Author>) authorRepository.findAllById(authorIds);
            managedAuthors.forEach(book::addAuthor);
        }

        bookRepository.save(book);
        log.info("Successfully created book: {} (ID: {})", book.getTitle(), book.getId());
        return mapToBookDTOWithUrl(book);
    }

    public BookDTO mapToBookDTOWithUrl(Book book) {
        BookDTO dto = BookMapper.INSTANCE.toDTO(book);
        try {
            if (book.getCoverFileName() != null && !book.getCoverFileName().isEmpty()) {
                dto.setCoverUrl(this.minioService.getCover(book.getCoverFileName()));
            }
        } catch (Exception e) {
            log.warn("Failed to get cover URL for book {}: {}", book.getId(), e.getMessage());
        }
        return dto;
    }

}
