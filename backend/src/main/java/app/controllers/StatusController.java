package app.controllers;


import app.dto.StatusDTO;
import app.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/status")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @GetMapping()
    public List<StatusDTO> getAllStatus() {

        return this.statusService.getAllStatus();

    }
}
