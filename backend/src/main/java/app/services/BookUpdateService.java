package app.services;

import app.dto.AuthorDTO;
import app.dto.BookStepDTO;
import app.dto.BookUpdateDTO;
import app.exceptions.AuthorException;
import app.models.*;
import app.repositories.AuthorRepository;
import app.repositories.BookStepRepository;
import app.repositories.ProductionStepRepository;
import app.repositories.StatusRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class BookUpdateService {

    private final AuthorRepository authorRepository;
    private final BookStepRepository bookStepRepository;
    private final ProductionStepRepository productionStepRepository;
    private final StatusRepository statusRepository;
    private final MinioService minioService;


    public BookUpdateService(final AuthorRepository authorRepository,
                             final BookStepRepository bookStepRepository,
                             final ProductionStepRepository productionStepRepository,
                             final StatusRepository statusRepository,
                             final MinioService minioService) {
        this.authorRepository = authorRepository;
        this.bookStepRepository = bookStepRepository;
        this.productionStepRepository = productionStepRepository;
        this.statusRepository = statusRepository;
        this.minioService = minioService;

    }

    @Transactional
    public void updateBookDetails(BookUpdateDTO bookUpdateDTO, Book book) {
        book.setTitle(bookUpdateDTO.getTitle());
        book.setIsbn(bookUpdateDTO.getIsbn());
        book.setNuart(bookUpdateDTO.getNuart());
        book.setPages(bookUpdateDTO.getPages());
        book.setPrice(bookUpdateDTO.getPrice());
    }


    @Transactional
    public void updateBookCover(Book book, MultipartFile coverFile) {
        if (coverFile != null && !coverFile.isEmpty()) {
            try {
                String newCoverFileName = this.minioService.updateCover(book.getCoverFileName(), coverFile);
                book.setCoverFileName(newCoverFileName);
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload cover file: " + e.getMessage());
            }
        }
    }

    @Transactional
    public void updateBookMarketing(BookUpdateDTO bookUpdateDTO, Book book) {
        book.setMarketing(bookUpdateDTO.getMarketing());
        book.setSummary(bookUpdateDTO.getSummary());
        book.setHook(bookUpdateDTO.getHook());
    }

    @Transactional
    public void updateBookAuthors(BookUpdateDTO bookUpdateDTO, Book book) {
        List<Long> authorIds = bookUpdateDTO.getAuthors()
                .stream()
                .map(AuthorDTO::getId)
                .collect(Collectors.toList());

        Set<Author> newAuthors = new HashSet<>(
                authorRepository.findAllById(authorIds)
        );

        if (newAuthors.size() != authorIds.size()) {
            throw new AuthorException("One or more authors not found");
        }

        book.setAuthors(newAuthors);
    }


    @Transactional
    public void updateBookSteps(BookUpdateDTO dto, Book book) {
        Map<Long, BookStepDTO> dtoMap = dto.getBookSteps().stream()
                .collect(Collectors.toMap(BookStepDTO::getId, Function.identity()));

        List<Long> stepsId = new ArrayList<>(dtoMap.keySet());

        Map<Long, BookStep> bookSteps = this.bookStepRepository.findAllById(stepsId)
                .stream()
                .collect(Collectors.toMap(BookStep::getId, Function.identity()));

        Set<Long> statusIds = dto.getBookSteps().stream()
                .map(step -> step.getStatus().getId())
                .collect(Collectors.toSet());

        Set<Long> productionStepIds = dto.getBookSteps().stream()
                .map(step -> step.getProductionStep().getId())
                .collect(Collectors.toSet());

        Map<Long, Status> statusMap = this.statusRepository.findAllById(statusIds)
                .stream()
                .collect(Collectors.toMap(Status::getId, Function.identity()));

        Map<Long, ProductionStep> productionStepMap = this.productionStepRepository.findAllById(productionStepIds)
                .stream()
                .collect(Collectors.toMap(ProductionStep::getId, Function.identity()));

        bookSteps.forEach((id, bookStep) -> {
            BookStepDTO bookStepDTO = dtoMap.get(id);
            bookStep.setEndDate(bookStepDTO.getEndDate());
            bookStep.setStatus(statusMap.get(bookStepDTO.getStatus().getId()));
            bookStep.setProductionStep(productionStepMap.get(bookStepDTO.getProductionStep().getId()));
        });
    }

    @Transactional
    public void createBookSteps(BookUpdateDTO dto, Book book) {
        if (dto.getBookSteps() == null || dto.getBookSteps().isEmpty()) {
            return;
        }

        Map<Long, BookStepDTO> dtoMap = dto.getBookSteps().stream()
                .collect(Collectors.toMap(BookStepDTO::getId, Function.identity()));

        Set<Long> statusIds = dto.getBookSteps().stream()
                .map(step -> step.getStatus().getId())
                .collect(Collectors.toSet());

        Set<Long> productionStepIds = dto.getBookSteps().stream()
                .map(step -> step.getProductionStep().getId())
                .collect(Collectors.toSet());

        Map<Long, Status> statusMap = this.statusRepository.findAllById(statusIds)
                .stream()
                .collect(Collectors.toMap(Status::getId, Function.identity()));

        Map<Long, ProductionStep> productionStepMap = this.productionStepRepository.findAllById(productionStepIds)
                .stream()
                .collect(Collectors.toMap(ProductionStep::getId, Function.identity()));

        List<BookStep> bookSteps = dtoMap.values().stream()
                .map(bookStepDTO -> {
                    BookStep bookStep = new BookStep();
                    bookStep.setBook(book);
                    bookStep.setEndDate(bookStepDTO.getEndDate());
                    bookStep.setStatus(statusMap.get(bookStepDTO.getStatus().getId()));
                    bookStep.setProductionStep(productionStepMap.get(bookStepDTO.getProductionStep().getId()));
                    return bookStep;
                })
                .collect(Collectors.toList());

        this.bookStepRepository.saveAll(bookSteps);
    }
}
