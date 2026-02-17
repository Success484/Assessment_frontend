import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RouteMap from "./RouteMap";
import EldGrid from "./EldGrid";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;

  useEffect(() => {
    if (!trip) navigate("/");
  }, [trip, navigate]);

  if (!trip) return null;

console.log(trip.geometry.slice(0, 5));
  // =============================
  // BUILD STOPS PROPERLY
  // =============================
  const buildStops = () => {
  if (!trip.geometry?.length) return [];

  const positions = trip.geometry;
  const totalPoints = positions.length;

  const stops = [];

  // =========================
  // START
  // =========================
  stops.push({
    type: "Start",
    name: "Trip Start",
    lat: positions[0][0],
    lng: positions[0][1],
  });

  // =========================
  // DESTINATION
  // =========================
  stops.push({
    type: "Destination",
    name: "Trip End",
    lat: positions[totalPoints - 1][0],
    lng: positions[totalPoints - 1][1],
  });

  // =========================
  // REST STOPS
  // =========================
  let restCounter = 1;

  trip.eld_logs?.forEach((day) => {
    day.logs?.forEach((log) => {
      if (log.status === "OFF" && log.end - log.start >= 2) {

        // ✅ CLEAN NUMBERS (NO LONG DECIMALS)
        const cleanStart = parseFloat(log.start.toFixed(1));
        const cleanEnd = parseFloat(log.end.toFixed(1));
        const cleanDuration = parseFloat(
          (log.end - log.start).toFixed(1)
        );

        // Distribute rest stops across route
        const progressRatio = restCounter / (trip.eld_logs.length + 1);
        const index = Math.floor(progressRatio * totalPoints);

        const point = positions[index];

        if (point) {
          stops.push({
            type: "Rest Stop",
            name: `Rest ${cleanStart}h - ${cleanEnd}h`,
            lat: point[0],
            lng: point[1],
            duration: cleanDuration,
          });

          restCounter++;
        }
      }
    });
  });

  return stops;
};



  const stops = buildStops();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          Trip Results
        </h1>
        <p className="text-sm text-gray-500">
          Trip ID: {trip.trip_id}
        </p>
      </div>

      {/* SUMMARY + MAP */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Summary */}
        <div className="space-y-4">
          <StatCard
            title="Total Distance"
            value={`${trip.summary?.total_distance ?? 0} km`}
          />
          <StatCard
            title="Total Duration"
            value={`${trip.summary?.total_duration ?? 0} hrs`}
          />
          <StatCard
            title="ELD Days"
            value={trip.eld_logs?.length ?? 0}
          />
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <RouteMap
            geometry={trip.geometry || []}
            stops={stops}
          />
        </div>
      </div>

      {/* STOPS INFORMATION PANEL */}
      <div className="mt-8 bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Stops & Rest Information
        </h2>

        <div className="space-y-3">
          {stops.map((stop, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex justify-between"
            >
              <div>
                <p className="font-medium">{stop.type}</p>
                <p className="text-sm text-gray-500">
                  {stop.name}
                </p>
              </div>

              {stop.duration && (
                <div className="text-sm font-medium">
                  {stop.duration} hrs
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ELD LOGS */}
      <div className="mt-10 bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-6">
          FMCSA ELD Log Sheet
        </h2>

        {trip.eld_logs?.map((day, index) => (
          <div key={index} className="mb-8">
            <h3 className="font-semibold mb-4">
              Day {day.day}
            </h3>
            <EldGrid logs={day.logs || []} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-lg font-semibold mt-1">{value}</h2>
    </div>
  );
}
