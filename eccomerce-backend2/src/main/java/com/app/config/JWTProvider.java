//package com.app.config;
//
//import java.util.Date;
//
//import javax.crypto.SecretKey;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureException;
//import io.jsonwebtoken.security.Keys;
//
//@Service
//public class JWTProvider {
//	SecretKey key=Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());
//	
//	public String generateToken(Authentication auth)
//	{
//		String jwt=Jwts.builder()
//				.setIssuedAt(new Date())
//				.setExpiration(new Date(new Date().getTime()+846000000))
//				.claim("email",auth.getName())
//				.signWith(key).compact();
//		
//		return jwt;
//	}
//	
//	public String getEmailFromToken(String jwt)
//	{
//		jwt=jwt.substring(7);
//		Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
//		
//		String email=String.valueOf(claims.get("email"));
//		
//		return email;
//	}
//	
//	public boolean validateToken(String jwt) {
//        try {
//            jwt = jwt.substring(7); // Remove the "Bearer " prefix if present
//            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
//            return true;
//        } catch (SignatureException e) {
//            // Log signature exception if token signature is invalid
//            System.out.println("Invalid JWT signature: " + e.getMessage());
//        } catch (Exception e) {
//            // Handle other exceptions such as token expiration
//            System.out.println("Invalid JWT token: " + e.getMessage());
//        }
//        return false;
//    }
//
//}
package com.app.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTProvider {

    private final SecretKey key = Keys.hmacShaKeyFor(JWTConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 846000000)) // 10 days
                .claim("email", auth.getName())
                .signWith(key)
                .compact();
    }

    public String getEmailFromToken(String jwt) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody();

        return String.valueOf(claims.get("email"));
    }

    public boolean validateToken(String jwt) {
        try {
        	System.out.println("JWT being validated: " + jwt);

            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}

