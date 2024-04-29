package com.Coritech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Coritech.beans.Journey;
import com.Coritech.repository.JourneyRepository;

@Service
public class JourneyService {
	  @Autowired
	    private JourneyRepository journeyRepository;

	    public int getTicketsRemainingForCity(String cityName) {
	        Journey journey = journeyRepository.findByCityName(cityName);
	        if (journey != null) {
	            return journey.getTicketsRemaining();
	        } else {
	            return -1; // Indicate city not found
	        }
	    }
}
