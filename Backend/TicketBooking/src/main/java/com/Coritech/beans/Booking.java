package com.Coritech.beans;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Component
@Entity
@Table(name = "booking")
public class Booking {
	
	@Id
	   @GeneratedValue(strategy = GenerationType.AUTO)
	   private int bookingId;
	   @ManyToOne
	   private User user;
	   @ManyToOne
	   private Journey journey;
	   private int noOfTicketsBooked;
	   private boolean isCancelled = false; 
	   
	   public boolean isCancelled() {
		return isCancelled;
	}
	public void setCancelled(boolean isCancelled) {
		this.isCancelled = isCancelled;
	}
	public int getBookingId() {
		return bookingId;
	}
	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Journey getJourney() {
		return journey;
	}
	public void setJourney(Journey journey) {
		this.journey = journey;
	}
	public int getNoOfTicketsBooked() {
		return noOfTicketsBooked;
	}
	public void setNoOfTicketsBooked(int noOfTicketsBooked) {
		this.noOfTicketsBooked = noOfTicketsBooked;
	}
	public Booking(int bookingId, User user, Journey journey, int noOfTicketsBooked) {
		super();
		this.bookingId = bookingId;
		this.user = user;
		this.journey = journey;
		this.noOfTicketsBooked = noOfTicketsBooked;
	}
	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Booking [bookingId=" + bookingId + ", user=" + user + ", journey=" + journey + ", noOfTicketsBooked="
				+ noOfTicketsBooked + "]";
	}
	   
	   

}
