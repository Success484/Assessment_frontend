import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TripForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    current_cycle_used: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const errors = {};
    if (!form.current_location) errors.current_location = "Required";
    if (!form.pickup_location) errors.pickup_location = "Required";
    if (!form.dropoff_location) errors.dropoff_location = "Required";
    if (!form.current_cycle_used) errors.current_cycle_used = "Required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/trip/",
        {
          ...form,
          current_cycle_used: parseFloat(form.current_cycle_used),
        }
      );

      navigate("/results", { state: { trip: response.data } });

    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Plan Your Trip
      </h1>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Current Location"
          id="current_location"
          value={form.current_location}
          placeholder="Austin, TX"
          onChange={(e) => updateField("current_location", e.target.value)}
          error={fieldErrors.current_location}
        />

        <InputField
          label="Pickup Location"
          id="pickup_location"
          value={form.pickup_location}
          placeholder="Dellay, TX"
          onChange={(e) => updateField("pickup_location", e.target.value)}
          error={fieldErrors.pickup_location}
        />

        <InputField
          label="Dropoff Location"
          id="dropoff_location"
          value={form.dropoff_location}
          placeholder="San Antonio, TX"
          onChange={(e) => updateField("dropoff_location", e.target.value)}
          error={fieldErrors.dropoff_location}
        />

        <InputField
          label="Current Cycle Used (hours)"
          id="current_cycle_used"
          type="number"
          value={form.current_cycle_used}
          placeholder="e.g. 20"
          onChange={(e) => updateField("current_cycle_used", e.target.value)}
          error={fieldErrors.current_cycle_used}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </form>
    </div>
  );
}

function InputField({ label, id, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="border-2 bg-gray-100 rounded-full w-full px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
