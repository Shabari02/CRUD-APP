package com.example.backend.service;

import com.example.backend.model.Student;
import com.example.backend.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepo studentRepo;
    @Override
    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }

    @Override
    public void delStudent(int id) {
        studentRepo.deleteById(id);
    }
    @Override
    public void updateStudent(int id, Student student) {
        Optional<Student> optionalStudent = studentRepo.findById(id);

        if (optionalStudent.isPresent()) {
            Student studentInfo = optionalStudent.get();
            studentInfo.setName(student.getName());
            studentInfo.setAddress(student.getAddress());
            studentRepo.save(studentInfo);
        }
        // Handle the case when the student with the given ID is not found
        // You can throw an exception or return an appropriate response based on your requirements.
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
}
