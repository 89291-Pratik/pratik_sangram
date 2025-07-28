package com.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dtos.ReviewRequest;
import com.app.exception.ProductException;
import com.app.pojos.Product;
import com.app.pojos.Review;
import com.app.pojos.User;
import com.app.repository.ProductRepository;
import com.app.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService{
     @Autowired
	private ReviewRepository reviewRepo;
     @Autowired
     private ProductService productService;
     @Autowired
     private ProductRepository productRepo;
	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
	    Product product=productService.findProductById(req.getProductId());
	    
	    Review review=new Review();
	    review.setUser(user);
	    review.setProduct(product);
	    review.setReview(req.getReview());
	    review.setCreatedAt(LocalDateTime.now());
	    
	    
		return reviewRepo.save(review);
	}

	@Override
	public List<Review> getAllReview(Long productId) {
		
		return reviewRepo.getAllProductsReview(productId);
	}
	

}
