package app.mappers;

import app.dto.StatusDTO;
import app.models.Status;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StatusMapper {
    StatusMapper INSTANCE = Mappers.getMapper(StatusMapper.class);

    StatusDTO toDto(Status status);

    Status toEntity(StatusDTO statusDTO);
}
