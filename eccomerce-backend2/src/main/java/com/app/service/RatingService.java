package com.app.service;

import java.util.List;

import com.app.dtos.RatingRequest;
import com.app.exception.ProductException;
import com.app.pojos.Rating;
import com.app.pojos.User;

public interface RatingService {
	
	public Rating createRating(RatingRequest re,User user) throws ProductException;
	
	public List<Rating> getProductsRating(Long productId);

}
