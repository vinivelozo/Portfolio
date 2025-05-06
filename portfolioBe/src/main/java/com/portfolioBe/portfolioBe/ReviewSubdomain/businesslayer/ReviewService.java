package com.portfolioBe.portfolioBe.ReviewSubdomain.businesslayer;

import com.portfolioBe.portfolioBe.ReviewSubdomain.presentationlayer.ReviewRequestModel;
import com.portfolioBe.portfolioBe.ReviewSubdomain.presentationlayer.ReviewResponseModel;

import java.util.List;

public interface ReviewService {

    List<ReviewResponseModel> getAllReviews(); // ✅ Fetch only visible reviews

    List<ReviewResponseModel> getAllReviewsIncludingHidden(); // ✅ Fetch ALL reviews for Admin

    ReviewResponseModel addReview(ReviewRequestModel reviewRequestModel);

    void updateReviewVisibility(Integer id, boolean visible);

    void deleteReview(Integer id); // ✅ New method to delete a review


}
