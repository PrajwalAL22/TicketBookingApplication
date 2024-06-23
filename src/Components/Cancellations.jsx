import React, { useContext, useState, useEffect } from "react";
import UserContext from "../Context/UserContext";
import { API_BASE_URL } from "../Config/apiConfig";

function Cancellations() {
  const { user } = useContext(UserContext);
  const [bookingInfo, setBookingInfo] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user && user.userId) {
      fetchBookingInfo(user.userId);
    } else {
      setMessage("Login to access Cancellations");
      setBookingInfo([]);
    }
  }, [user]);

  const fetchBookingInfo = async (userId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getTickets?userId=${user.userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch booking info");
      }
      const data = await response.json();
      console.log(data);
      setBookingInfo(data);
    } catch (error) {
      console.error("Error fetching booking info:", error);
    }
  };

  return (
    <div className="flex flex-col mt-6 items-center w-full">
      <h2 className="text-3xl font-semibold shadow-lg mb-5 text-center w-[50%]">
        Booking Information
      </h2>
      <h2 className="text-xl font-semibold mb-5 text-red-400 text-center">
        {message}
      </h2>
      <ol className="w-2/3 flex-col">
        {bookingInfo.map((bookings) =>
          bookings.cancelled ? (
            <li
              key={bookings.bookingId}
              className="flex border-red-400 border-2 bg-red-50 rounded-2xl shadow-md mb-2 px-5 py-2 w-full transition delay-150 hover:-translate-y-1 hover:scale-105"
            >
              <div className="flex justify-start gap-3 flex-grow">
                <p className="flex text-xl">
                  City:
                  <p className="text-xl font-semibold ml-2">
                    {bookings.journey.cityName}
                  </p>
                </p>
                <p className="flex text-xl">
                  Tickets Booked:
                  <p className="text-xl font-semibold ml-2">
                    {bookings.noOfTicketsBooked}
                  </p>
                </p>
              </div>
            </li>
          ) : null
        )}
      </ol>
    </div>
  );
}

export default Cancellations;
