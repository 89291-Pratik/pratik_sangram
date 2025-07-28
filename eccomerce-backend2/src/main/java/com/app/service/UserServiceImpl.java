package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.config.JWTProvider;
import com.app.exception.UserException;
import com.app.pojos.User;
import com.app.repository.UserRepository;

@Service
public class UserServiceImpl  implements UserService{
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private JWTProvider jwtProvider;

	@Override
	public User findUserById(Long userId) throws UserException {
		Optional<User>user=userRepo.findById(userId);
		if(user.isPresent())
			return user.get();
		throw new UserException("user not found with id "+userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		String email=jwtProvider.getEmailFromToken(jwt);
		
		User user=userRepo.findByEmail(email);
		
		if(user==null)
			throw new UserException("user not found with email "+email);
		
		return user;
	}
	

}
