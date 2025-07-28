package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.config.JWTProvider;
import com.app.dtos.AuthResponse;
import com.app.dtos.LoginRequest;
import com.app.exception.UserException;
import com.app.pojos.Cart;
import com.app.pojos.User;
import com.app.repository.UserRepository;
import com.app.service.CartService;
import com.app.service.CustomUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private JWTProvider jwtProvider;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomUserDetailsService customUserDetailService;
	@Autowired
	private CartService cartService;
	
	@PostMapping("/signup")
 	public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user) throws UserException{
		
		String email=user.getEmail();
		String password=user.getPassword();
		String firstName=user.getFirstName();
		String lastName=user.getLastName();
		
		
		User isEmailExist=userRepo.findByEmail(email);
		
		if(isEmailExist!=null)
		{
			throw new UserException("Email is Already Used With Another Account");
			
		}
		User createdUser=new User();
		createdUser.setEmail(email);
		createdUser.setPassword(passwordEncoder.encode(password));
		createdUser.setFirstName(firstName);
		createdUser.setLastName(lastName);
		
		User savedUser=userRepo.save(createdUser);
		Cart cart=cartService.createCart(savedUser);
		
		Authentication authentication=new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token=jwtProvider.generateToken(authentication);
		
		AuthResponse authResponse=new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Signup Success");
		
		return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
		
		
		
		
	}
	@PostMapping("/signin")
    public ResponseEntity<AuthResponse>loginUserHandler(@RequestBody LoginRequest loginRequest){
    	String username=loginRequest.getEmail();
    	String password=loginRequest.getPassword();
    	
    	Authentication authentication=authenticate(username,password);
    	SecurityContextHolder.getContext().setAuthentication(authentication);
String token=jwtProvider.generateToken(authentication);
		
AuthResponse authResponse=new AuthResponse();
authResponse.setJwt(token);
authResponse.setMessage("Sign in Success");
		
		return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.CREATED);
		
    	
    }

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails=customUserDetailService.loadUserByUsername(username);
		if(userDetails==null)
		{
			throw new BadCredentialsException("invalid Username....");
			
		}
		
		if(!passwordEncoder.matches(password,userDetails.getPassword()))
		{
			throw new BadCredentialsException("invalid Password.....");
			
		}
		return new UsernamePasswordAuthenticationToken(userDetails,null ,userDetails.getAuthorities());
	}
}
