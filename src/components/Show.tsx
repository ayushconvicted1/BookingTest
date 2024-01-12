import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Show } from "./ObjectList";
import { HOST } from "../constants/Host";
import "../styles/Shows.css";
import "../styles/BookingPage.css";
import ShowBookingPage from "./ShowBookingPage";

function Shows() {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState<Show>();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (id) {
      fetch(`${HOST}shows/${id}`)
        .then((response) => response.json())
        .then((data) => setShowDetails(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  return (
    <div className="show-booking-page">
      <header>
        <h1>{showDetails?.name}</h1>
      </header>
      <div className="bookingContainer">
        {modalVisible && (
          <ShowBookingPage
            containerVisible={setModalVisible}
            show={showDetails}
          />
        )}
      </div>

      <main>
        <div className="show-details">
          <img src={showDetails?.image?.medium} alt={showDetails?.name} />
          <div className="info">
            <p>
              <strong>Genres:</strong> {showDetails?.genres.join(", ")}
            </p>
            <p>
              <strong>Status:</strong> {showDetails?.status}
            </p>
            <p>
              <strong>Premiered:</strong> {showDetails?.premiered}
            </p>
            <p>
              <strong>Runtime:</strong> {showDetails?.runtime} minutes
            </p>
            <p>
              <strong>Schedule:</strong> {showDetails?.schedule.days.join(", ")}{" "}
              at {showDetails?.schedule.time}
            </p>
            <p>
              <strong>Rating:</strong> {showDetails?.rating.average || "N/A"}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={showDetails?.officialSite}
                target="_blank"
                rel="noopener noreferrer"
              >
                {showDetails?.officialSite}
              </a>
            </p>
          </div>
        </div>

        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: showDetails?.summary }}
        />
        <button
          onClick={() => {
            setModalVisible(true);
          }}
          className="ticketBtn"
        >
          Book a ticket
        </button>
      </main>
    </div>
  );
}

export default Shows;
