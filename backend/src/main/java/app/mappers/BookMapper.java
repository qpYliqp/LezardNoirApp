package app.mappers;

import app.dto.BookDTO;
import app.dto.BookUpdateDTO;
import app.models.Book;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {AuthorMapper.class})
public interface BookMapper {


    BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

    BookDTO toDTO(Book book);

    Book toEntity(BookDTO dto);

    BookUpdateDTO toUpdateDTO(Book book);

    Book fromupdateDTOtoEntity(BookUpdateDTO dto);

}