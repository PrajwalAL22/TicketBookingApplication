package com.Coritech.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Coritech.service.JourneyService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JourneyController {
	
    @Autowired
    private JourneyService journeyService;

    @GetMapping("/journey")
    public ResponseEntity<?> getTicketsRemaining(@RequestParam String cityName) {
        int ticketsRemaining = journeyService.getTicketsRemainingForCity(cityName);
        if (ticketsRemaining >= 0) {
            return ResponseEntity.ok(ticketsRemaining);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Journey details not found for " + cityName);
        }
    }

}
