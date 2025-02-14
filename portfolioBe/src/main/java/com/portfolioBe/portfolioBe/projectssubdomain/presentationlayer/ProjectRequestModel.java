package com.portfolioBe.portfolioBe.projectssubdomain.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequestModel {


    private String projectName;
    private String projectDescription;
    private String projectGithub;
}
