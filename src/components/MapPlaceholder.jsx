import { Map } from "@/components/icons";

const MapPlaceholder = () => {
  return (
    <div className="card-shadow flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-border bg-card">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
        <Map className="h-6 w-6 text-accent-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">Route Map</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Leaflet map will render here
      </p>
      <div
        id="map-container"
        className="mt-4 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      />
    </div>
  );
};

export default MapPlaceholder;
