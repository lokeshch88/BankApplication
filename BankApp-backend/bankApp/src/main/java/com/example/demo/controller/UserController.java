package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.ResetPasswordRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://192.168.0.108:3001/")
public class UserController {
	@Autowired
	private UserService userService;
	
	@GetMapping
	public List<User> getAllUSers(){
		return userService.getAllUsers();
	}
//	@PostMapping
//	public User createUser(@RequestBody User user) {
//        
//        return userService.saveUser(user);
//    }
	
	@PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
       
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            
            return new ResponseEntity<>("Email already used", HttpStatus.CONFLICT);
        } else {
            
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        }
	}
	
	@PatchMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User userDetails) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
           
            User updatedUser = userService.saveUser(user);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            userService.deleteUser(id);
            return new ResponseEntity<>("User deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
	
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
	
//	@PostMapping("/forgotpass")
//	public String forgotPassword(@RequestBody String email, String newPass) {
//		Optional<User> userOptional=userService.getUserByEmail(email);
//		if(userOptional.isPresent()) {
//			User user=userOptional.get();
//			user.setPassword(newPass);
//		}
//		
//		return email;
//	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
	    
	    String email = request.getEmail();
	    String newPassword = request.getNewPassword();

	    Optional<User> userOptional = userService.getUserByEmail(email);
	    if (!userOptional.isPresent()) {
	        return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
	    }

	    User user = userOptional.get();
	    user.setPassword(newPassword); 
	    userService.saveUser(user);

	    return new ResponseEntity<>("Password successfully updated", HttpStatus.OK);
	}


	
//	@PostMapping("/reset-password")
//    public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String newPassword) {
//        Optional<User> userOptional = userService.getUserByEmail(email);
//
//        if (!userOptional.isPresent()) {
//            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
//        }
//
//        User user = userOptional.get();
//        user.setPassword(newPassword); 
//
//        userService.saveUser(user);
//
//        return new ResponseEntity<>("Password successfully updated", HttpStatus.OK);
//    }
	

}
