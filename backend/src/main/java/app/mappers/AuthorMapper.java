package app.mappers;

import app.dto.AuthorDTO;
import app.models.Author;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {BookMapper.class})
public interface AuthorMapper {

    AuthorMapper INSTANCE = Mappers.getMapper(AuthorMapper.class);

    AuthorDTO toDTO(Author author);

    Author toEntity(AuthorDTO authorDTO);

}