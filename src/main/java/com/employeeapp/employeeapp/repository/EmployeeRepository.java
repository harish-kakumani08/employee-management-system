package com.employeeapp.employeeapp.repository;

import com.employeeapp.employeeapp.model.Employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

}