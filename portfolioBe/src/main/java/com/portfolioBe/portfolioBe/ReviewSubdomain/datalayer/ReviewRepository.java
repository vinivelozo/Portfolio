package com.portfolioBe.portfolioBe.ReviewSubdomain.datalayer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByVisibleTrue();
}
