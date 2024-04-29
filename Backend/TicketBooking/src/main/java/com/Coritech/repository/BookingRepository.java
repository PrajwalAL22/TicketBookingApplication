package com.Coritech.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Coritech.beans.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
	 List<Booking> findByUserUserId(int userId);
	 
	 Booking findByUserUserIdAndJourneyCityName(int userId, String cityName);

}