package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;
	private Long id;

    // Create a new student
    @PostMapping
    public ResponseEntity<Students> createStudent(@RequestBody Students student) {
        Students savedStudent = studentRepository.save(student);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    // Get all students
    @GetMapping
    public ResponseEntity<List<Students>> getAllStudents() {
        List<Students> students = studentRepository.findAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Students> getStudentById(@PathVariable("id") Long id) {
        Optional<Students> student = studentRepository.findById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update student by ID
    @PutMapping("/{id}")
    public ResponseEntity<Students> updateStudent(@PathVariable("id") Long id, @RequestBody Students studentDetails) {
        Optional<Students> existingStudent = studentRepository.findById(id);
        if (existingStudent.isPresent()) {
            Students student = existingStudent.get();
            student.setEngname(studentDetails.getEngname());
            student.setEmail(studentDetails.getEmail());
            student.setFaculty(studentDetails.getFaculty());
            student.setType(studentDetails.getType());
            student.setUserName(studentDetails.getUserName());
            Students updatedStudent = studentRepository.save(student);
            return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete student by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") Long id) {
		if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
