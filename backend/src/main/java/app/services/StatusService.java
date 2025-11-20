package app.services;

import app.dto.StatusDTO;
import app.mappers.StatusMapper;
import app.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {

    @Autowired
    StatusRepository statusRepository;


    public List<StatusDTO> getAllStatus() {
        return this.statusRepository.findAll().stream().map(StatusMapper.INSTANCE::toDto).toList();
    }
}
