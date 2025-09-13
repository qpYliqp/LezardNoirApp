package app.mappers;

import app.dto.AuthorDTO;
import app.models.Author;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AuthorMapper {

    AuthorMapper INSTANCE = Mappers.getMapper(AuthorMapper.class);

    AuthorDTO toDTO(Author author);

    Author toAuthor(AuthorDTO authorDTO);
}
