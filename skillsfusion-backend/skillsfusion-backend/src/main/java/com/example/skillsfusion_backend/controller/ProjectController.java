package com.example.skillsfusion_backend.controller;
import com.example.skillsfusion_backend.model.Project;
import com.example.skillsfusion_backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @PostMapping("/upload")
    public Project uploadProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @GetMapping
    public List<Project> getProjects() {
        return projectService.getAllProjects();
    }
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable String category) {
        List<Project> projects = projectService.getProjectsByCategory(category);
        return ResponseEntity.ok(projects);
    }
}