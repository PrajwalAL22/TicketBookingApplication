import React, { useContext, useEffect, useState } from "react";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import UserContext from "../Context/UserContext";

function Home() {
  const [ticketNo, setTicketNo] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  const [currentCity, setCurrenCity] = useState("");
  const [remainingSeats, setRemainingSeats] = useState(0);
  const { user } = useContext(UserContext);
  const [isLoggedIn, SetisLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const ticketCounterArray = new Array(10).fill("");

  useEffect(() => {
    user ? SetisLoggedIn(true) : SetisLoggedIn(false);
    console.log(user);
    setMessage("");
    fetchRemainingSeats();
  }, [currentCity, user]);

  const fetchRemainingSeats = async () => {
    try {
      const response = await fetch(
        `http://localhost:5458/journey?cityName=${currentCity}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch remaining seats: ${response.statusText}`
        );
      }
      console.log(response);
      const data = await response.text();
      const remainingSeats = parseInt(data);
      setRemainingSeats(remainingSeats);
    } catch (error) {
      console.error("Error fetching remaining seats:", error);
    }
  };

  const handleBookTickets = () => {
    if (!isLoggedIn) {
      alert("Login Required");
      return;
    }

    const fetchAllBooking = async () => {
      try {
        const response = await fetch(
          `http://localhost:5458/getTickets?userId=${user.userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch booking info");
        }
        const data = await response.json();
        console.log(data);
        isBookingAllowed(data);
      } catch (error) {
        console.error("Error fetching booking info:", error);
      }
    };

    fetchAllBooking();
  };

  const isBookingAllowed = (data) => {
    console.log("Reached Booking Allowed");
    let totalTicketsBooked = 0;
    console.log(data);
    for (const booking of data) {
      console.log("in booking Loop");
      if (booking.journey.cityName === currentCity && !booking.cancelled) {
        console.log("Checking");
        totalTicketsBooked += booking.noOfTicketsBooked;
      }
    }
    console.log(totalTicketsBooked);
    if (totalTicketsBooked + ticketNo <= 2) {
      console.log("allowed");
      bookTickets();
      setMessage("");
      return true; // Booking is allowed
    } else {
      console.log("not Allowed");
      setMessage(
        "You have already booked tickets to this city and cannot book more than 2 tickets for a city"
      );
      return false; // Booking is not allowed
    }
  };

  const bookTickets = async () => {
    try {
      const url = `http://localhost:5458/book?userId=${user.userId}&cityName=${currentCity}&noOfTickets=${ticketNo}`;
      const response = await fetch(url, {
        method: "POST",
        // mode: "cors", // or "no-cors" if it's a cross-origin request
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setMessage("Something went wrong on server");
        throw new Error(`Failed to book tickets: ${response.statusText}`);
      }

      const data = await response.text();
      console.log(data);
      setMessage("Ticket Booked Successfully");
      fetchRemainingSeats();
    } catch (error) {
      console.error("Error booking tickets:", error);
    }
  };

  const handleIncrease = () => {
    if (ticketNo < 2) {
      setTicketNo((prev) => prev + 1);
    } else {
      setAlertMessage("Max 2 tickets per user");
    }
  };

  const handleDecrease = () => {
    if (ticketNo > 1) {
      setTicketNo((prev) => prev - 1);
      setAlertMessage("");
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen bg-gray-100">
      <div>
        <h1 className="text-center font-extrabold text-4xl">
          Welcome to Ticket Booking App
        </h1>
      </div>
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">
          Tickets available
        </h2>
        <h2 className="text-blue-400 font-bold mb-4 text-center">{message}</h2>
        <div>
          {ticketCounterArray.map((_, index) => (
            <AirlineSeatFlatIcon
              key={index}
              style={{ color: index < remainingSeats ? "green" : "red" }}
              className="ml-2 mb-5"
            />
          ))}
        </div>
        <form className="mb-4">
          <select
            name="city"
            id="city"
            className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
            onChange={(e) => setCurrenCity(e.target.value)}
          >
            <option value="None">Select City</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Nashik">Nashik</option>
          </select>
          <div className="flex items-center mt-4 ">
            <input
              type="number"
              id="noOfTickets"
              className="w-full border p-2 rounded mr-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
              value={ticketNo}
              readOnly
            />
            <button
              type="button"
              id="increase"
              className="px-3 py-1 text-blue-400 hover:bg-blue-600  hover:text-white text-2xl"
              onClick={handleIncrease}
            >
              +
            </button>
            <button
              type="button"
              id="decrease"
              className="px-3 py-1 text-red-500 hover:bg-red-600 hover:text-white ml-2 text-3xl"
              onClick={handleDecrease}
            >
              -
            </button>
          </div>
        </form>
        {alertMessage && (
          <p className="text-red-500 text-sm mt-2">{alertMessage}</p>
        )}
        <button
          id="book"
          type="button"
          onClick={handleBookTickets}
          className="w-full text-center mt-3 py-1 text-xl text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}

export default Home;
