package com.app.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.exception.OrderException;
import com.app.pojos.Address;
import com.app.pojos.Cart;
import com.app.pojos.CartItem;
import com.app.pojos.Order;
import com.app.pojos.OrderItem;
import com.app.pojos.User;
import com.app.repository.AddressRepository;
import com.app.repository.CartRepository;
import com.app.repository.OrderItemRepository;
import com.app.repository.OrderRepository;
import com.app.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService{
	
	@Autowired
	private CartRepository cartRepo;
	@Autowired
	private CartService cartService;
	@Autowired
	private ProductService productService;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private AddressRepository addressRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private OrderItemRepository orderItemRepo;
	@Autowired
	private OrderItemService orderItemService;

	@Override
	public Order createOrder(User user, Address shippingAddress) {
		shippingAddress.setUser(user);
		Address address=addressRepo.save(shippingAddress);
		user.getAddresses().add(address);
		userRepo.save(user);
		
		Cart cart=cartService.findUserCart(user.getId());
		List<OrderItem>orderItems=new ArrayList<>();
		for(CartItem item:cart.getCartItems())
		{
			OrderItem orderItem=new OrderItem();
			orderItem.setPrice(item.getPrice());
			orderItem.setProduct(item.getProduct());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setSize(item.getSize());
			orderItem.setUserId(item.getUserId());
			orderItem.setDiscountedPrice(item.getDiscountedPrice());
			
			OrderItem createdOrderItem=orderItemRepo.save(orderItem);
			orderItems.add(createdOrderItem);
			
		}
		
		Order createdOrder=new Order();
		createdOrder.setUser(user);
		createdOrder.setOrderItems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setTotalItem(cart.getTotalItem());
		createdOrder.setShippingAddress(address);
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.getPaymentDetails().setStatus("PENDING");
		createdOrder.setCreatedAt(LocalDateTime.now());
		
		Order savedOrder=orderRepo.save(createdOrder);
		
		for(OrderItem item:orderItems)
		{
			item.setOrder(savedOrder);
			orderItemRepo.save(item);
		}
		
		return savedOrder;
		
		
	}

	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		Optional<Order>opt=orderRepo.findById(orderId);
		if(opt.isPresent())
		{
			return opt.get();
		}
		throw new OrderException("order not exist with id "+orderId);
	
	}

	@Override
	public List<Order> usersOrderHistory(Long userId) {
		List<Order>orders=orderRepo.getUsersOrders(userId);
		return orders;
	}

	@Override
	public Order placedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus("PLACED");
		order.getPaymentDetails().setStatus("COMPLETED");
		return order;
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus("CONFIRMED");
		return orderRepo.save(order);
	}

	@Override
	public Order shippedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus("SHIPPED");
		return orderRepo.save(order);
	}

	@Override
	public Order deliveredOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus("DELIVERED");
		return orderRepo.save(order);
	}

	@Override
	public Order cancelledOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus("CANCELLED");
		return orderRepo.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		
		return orderRepo.findAll();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		orderRepo.deleteById(orderId);
		
	}
	
	

}
