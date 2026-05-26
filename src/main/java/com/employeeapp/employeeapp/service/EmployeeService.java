package com.employeeapp.employeeapp.service;

import com.employeeapp.employeeapp.model.Employee;
import com.employeeapp.employeeapp.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Add Employee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Delete Employee
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    // Update Employee
    public Employee updateEmployee(Long id, Employee updatedEmployee) {

        Employee employee =
                employeeRepository.findById(id).orElse(null);

        if(employee != null) {

            employee.setName(updatedEmployee.getName());
            employee.setEmail(updatedEmployee.getEmail());
            employee.setDepartment(updatedEmployee.getDepartment());
            employee.setSalary(updatedEmployee.getSalary());

            return employeeRepository.save(employee);
        }

        return null;
    }
}