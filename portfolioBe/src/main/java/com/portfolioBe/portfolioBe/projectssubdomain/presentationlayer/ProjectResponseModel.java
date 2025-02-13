package com.portfolioBe.portfolioBe.projectssubdomain.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponseModel {

    private Integer id;
    private String projectId;
    private String projectName;
    private String projectDescription;
    private String inventoryImage;
    private String imageUploaded;
}
