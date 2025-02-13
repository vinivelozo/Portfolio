package com.portfolioBe.portfolioBe.ReviewSubdomain.businesslayer;

import com.portfolioBe.portfolioBe.ReviewSubdomain.datalayer.Review;
import com.portfolioBe.portfolioBe.ReviewSubdomain.datalayer.ReviewRepository;
import com.portfolioBe.portfolioBe.ReviewSubdomain.presentationlayer.ReviewRequestModel;
import com.portfolioBe.portfolioBe.ReviewSubdomain.presentationlayer.ReviewResponseModel;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<ReviewResponseModel> getAllReviews() {
        List<Review> reviews = reviewRepository.findByVisibleTrue(); // ✅ Fetches only visible reviews
        List<ReviewResponseModel> reviewResponseModels = new ArrayList<>();

        for (Review review : reviews) {
            ReviewResponseModel reviewResponseModel = new ReviewResponseModel();
            BeanUtils.copyProperties(review, reviewResponseModel);
            reviewResponseModel.setVisible(review.isVisible()); // ✅ Ensure visible is copied
            reviewResponseModels.add(reviewResponseModel);
        }
        return reviewResponseModels;
    }

    @Override
    public List<ReviewResponseModel> getAllReviewsIncludingHidden() {
        List<Review> reviews = reviewRepository.findAll(); // ✅ Fetch ALL reviews (visible & hidden)
        List<ReviewResponseModel> reviewResponseModels = new ArrayList<>();

        for (Review review : reviews) {
            ReviewResponseModel reviewResponseModel = new ReviewResponseModel();
            BeanUtils.copyProperties(review, reviewResponseModel);
            reviewResponseModels.add(reviewResponseModel);
        }
        return reviewResponseModels;
    }


    @Override
    public ReviewResponseModel addReview(ReviewRequestModel reviewRequestModel) {
        Review review = new Review();
        BeanUtils.copyProperties(reviewRequestModel, review);

        review.setVisible(false); // ✅ Ensure new reviews start as HIDDEN
        review = reviewRepository.save(review);

        // Convert saved entity back to response model
        ReviewResponseModel reviewResponseModel = new ReviewResponseModel();
        BeanUtils.copyProperties(review, reviewResponseModel);

        return reviewResponseModel;
    }

    @Override
    public void updateReviewVisibility(Integer id, boolean visible) {
        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();
            review.setVisible(visible);
            reviewRepository.save(review);
        } else {
            throw new RuntimeException("Review not found");
        }
    }



}
