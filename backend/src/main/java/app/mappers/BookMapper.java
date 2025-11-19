package app.mappers;

import app.dto.BookDTO;
import app.dto.BookUpdateDTO;
import app.models.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {AuthorMapper.class})
public interface BookMapper {


    BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

    BookDTO toDTO(Book book);

    Book toEntity(BookDTO dto);

    BookUpdateDTO toUpdateDTO(Book book);

    @Mapping(target = "authors", ignore = true)
    @Mapping(target = "bookSteps", ignore = true)
    Book fromupdateDTOtoEntity(BookUpdateDTO dto);


    void updateEntityFromUpdateDTO(BookUpdateDTO dto, @MappingTarget Book book);

}