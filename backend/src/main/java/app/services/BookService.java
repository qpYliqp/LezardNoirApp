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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
        return this.bookRepository.findAll()
                .stream()
                .map(BookMapper.INSTANCE::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public Map<String, List<BookDTO>> getAllBooksGroupedByLetter() {
        Map<String, List<BookDTO>> groupedBooks = new LinkedHashMap<>();

        List<String> letters = this.bookRepository.findAllAvailableLetters();

        letters.forEach(letter -> {
            List<BookDTO> books = this.bookRepository
                    .findAllByTitleStartingWithIgnoreCase(letter)
                    .stream()
                    .map(BookMapper.INSTANCE::toDTO)
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
    public BookDTO updateGlobalStatus(Long bookId, Long statusId) {
        Book book = this.bookRepository.findById(bookId)
                .orElseThrow(() -> new BookException("Book not found with bookId: " + bookId));
        Status status = this.statusRepository.findById(statusId)
                .orElseThrow(() -> new StatusException("Author not found with authorId: " + statusId));
        book.setGlobalStatus(status);
        return BookMapper.INSTANCE.toDTO(book);
    }


    @Transactional
    public BookDTO createBook(BookUpdateDTO dto) throws IOException {
        Book book = BookMapper.INSTANCE.fromupdateDTOtoEntity(dto);

        // Sauvegarde du fichier si présent
        if (dto.getCoverFile() != null && !dto.getCoverFile().isEmpty()) {
            String filename = StringUtils.cleanPath(Objects.requireNonNull(dto.getCoverFile().getOriginalFilename()));
            Path uploadPath = Paths.get("uploads/");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            try (InputStream inputStream = dto.getCoverFile().getInputStream()) {
                Path filePath = uploadPath.resolve(filename);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }

            // Stocker le nom du fichier dans l'entité
            book.setCoverFileName(filename);
        }

        // Sauvegarder le livre dans tous les cas
        bookRepository.save(book);

        return BookMapper.INSTANCE.toDTO(book);
    }
}
