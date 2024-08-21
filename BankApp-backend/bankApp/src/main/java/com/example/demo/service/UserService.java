package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repo.UserRepository;

@Service
public class UserService {
	@Autowired
	 private UserRepository userRepo;
	
	public List<User> getAllUsers(){
		return userRepo.findAll();
	}

	public User saveUser(User user) {
		
		return userRepo.save(user);
	}

	public Optional<User> getUserById(int id) {
		
		return userRepo.findById(id);
	}

	public void deleteUser(int id) {
		userRepo.deleteById(id);
		
	}

	public Optional<User> authenticateUser(String email, String password) {
		// TODO Auto-generated method stub
		return userRepo.findByEmailAndPassword(email, password);
	}

	public Optional<User> getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email);
	}

}
