import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function ResolverDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);

  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");

 const officerName = "officer";

  // Fetch complaints assigned to this officer
  useEffect(() => {
    fetch(`http://localhost:8000/officer/${officerName}`)
      .then((res) => res.json())
      .then((data) => setComplaints(data.reverse()))
      .catch((err) => console.error("Fetch error:", err));
  }, [updateModal]);

  // Update complaint status & comments
  async function handleStatusUpdate(id) {
    if (!status) return alert("Please enter status before updating.");
    try {
      const res = await fetch(`http://localhost:8000/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, comments }),
      });
      if (res.ok) {
        alert("✅ Complaint updated successfully!");
        setUpdateModal(false);
        setStatus("");
        setComments("");
      } else {
        alert("❌ Failed to update complaint.");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  // Badge UI helper
  const getStatusBadge = (status) => {
    const colors = {
      Submitted: "bg-yellow-100 text-yellow-700",
      "In Progress": "bg-blue-100 text-blue-700",
      Resolved: "bg-green-100 text-green-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          colors[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        style={{ padding: "10px", backgroundColor: "#2563eb" }}
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand className="font-semibold">
            Department Officer Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Update Modal */}
      {updateModal && selectedComplaint && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-[450px] shadow-xl text-center">
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Update Complaint Status
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Complaint ID:{" "}
              <span className="font-mono text-gray-800">{selectedComplaint._id}</span>
            </p>

            <input
              type="text"
              placeholder="Enter status (e.g. In Progress, Resolved)"
              className="w-full py-2 px-3 border border-gray-300 rounded mb-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <textarea
              placeholder="Add comments"
              className="w-full py-2 px-3 border border-gray-300 rounded mb-3"
              rows="3"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => handleStatusUpdate(selectedComplaint._id)}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => setUpdateModal(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Complaint Modal */}
      {viewModal && selectedComplaint && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-[600px] shadow-xl">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4 text-center">
              Complaint Details
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>Citizen:</strong> {selectedComplaint.username} (
                {selectedComplaint.uid})
              </p>
              <p>
                <strong>Category:</strong> {selectedComplaint.category}
              </p>
              <p>
                <strong>Location:</strong> {selectedComplaint.location}
              </p>
              <p>
                <strong>Description:</strong> {selectedComplaint.description}
              </p>
              <p>
                <strong>Status:</strong> {getStatusBadge(selectedComplaint.status)}
              </p>
              <p>
                <strong>Comments:</strong>{" "}
                {selectedComplaint.comments || "No comments yet"}
              </p>
            </div>
            <div className="text-center mt-5">
              <button
                onClick={() => setViewModal(false)}
                className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Feedback Modal */}
      {feedbackModal && selectedComplaint && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-[600px] shadow-xl">
            <h2 className="text-lg font-semibold text-green-600 mb-4 text-center">
              Citizen Feedback
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Complaint ID:</strong>{" "}
              <span className="font-mono text-gray-800">{selectedComplaint._id}</span>
            </p>
            <p className="text-gray-600 italic mb-4">
              “{selectedComplaint.citizenFeedback || "No feedback yet"}”
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              {selectedComplaint.resolutionRating || "Not rated"}
            </p>
            <div className="text-center mt-5">
              <button
                onClick={() => setFeedbackModal(false)}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Section */}
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Sidebar Stats */}
        <div className="bg-white m-4 p-5 shadow-sm border rounded-lg w-full md:w-1/4">
          <h2 className="text-blue-600 font-bold text-lg mb-3 text-center">
            Department Officer
          </h2>
          <p className="text-center text-gray-700 mb-4">
            <strong>Name:</strong> {officerName}
          </p>

          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <p className="font-semibold text-blue-700">Assigned Complaints</p>
              <h3 className="text-3xl font-bold text-blue-600">
                {complaints.length}
              </h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <p className="font-semibold text-green-700">Resolved Complaints</p>
              <h3 className="text-3xl font-bold text-green-600">
                {complaints.filter((c) => c.status === "Resolved").length}
              </h3>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="flex-1 m-4 overflow-auto rounded-lg border bg-white shadow">
          <table className="w-full text-left text-sm text-gray-700 border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Citizen</th>
                <th className="px-6 py-3">Complaint ID</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, i) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{i + 1}</td>
                  <td className="px-6 py-3">
                    <div>
                      <div className="font-medium">{c.username}</div>
                      <div className="text-xs text-gray-400">UID: {c.uid}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-green-600 font-mono">{c._id}</td>
                  <td className="px-6 py-3">{c.category}</td>
                  <td className="px-6 py-3">{c.location}</td>
                  <td className="px-6 py-3">{getStatusBadge(c.status)}</td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      {/* View Details */}
                      <button
                        onClick={() => {
                          setSelectedComplaint(c);
                          setViewModal(true);
                        }}
                      >
                        👁️
                      </button>
                      {/* Update Status */}
                      <button
                        onClick={() => {
                          setSelectedComplaint(c);
                          setUpdateModal(true);
                        }}
                      >
                        ✏️
                      </button>
                      {/* View Feedback */}
                      <button
                        onClick={() => {
                          setSelectedComplaint(c);
                          setFeedbackModal(true);
                        }}
                      >
                        💬
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {complaints.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No complaints assigned yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ResolverDashboard;
