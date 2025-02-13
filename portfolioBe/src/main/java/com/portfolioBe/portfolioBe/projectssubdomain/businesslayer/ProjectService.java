package com.portfolioBe.portfolioBe.projectssubdomain.businesslayer;

import com.portfolioBe.portfolioBe.projectssubdomain.presentationlayer.ProjectRequestModel;
import com.portfolioBe.portfolioBe.projectssubdomain.presentationlayer.ProjectResponseModel;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

    List<ProjectResponseModel> getAllProjects(); // ✅ Fetch all projects

    ProjectResponseModel getProjectById(Integer id); // ✅ Fetch a specific project

    ProjectResponseModel addProject(ProjectRequestModel projectRequestModel, MultipartFile imageUploaded); // ✅ Add a new project with image

    ProjectResponseModel updateProject(Integer id, ProjectRequestModel projectRequestModel, MultipartFile imageUploaded); // ✅ Update project details and image

    void deleteProject(Integer id); // ✅ Delete a project by ID
}
