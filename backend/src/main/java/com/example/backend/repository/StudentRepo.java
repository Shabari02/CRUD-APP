package com.example.backend.repository;

import com.example.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StudentRepo extends JpaRepository<Student,Integer> {

}
