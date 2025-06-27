import React, { useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";

const MapModalButton = ({ venue }) => {
  const [showMap, setShowMap] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

  const openMapModal = () => {
    if (!venue?.address) {
      alert("Venue address not available.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const origin = `${latitude},${longitude}`;
        const destination = encodeURIComponent(venue.address);

        const url = `https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${origin}&destination=${destination}`;
        setMapUrl(url);
        setShowMap(true);
      },
      (error) => {
        alert("Location permission denied.");
        console.error(error);
      }
    );
  };

  return (
    <>
      <button
        className="flex items-center justify-center bg-blue-800 text-white px-3 w-[200px] py-2 rounded-full"
        onClick={openMapModal}
      >
        <CiLocationArrow1 className="mr-2 text-2xl" />
        Get Direction
      </button>

      {showMap && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-full max-w-3xl relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
              onClick={() => setShowMap(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-2">Directions</h2>
            <iframe
              title="Google Map Directions"
              src={mapUrl}
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default MapModalButton;
