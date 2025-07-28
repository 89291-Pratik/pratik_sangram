package com.app.service;

import java.util.List;

import com.app.dtos.ReviewRequest;
import com.app.exception.ProductException;
import com.app.pojos.Review;
import com.app.pojos.User;

public interface ReviewService {
	
	public Review createReview(ReviewRequest req,User user) throws ProductException;
	
	public List<Review>getAllReview(Long productId);

}
