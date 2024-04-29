package com.Coritech.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Coritech.beans.Booking;
import com.Coritech.beans.Journey;
import com.Coritech.beans.User;
import com.Coritech.repository.BookingRepository;
import com.Coritech.repository.JourneyRepository;
import com.Coritech.repository.UserRepository;
import com.Coritech.service.BookingService;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookingController {
	
	  @Autowired
	    private BookingService bookingService;
	    @Autowired
	    private UserRepository userRepository;
	    @Autowired
	    private JourneyRepository journeyRepository;
	    @Autowired
	    private BookingRepository bookingRepository;

	    @PostMapping("/book")
	    public ResponseEntity<?> bookTickets(@RequestParam int userId, @RequestParam String cityName, @RequestParam int noOfTickets) {
	
	        User user = userRepository.findById(userId).orElse(null);
	        Journey journey = journeyRepository.findByCityName(cityName);
	        
	    
	        if (user == null || journey == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or journey not found");
	        }

	   
	        Booking bookingSuccessful = bookingService.bookTickets(user, journey, noOfTickets);
	        if (bookingSuccessful != null) {
	            return ResponseEntity.ok("Tickets booked successfully");
	        } else {
	            return ResponseEntity.badRequest().body("Tickets not available for booking");
	        }
	    }

	    @GetMapping("/getTickets")
	    public List<Booking> getTicketsBookedByUserForEachCity(@RequestParam int userId) {
	        return bookingService.getTicketsBookedByUserForEachCity(userId);
	    }
	    
	    
	    
	    @PostMapping("/cancell")
	    public ResponseEntity<?> cancelTickets(@RequestParam int bookingID) {

	        Booking booking = bookingRepository.findById(bookingID).orElse(null);
	        if (booking == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
	        }

	        bookingService.cancelTickets(booking);
	        return ResponseEntity.ok("Tickets cancelled successfully");
	    }
	    
}
