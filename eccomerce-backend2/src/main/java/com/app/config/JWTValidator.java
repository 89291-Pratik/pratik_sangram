////package com.app.config;
////
////import java.io.IOException;
////import java.util.List;
////
////import javax.crypto.SecretKey;
////
////import org.springframework.security.authentication.BadCredentialsException;
////import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
////import org.springframework.security.core.Authentication;
////import org.springframework.security.core.GrantedAuthority;
////import org.springframework.security.core.authority.AuthorityUtils;
////import org.springframework.security.core.context.SecurityContextHolder;
////import org.springframework.web.filter.OncePerRequestFilter;
////
////import io.jsonwebtoken.Claims;
////import io.jsonwebtoken.Jwts;
////import io.jsonwebtoken.security.Keys;
////import jakarta.servlet.FilterChain;
////import jakarta.servlet.ServletException;
////import jakarta.servlet.http.HttpServletRequest;
////import jakarta.servlet.http.HttpServletResponse;
////
////public class JWTValidator extends OncePerRequestFilter{
////	private JWTProvider jwtProvider;
////}
////
////	@Override
////	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
////			throws ServletException, IOException {
////		
////		String jwt=request.getHeader(JWTConstant.JWT_HEADER);
////		
////		if(jwt!=null)
////		{
////			jwt=jwt.substring(7);
////			 System.out.println("Token without prefix: " + jwt);
////			try {
////				if (jwt != null && jwt.startsWith("Bearer ")) {
////				    jwt = jwt.substring(7); // Remove "Bearer " prefix
////				    if (jwtProvider.validateToken(jwt)) {
////				        String email = jwtProvider.getEmailFromToken(jwt);
////				        // Proceed with setting the authentication in the security context
////				    } else {
////				        // Token is invalid, handle the Unauthorized response
////				    }
////			
////			}
////			}
////			
////		catch( Exception e)
////			{
////			throw new BadCredentialsException("invalid token... from jwt validator");
////			
////			}
////		
////	}
////	
////	filterChain.doFilter(request,response);
////	
////	
////	
////
////}}
//package com.app.config;
//
//import java.io.IOException;
//import java.util.List;
//
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//public class JWTValidator extends OncePerRequestFilter {
//
//    private final JWTProvider jwtProvider;
//
//    public JWTValidator(JWTProvider jwtProvider) {
//        this.jwtProvider = jwtProvider;
//    }
//
////    @Override
////    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
////            throws ServletException, IOException {
////
////        String jwt = request.getHeader(JWTConstant.JWT_HEADER);
////
////        if (jwt != null && jwt.startsWith("Bearer ")) {
////            jwt = jwt.substring(7); // Remove "Bearer " prefix
////            System.out.println("Token without prefix: " + jwt);
////            try {
////                if (jwtProvider.validateToken(jwt)) {
////                    String email = jwtProvider.getEmailFromToken(jwt);
////                    List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");
////                    Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
////                    SecurityContextHolder.getContext().setAuthentication(authentication);
////                } else {
////                    throw new BadCredentialsException("Invalid token...");
////                }
////            } catch (Exception e) {
////                throw new BadCredentialsException("Invalid token... from jwt validator", e);
////            }
////        }
////
////        filterChain.doFilter(request, response);
////    }
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String jwt = request.getHeader(JWTConstant.JWT_HEADER);
//
//        if (jwt != null && jwt.startsWith("Bearer ")) {
//            jwt = jwt.substring(7); // Remove "Bearer " prefix
//            System.out.println("Token without prefix: " + jwt);
//
//            try {
//                if (jwtProvider.validateToken(jwt)) {
//                    String email = jwtProvider.getEmailFromToken(jwt);
//                    System.out.println("Extracted Email: " + email);
//
//                    List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");
//                    Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                } else {
//                    throw new BadCredentialsException("Invalid token...");
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//                throw new BadCredentialsException("Invalid token... from jwt validator", e);
//            }
//        }
//
//        filterChain.doFilter(request, response);
//    }
//
//}
//
package com.app.config;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTValidator extends OncePerRequestFilter {

    private final JWTProvider jwtProvider;

    public JWTValidator(JWTProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader(JWTConstant.JWT_HEADER);

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7); // Remove "Bearer " prefix
            System.out.println("Token without prefix: " + jwt);

            try {
                if (jwtProvider.validateToken(jwt)) {
                    String email = jwtProvider.getEmailFromToken(jwt);
                    System.out.println("Extracted Email: " + email);

                    List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");
                    Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    SecurityContextHolder.clearContext();
                    throw new BadCredentialsException("Invalid token...");
                }
            } catch (BadCredentialsException e) {
                // Propagate the BadCredentialsException if token is invalid
                throw e;
            } catch (Exception e) {
                // For all other exceptions, clear context and throw as BadCredentialsException
                SecurityContextHolder.clearContext();
                throw new BadCredentialsException("An error occurred while processing the token", e);
            }
        } else {
            // If JWT is missing or doesn't start with Bearer, clear context
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}


