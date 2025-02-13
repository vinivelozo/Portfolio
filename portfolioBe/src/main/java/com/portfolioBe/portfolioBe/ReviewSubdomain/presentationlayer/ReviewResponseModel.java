package com.portfolioBe.portfolioBe.ReviewSubdomain.presentationlayer;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class ReviewResponseModel {

    private Integer id;
    private String username;
    private Integer stars;
    private String comment;
    private LocalDateTime createdAt;
    private boolean visible;
}
