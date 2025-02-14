package com.portfolioBe.portfolioBe.projectssubdomain.businesslayer;

import com.portfolioBe.portfolioBe.projectssubdomain.datalayer.Project;
import com.portfolioBe.portfolioBe.projectssubdomain.datalayer.ProjectRepository;
import com.portfolioBe.portfolioBe.projectssubdomain.presentationlayer.ProjectRequestModel;
import com.portfolioBe.portfolioBe.projectssubdomain.presentationlayer.ProjectResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service

public class ProjectServiceImpl implements ProjectService{

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<ProjectResponseModel> getAllProjects() {
        List<Project> projects = projectRepository.findAll();

        return projects.stream()
                .map(this::convertToResponseModel)  // ✅ Ensure each project is converted
                .collect(Collectors.toList());
    }


    @Override
    public ProjectResponseModel getProjectById(Integer id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            ProjectResponseModel projectResponseModel = new ProjectResponseModel();
            BeanUtils.copyProperties(optionalProject.get(), projectResponseModel);
            return projectResponseModel;
        } else {
            throw new RuntimeException("Project with ID " + id + " not found.");
        }
    }

    @Override
    public ProjectResponseModel addProject(ProjectRequestModel projectRequestModel, MultipartFile imageUploaded) {
        Project project = new Project();
        project.setProjectName(projectRequestModel.getProjectName());
        project.setProjectDescription(projectRequestModel.getProjectDescription());
        project.setProjectGithub(projectRequestModel.getProjectGithub());
        project.setProjectId(UUID.randomUUID().toString()); // Auto-generate project ID

        if (imageUploaded != null && !imageUploaded.isEmpty()) {
            try {
                project.setImageUploaded(imageUploaded.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image", e);
            }
        }

        project = projectRepository.save(project);
        ProjectResponseModel projectResponseModel = new ProjectResponseModel();
        BeanUtils.copyProperties(project, projectResponseModel);

        // ✅ Convert image to Base64 for the response
        if (project.getImageUploaded() != null) {
            projectResponseModel.setImageUploaded(Base64.getEncoder().encodeToString(project.getImageUploaded()));
        }

        return projectResponseModel;
    }

    @Override
    public ProjectResponseModel updateProject(Integer id, ProjectRequestModel projectRequestModel, MultipartFile imageUploaded) {
        return projectRepository.findById(id).map(existingProject -> {
            existingProject.setProjectName(projectRequestModel.getProjectName());
            existingProject.setProjectDescription(projectRequestModel.getProjectDescription());
            existingProject.setProjectGithub(projectRequestModel.getProjectGithub());

            // ✅ Handle image update
            if (imageUploaded != null && !imageUploaded.isEmpty()) {
                try {
                    existingProject.setImageUploaded(imageUploaded.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException("Failed to update project image", e);
                }
            }

            return convertToResponseModel(projectRepository.save(existingProject));
        }).orElseThrow(() -> new RuntimeException("Project with ID " + id + " not found."));
    }


    @Override
    public void deleteProject(Integer id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
        } else {
            throw new RuntimeException("Project with ID " + id + " not found.");
        }
    }

    private ProjectResponseModel convertToResponseModel(Project project) {
        ProjectResponseModel responseModel = new ProjectResponseModel();
        responseModel.setId(project.getId());
        responseModel.setProjectId(project.getProjectId());
        responseModel.setProjectName(project.getProjectName());
        responseModel.setProjectDescription(project.getProjectDescription());
        responseModel.setInventoryImage(project.getInventoryImage());
        responseModel.setProjectGithub(project.getProjectGithub());

        // ✅ Ensure imageUploaded is properly converted to Base64
        if (project.getImageUploaded() != null) {
            responseModel.setImageUploaded("data:image/png;base64," + Base64.getEncoder().encodeToString(project.getImageUploaded()));
        } else {
            responseModel.setImageUploaded(null);
        }

        return responseModel;
    }

}

