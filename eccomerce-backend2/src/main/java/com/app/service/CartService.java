package com.app.service;

import com.app.dtos.AddItemRequest;
import com.app.exception.ProductException;
import com.app.pojos.Cart;
import com.app.pojos.User;

public interface CartService {
	
	public Cart createCart(User user);
	
	public String addCartItem(Long userId,AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);

}
