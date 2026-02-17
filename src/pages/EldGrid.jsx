import React from "react";

export default function EldGrid({ logs = [] }) {
  const statuses = [
    { key: "OFF", label: "OFF" },
    { key: "SB", label: "SB" },
    { key: "DRIVING", label: "D" },
    { key: "ON", label: "ON" },
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const isActive = (hour, status) => {
    return logs.some((log) => {
      return (
        log.status === status &&
        hour >= Math.floor(log.start) &&
        hour < Math.ceil(log.end)
      );
    });
  };

  return (
    <div className="overflow-x-auto border rounded-lg p-4 bg-white shadow">
      <table className="table-auto border-collapse w-full text-center">
        <thead>
          <tr>
            <th className="border p-2">Status</th>
            {hours.map((hour) => (
              <th key={hour} className="border p-2 text-xs">
                {hour}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {statuses.map((status) => (
            <tr key={status.key}>
              <td className="border p-2 font-semibold">
                {status.label}
              </td>

              {hours.map((hour) => (
                <td
                  key={hour}
                  className={`border h-6 ${
                    isActive(hour, status.key)
                      ? "bg-green-500"
                      : "bg-gray-100"
                  }`}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}