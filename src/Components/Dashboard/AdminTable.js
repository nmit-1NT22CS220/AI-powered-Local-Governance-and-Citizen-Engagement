import React, { useState, useEffect } from "react";

function AdminTable(props) {
  const [complaints, setComplaints] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [forwardModal, setForwardModal] = useState(false);
  const [officer, setOfficer] = useState("");

  // Fetch all complaints
  useEffect(() => {
    fetch("http://localhost:8000/admin")
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data.reverse());
        props.setNoOfComplaints(data.length);
        props.setComplaintsFwded(
          data.filter((c) => c.status === "Resolved").length
        );
      })
      .catch((err) => console.error("Error fetching complaints:", err));
  }, [deleteModal, forwardModal]);

  // Delete complaint
  async function deleteComplaint(id) {
    try {
      const res = await fetch(`http://localhost:8000/complaints/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("🗑️ Complaint deleted successfully");
        setDeleteModal(false);
      } else {
        alert("❌ Failed to delete complaint");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error. Try again later.");
    }
  }

  // Forward complaint to officer
  async function forwardComplaint() {
    if (!officer) {
      alert("Please select an officer before forwarding.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/complaints/${selectedComplaint._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            departmentOfficer: officer,
            status: "In Progress",
            comments: `Forwarded to ${officer}`,
          }),
        }
      );

      if (res.ok) {
        alert(`✅ Complaint forwarded to ${officer}`);
        setForwardModal(false);
        setOfficer("");
        setSelectedComplaint(null);
      } else {
        alert("❌ Failed to forward complaint.");
      }
    } catch (err) {
      console.error("Forward error:", err);
      alert("Server error while forwarding complaint.");
    }
  }

  // Status badge color
  const getStatusBadge = (status) => {
    const styles = {
      Submitted: "bg-yellow-100 text-yellow-700",
      "In Progress": "bg-blue-100 text-blue-700",
      Resolved: "bg-green-100 text-green-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          styles[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="relative">
      {/* View Modal */}
      {viewModal && selectedComplaint && (
        <div className="z-10 bg-black bg-opacity-40 flex justify-center items-center fixed inset-0">
          <div className="bg-white w-[50vw] rounded-lg p-8 shadow-lg text-center border">
            <h2 className="text-lg font-semibold mb-4 text-indigo-600">
              Complaint Details
            </h2>
            <div className="bg-indigo-50 p-4 rounded text-left text-gray-700">
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
                <strong>Officer:</strong>{" "}
                {selectedComplaint.departmentOfficer || "Not Assigned"}
              </p>
              <p className="mt-3">
                <strong>Description:</strong>
                <br />
                {selectedComplaint.description}
              </p>
              <p className="mt-3">
                <strong>Status:</strong> {getStatusBadge(selectedComplaint.status)}
              </p>
            </div>

            <button
              onClick={() => setViewModal(false)}
              className="mt-4 bg-indigo-500 px-7 py-2 rounded-md text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && selectedComplaint && (
        <div className="z-10 bg-black bg-opacity-40 flex justify-center items-center fixed inset-0">
          <div className="bg-white px-10 py-8 rounded-lg text-center shadow-lg border">
            <h2 className="text-sm mb-4 font-bold text-gray-600">
              Delete complaint by{" "}
              <span className="text-red-600">{selectedComplaint.username}</span>?
            </h2>
            <p className="text-gray-500 mb-4">
              This action cannot be undone. Confirm deletion?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => deleteComplaint(selectedComplaint._id)}
                className="bg-red-500 px-6 py-2 rounded-md text-white font-semibold"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-400 px-6 py-2 rounded-md text-white font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forward Modal */}
      {forwardModal && selectedComplaint && (
        <div className="z-20 bg-black bg-opacity-40 flex justify-center items-center fixed inset-0">
          <div className="bg-white px-10 py-8 rounded-lg text-center shadow-lg border w-[400px]">
            <h2 className="text-lg mb-4 font-bold text-indigo-600">
              Forward Complaint
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Complaint ID: <b>{selectedComplaint._id}</b>
            </p>
            <select
              onChange={(e) => setOfficer(e.target.value)}
              value={officer}
              className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Officer / Department</option>
              <option value="ofiicer">Gram Panchayat</option>
              <option value="officer">Water Board</option>
              <option value="officer">Public Works Dept</option>
              <option value="officer">Health Department</option>
              <option value="officer">Electricity Board</option>
            </select>

            <div className="flex justify-center gap-3">
              <button
                onClick={forwardComplaint}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold"
              >
                Forward
              </button>
              <button
                onClick={() => setForwardModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complaint Table */}
      <div className="h-[88vh] w-full overflow-auto rounded-lg border border-gray-300 shadow-sm m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Citizen</th>
              <th className="px-6 py-3 font-semibold">Complaint ID</th>
              <th className="px-6 py-3 font-semibold">Officer</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Location</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c, index) => (
              <tr key={c._id} className="hover:bg-gray-50 border-t">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">
                  <div>
                    <div className="font-medium">{c.username}</div>
                    <div className="text-xs text-gray-400">UID: {c.uid}</div>
                  </div>
                </td>
                <td className="px-6 py-3 text-xs text-green-600 font-mono">
                  {c._id}
                </td>
                <td className="px-6 py-3 text-sm">
                  {c.departmentOfficer || <span className="text-gray-400">—</span>}
                </td>
                <td className="px-6 py-3">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                    {c.category}
                  </span>
                </td>
                <td className="px-6 py-3">{c.location || "-"}</td>
                <td className="px-6 py-3">{getStatusBadge(c.status)}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    {/* View Button */}
                    <button
                      onClick={() => {
                        setSelectedComplaint(c);
                        setViewModal(true);
                      }}
                      className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      👁️ <span>Details</span>
                    </button>


                    {/* Forward Button */}
                    <button
                      onClick={() => {
                        setSelectedComplaint(c);
                        setForwardModal(true);
                      }}
                      className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm px-3 py-1.5 rounded-md shadow-sm hover:shadow-green-400/40 hover:scale-105 transition-all duration-200"
                    >
                      🔁 <span className="font-medium">Forward</span>
                    </button>


                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        setSelectedComplaint(c);
                        setDeleteModal(true);
                      }}
                    >
                      🗑️delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {complaints.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No complaints found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminTable;
