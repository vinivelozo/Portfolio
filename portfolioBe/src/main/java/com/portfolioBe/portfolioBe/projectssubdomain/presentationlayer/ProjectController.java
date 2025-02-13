package com.portfolioBe.portfolioBe.projectssubdomain.presentationlayer;

import com.portfolioBe.portfolioBe.projectssubdomain.businesslayer.ProjectService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5174")
public class ProjectController {

    private final ProjectService projectService;



    @GetMapping
    public List<ProjectResponseModel> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseModel> getProjectById(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    public ResponseEntity<ProjectResponseModel> addProject(
            @RequestParam String projectName,
            @RequestParam String projectDescription,
            @RequestParam(value = "imageUploaded", required = false) MultipartFile imageUploaded) {

        ProjectRequestModel request = new ProjectRequestModel(projectName, projectDescription);
        return ResponseEntity.ok(projectService.addProject(request, imageUploaded));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseModel> updateProject(
            @PathVariable Integer id,
            @RequestParam String projectName,
            @RequestParam String projectDescription,
            @RequestParam(value = "imageUploaded", required = false) MultipartFile imageUploaded) {

        // ✅ Remove `null` for projectId
        ProjectRequestModel request = new ProjectRequestModel(projectName, projectDescription);

        return ResponseEntity.ok(projectService.updateProject(id, request, imageUploaded));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Integer id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
