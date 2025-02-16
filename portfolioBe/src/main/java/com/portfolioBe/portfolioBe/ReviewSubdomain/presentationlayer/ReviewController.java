package com.portfolioBe.portfolioBe.ReviewSubdomain.presentationlayer;

import com.portfolioBe.portfolioBe.ReviewSubdomain.businesslayer.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:5174", "https://portfolio-b3qf.vercel.app"})
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public List<ReviewResponseModel> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/all")
    public List<ReviewResponseModel> getAllReviewsIncludingHidden() {
        return reviewService.getAllReviewsIncludingHidden();
    }

    @PostMapping
    public ResponseEntity<ReviewResponseModel> addReview(@RequestBody ReviewRequestModel reviewRequestModel) {
        ReviewResponseModel savedReview = reviewService.addReview(reviewRequestModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    @PutMapping("/{id}/visibility")
    public ResponseEntity<?> updateReviewVisibility(@PathVariable Integer id, @RequestBody Map<String, Boolean> request) {
        boolean visible = request.get("visible");
        reviewService.updateReviewVisibility(id, visible);
        return ResponseEntity.ok().build();
    }


}
