package com.Coritech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Coritech.beans.Booking;
import com.Coritech.beans.Journey;
import com.Coritech.beans.User;
import com.Coritech.repository.BookingRepository;
import com.Coritech.repository.JourneyRepository;

@Service
public class BookingService {
	
	 @Autowired
	    private JourneyRepository journeyRepository;
	    @Autowired
	    private BookingRepository bookingRepository;

	    public Booking bookTickets(User user, Journey journey, int noOfTickets) {
	        if (journey.getTicketsRemaining() >= noOfTickets) {
	            journey.setTicketsRemaining(journey.getTicketsRemaining() - noOfTickets);
	            journeyRepository.save(journey);
	            Booking booking = new Booking();
	            booking.setUser(user);
	            booking.setJourney(journey);
	            booking.setNoOfTicketsBooked(noOfTickets);
	            bookingRepository.save(booking);
	            return booking;
	        }
	        return null;
	    }

	    // Method to cancel tickets
	    public void cancelTickets(Booking booking) {
	        Journey journey = booking.getJourney();
	        journey.setTicketsRemaining(journey.getTicketsRemaining() + booking.getNoOfTicketsBooked());
	        journeyRepository.save(journey);
	        booking.setCancelled(true);
	        bookingRepository.save(booking);
	    }
	    
	    //Method to get List of tickets booked by User
	    public List<Booking> getTicketsBookedByUserForEachCity(int userId) {
	        List<Booking> bookings = bookingRepository.findByUserUserId(userId);

	        return bookings;
	    }
	    

}
