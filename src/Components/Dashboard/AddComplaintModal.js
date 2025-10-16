import React, { useState } from "react";

function AddComplaintModal() {
  const [data, setData] = useState({
    username: "",
    uid: "",
    category: "",
    location: "",
    description: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  async function sendData(e) {
    e.preventDefault();

    // Always set departmentOfficer as "officer" and status as "Submitted"
    const complaintData = {
      ...data,
      departmentOfficer: "officer",
      status: "Submitted",
    };

    try {
      const res = await fetch("http://localhost:8000/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintData),
      });

      if (res.ok) {
        alert("✅ Complaint submitted successfully!");
        setData({
          username: "",
          uid: "",
          category: "",
          location: "",
          description: "",
        });
      } else {
        alert("❌ Failed to submit complaint. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Server error. Try again later.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 p-6">
      <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-200">
        <form
          onSubmit={sendData}
          className="mx-auto max-w-3xl bg-white shadow p-8 text-gray-700"
        >
          <h2 className="w-full my-3 text-3xl font-bold leading-tight text-center text-indigo-600">
            Submit Citizen Grievance
          </h2>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Your Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={data.username}
              onChange={addData}
              required
              className="tracking-wide py-2 px-4 block w-full bg-gray-50 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          {/* Citizen ID */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Citizen ID / UID
            </label>
            <input
              name="uid"
              type="text"
              placeholder="Enter UID (e.g. last 4 of Aadhaar)"
              value={data.uid}
              onChange={addData}
              required
              className="tracking-wide py-2 px-4 block w-full bg-gray-50 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Grievance Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={addData}
              required
              className="block w-full appearance-none bg-gray-50 border border-gray-300 hover:border-indigo-500 px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select category</option>
              <option>Roads & Streetlights</option>
              <option>Water Supply</option>
              <option>Garbage / Sanitation</option>
              <option>Electricity</option>
              <option>Health / Safety</option>
              <option>Others</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Location / Area
            </label>
            <input
              name="location"
              type="text"
              placeholder="e.g., Ward 12, JP Nagar"
              value={data.location}
              onChange={addData}
              required
              className="tracking-wide py-2 px-4 block w-full bg-gray-50 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Describe Your Issue
            </label>
            <textarea
              name="description"
              placeholder="Write your complaint in detail..."
              value={data.description}
              onChange={addData}
              required
              rows="4"
              className="tracking-wide py-2 px-4 block w-full bg-gray-50 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddComplaintModal;
