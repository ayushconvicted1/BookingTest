import React, { useEffect, useState } from "react";
import "../styles/ObjectList.css";
import "../styles/BookingPage.css";
import { Show } from "./ObjectList";

const ShowBookingPage = ({
  show,
  containerVisible,
}: {
  show: Show;
  containerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("bookings"));
    if (storedData && storedData.length > 0) {
      const initialData = storedData[0];
      setBookingDetails(initialData);
    }
  }, []);

  const handleBookingFormToggle = () => {
    setShowBookingForm(!showBookingForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log("Booking details submitted:", bookingDetails);

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(bookingDetails);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    setShowBookingForm(false);
    containerVisible(false);
  };

  return (
    <div className="show-booking-page">
      <button onClick={() => containerVisible(false)} className="cutButton">
        Close
      </button>

      <main>
        <div className="show-details"></div>

        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: show.summary }}
        />

        <div className="booking-form">
          <button onClick={handleBookingFormToggle}>Book Now</button>
          {showBookingForm && (
            <form onSubmit={handleBookingSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={bookingDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={bookingDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Submit Booking</button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShowBookingPage;
