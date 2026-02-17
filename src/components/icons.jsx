import React from "react";

export const Truck = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <path d="M16 8h3l2 3v5" />
    <circle cx="5.5" cy="18.5" r="1.5" />
    <circle cx="18.5" cy="18.5" r="1.5" />
  </svg>
);

export const MapPin = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 21s8-5.5 8-11a8 8 0 10-16 0c0 5.5 8 11 8 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Navigation = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

export const AlertCircle = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

export const Loader2 = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12a9 9 0 11-6.219-8.48" />
  </svg>
);

export const Map = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M1 6l8-3 7 3 7-3v13l-8 3-7-3-7 3V6z" />
  </svg>
);

export default null;
