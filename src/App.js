import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationMarker({ addMarker }) {
  useMapEvents({
    click(e) {
      addMarker(e.latlng);
    },
  });
  return null;
}

function App() {
  const [markers, setMarkers] = useState([]);

  const addMarker = (latlng) => {
    setMarkers((prev) => [...prev, latlng]);
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Carbon Level",
        data: [10, 20, 15, 25],
        borderColor: "green",
      },
    ],
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Darukaa Earth Dashboard</h2>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={4}
        style={{ height: "500px", marginBottom: "20px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker addMarker={addMarker} />

        {markers.map((pos, i) => (
          <Marker key={i} position={pos} />
        ))}
      </MapContainer>

      <h3>Sites:</h3>
      <ul>
        {markers.map((m, i) => (
          <li key={i}>
            {m.lat.toFixed(3)}, {m.lng.toFixed(3)}
          </li>
        ))}
      </ul>

      <h3>Analytics</h3>
      <Line data={data} />
    </div>
  );
}

export default App;