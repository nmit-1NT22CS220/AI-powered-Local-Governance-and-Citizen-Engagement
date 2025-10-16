import React, { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import SideDash from "./SideDash";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AdminDashboard() {
  const [numOfComplaints, setNoOfComplaints] = useState(0);
  const [complaintsResolved, setComplaintsResolved] = useState(0);
  const [statusModal, openStatusModal] = useState(false);
  const [usernameToRemove, setUsernameToRemove] = useState("");
  const [comments, setComments] = useState("");

  const sendData = async (e) => {
    e.preventDefault();
    if (!usernameToRemove) {
      alert("Please enter a username to remove.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/removeUser/${usernameToRemove}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert(`✅ Citizen '${usernameToRemove}' removed successfully.`);
        openStatusModal(false);
        setUsernameToRemove("");
        setComments("");
      } else {
        alert("❌ Failed to remove user. Try again.");
      }
    } catch (err) {
      console.error("Error removing user:", err);
      alert("❌ Server error. Please try again later.");
    }
  };

  return (
    <>
      <Navbar
        style={{ padding: "10px", backgroundColor: "#2563eb" }}
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand className="font-bold text-lg">
            Citizen Grievance Portal
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <button
                onClick={() => openStatusModal(true)}
                className="text-white bg-green-500 hover:bg-green-600 transition-all p-2 rounded-lg mr-4"
              >
                Remove Citizen Account
              </button>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="w-full flex relative">
        {/* Remove Citizen Modal */}
        {statusModal && (
          <div className="z-10 bg-black bg-opacity-50 flex justify-center items-center fixed inset-0">
            <div className="bg-white p-6 w-[450px] rounded-lg text-center shadow-lg">
              <form onSubmit={sendData}>
                <h2 className="text-xl font-bold mb-4 text-indigo-600">
                  Remove Citizen Account
                </h2>

                <div className="mb-4">
                  <input
                    onChange={(e) => setUsernameToRemove(e.target.value)}
                    value={usernameToRemove}
                    className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter Citizen Username"
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    onChange={(e) => setComments(e.target.value)}
                    value={comments}
                    className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    name="comments"
                    rows="2"
                    placeholder="Optional comments..."
                  />
                </div>

                <div className="flex justify-center items-center gap-3">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => openStatusModal(false)}
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sidebar + Table */}
        <SideDash
          head="Admin Dashboard"
          numOfComplaints={numOfComplaints}
          complaintsFwded={complaintsResolved}
        />

        <div className="w-4/5 p-4">
          <AdminTable
            numOfComplaints={numOfComplaints}
            setNoOfComplaints={setNoOfComplaints}
            complaintsFwded={complaintsResolved}
            setComplaintsFwded={setComplaintsResolved}
          />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
