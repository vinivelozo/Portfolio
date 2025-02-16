package com.portfolioBe.portfolioBe.projectssubdomain.datalayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "project_id", unique = true, nullable = false, updatable = false)
    private String projectId;

    @Column(name = "project_name", nullable = false)
    private String projectName;

    @Column(name = "project_description", columnDefinition = "TEXT")
    private String projectDescription;

    @Column(name = "inventory_image")
    private String inventoryImage;

    @Lob
    @Column(name = "image_uploaded", columnDefinition = "LONGBLOB")
    private byte[] imageUploaded;

    @Column(name = "project_github")
    private String projectGithub;
    // ✅ Constructor to auto-generate projectId
    public Project(String projectName, String projectDescription, String projectGithub) {
        this.projectId = UUID.randomUUID().toString();
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.projectGithub = projectGithub;
    }
}
