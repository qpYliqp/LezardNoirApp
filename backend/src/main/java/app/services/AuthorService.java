package app.services;

import app.dto.AuthorDTO;
import app.mappers.AuthorMapper;
import app.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;


    public List<AuthorDTO> getAllAuthors() {
        return this.authorRepository.findAll().stream().map(AuthorMapper.INSTANCE::toDTO).toList();


    }
}
