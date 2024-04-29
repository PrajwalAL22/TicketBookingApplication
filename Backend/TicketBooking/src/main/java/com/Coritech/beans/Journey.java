package com.Coritech.beans;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Component
@Entity
@Table(name = "journeys")
public class Journey {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int journeyId;
	private String cityName;
    private int ticketsRemaining;
	public int getJourneyId() {
		return journeyId;
	}
	public void setJourneyId(int journeyId) {
		this.journeyId = journeyId;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public int getTicketsRemaining() {
		return ticketsRemaining;
	}
	public void setTicketsRemaining(int ticketsRemaining) {
		this.ticketsRemaining = ticketsRemaining;
	}
	public Journey(int journeyId, String cityName, int ticketsRemaining) {
		super();
		this.journeyId = journeyId;
		this.cityName = cityName;
		this.ticketsRemaining = ticketsRemaining;
	}
	public Journey() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Journeys [journeyId=" + journeyId + ", cityName=" + cityName + ", ticketsRemaining=" + ticketsRemaining
				+ "]";
	}
    

}
