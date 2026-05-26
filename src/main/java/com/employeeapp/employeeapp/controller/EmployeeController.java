package com.employeeapp.employeeapp.controller;

import com.employeeapp.employeeapp.model.Employee;
import com.employeeapp.employeeapp.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Register Employee
    @PostMapping("/register")
    public Employee registerEmployee(
            @RequestBody Employee employee) {

        return employeeService.saveEmployee(employee);
    }

    // Get All Employees
    @GetMapping
    public List<Employee> getAllEmployees() {

        return employeeService.getAllEmployees();
    }

    // Delete Employee
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {

        employeeService.deleteEmployee(id);
    }

    // Update Employee
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        return employeeService.updateEmployee(id, employee);
    }
}