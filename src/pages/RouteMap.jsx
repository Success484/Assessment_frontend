import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ===============================
   Custom Colored Icons
================================ */

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

/* ===============================
   Map Resize Fix
================================ */

function MapFixer({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (!positions.length) return;

    map.fitBounds(positions, { padding: [50, 50] });

    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [positions, map]);

  return null;
}

export default function RouteMap({ geometry = [], stops = [] }) {
  if (!geometry.length) {
    return (
      <div className="h-[500px] flex items-center justify-center border rounded-xl">
        No route available
      </div>
    );
  }

  const positions = geometry; // already [lat, lng]

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border shadow-sm">
      <MapContainer
        center={positions[0]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFixer positions={positions} />

        {/* Route */}
        <Polyline
          positions={positions}
          pathOptions={{
            color: "#2563eb",
            weight: 4,
          }}
        />

        {/* Stops */}
        {stops.map((stop, index) => {
          let icon = orangeIcon;

          if (stop.type === "Start") icon = greenIcon;
          if (stop.type === "Destination") icon = redIcon;

          return (
            <Marker
              key={index}
              position={[stop.lat, stop.lng]}
              icon={icon}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-semibold">{stop.type}</h3>
                  <p>{stop.name}</p>
                  {stop.duration && (
                    <p>
                      Rest Duration:{" "}
                      <strong>{stop.duration} hrs</strong>
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
