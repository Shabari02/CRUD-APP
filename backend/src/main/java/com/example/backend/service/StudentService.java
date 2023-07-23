package com.example.backend.service;

import com.example.backend.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public void delStudent(int id);
    public List<Student> getAllStudents();
    public void updateStudent(int id, Student student);
}
