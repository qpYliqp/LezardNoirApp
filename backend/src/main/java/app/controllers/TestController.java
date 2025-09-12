package app.controllers;

import app.models.TestModel;
import app.repositories.TestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {


    private final TestRepository testRepository;

    public TestController(final TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @GetMapping
    public List<TestModel> getAllTest() {
        return testRepository.findAll();
    }

    @GetMapping("create")
    public TestModel createTest() {
        TestModel testModel = new TestModel();
        testModel.setName("Test");
        return testRepository.save(testModel);
    }

    @GetMapping("/{id}")
    public TestModel getTestById(@PathVariable Long id) {
        return testRepository.findById(id).orElseThrow();
    }

}
