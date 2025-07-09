package com.example.skillsfusion_backend.repository;

import com.example.skillsfusion_backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    boolean existsByEmailAndProject_Id(String email, Long projectId);
}
