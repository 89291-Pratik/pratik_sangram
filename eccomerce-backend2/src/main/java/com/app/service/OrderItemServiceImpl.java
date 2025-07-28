package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.exception.OrderException;
import com.app.pojos.Address;
import com.app.pojos.Order;
import com.app.pojos.OrderItem;
import com.app.pojos.User;
import com.app.repository.OrderItemRepository;
@Service
public class OrderItemServiceImpl implements OrderItemService{
  @Autowired
	private OrderItemRepository orderItemRepo;
	@Override
	public OrderItem createOrderItem(OrderItem orderItem) {
		
		return orderItemRepo.save(orderItem);
		
	}

	
}