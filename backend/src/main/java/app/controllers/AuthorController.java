package app.controllers;

import app.dto.AuthorDTO;
import app.services.AuthorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequestMapping("/authors")
@RestController
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(final AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping()
    public List<AuthorDTO> getAllAuthors() {
        return this.authorService.getAllAuthors();
    }

}
