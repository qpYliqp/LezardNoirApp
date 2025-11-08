package app.mappers;

import app.dto.BookStepDTO;
import app.models.BookStep;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BookStepMapper {

    BookStepMapper INSTANCE = Mappers.getMapper(BookStepMapper.class);

    BookStepDTO toDTO(BookStep bookStep);

    BookStep toEntity(BookStepDTO dto);

}
