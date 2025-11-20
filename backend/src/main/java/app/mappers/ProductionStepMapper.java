package app.mappers;

import app.dto.ProductionStepDTO;
import app.models.ProductionStep;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper
public interface ProductionStepMapper {

    ProductionStepMapper INSTANCE = Mappers.getMapper(ProductionStepMapper.class);

    ProductionStepDTO toDTO(ProductionStep bookStep);

    ProductionStep toEntity(ProductionStepDTO dto);


}
