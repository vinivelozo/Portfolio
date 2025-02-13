package com.portfolioBe.portfolioBe.ReviewSubdomain.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
@AllArgsConstructor
public class ReviewRequestModel {

    private String username;
    private Integer stars;
    private String comment;
    private LocalDateTime createdAt;
}
