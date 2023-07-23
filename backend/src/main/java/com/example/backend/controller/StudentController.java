package com.example.backend.controller;

import com.example.backend.model.Student;
import com.example.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public String add(@RequestBody Student student){
        studentService.saveStudent(student);
        return "New student is added";
    }

    @GetMapping("/getAll")
    public List<Student> list() {
        return studentService.getAllStudents();
    }
    @DeleteMapping("/delete")
    public String delete(@RequestParam int id) {
        studentService.delStudent(id);
        return "Student with ID " + id + " has been deleted.";
    }
    @PutMapping("/update")
    private String update(@RequestParam int id, @RequestBody Student student)
    {
        studentService.updateStudent(id, student);
        return "Student with ID " + id + " has been updated.";
    }
}
