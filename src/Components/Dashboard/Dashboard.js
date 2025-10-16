import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import AddComplaintModal from "./AddComplaintModal";
import ComplaintHistory from "./ComplaintHistory";


function Dashboard() {
  const [citizen, setCitizen] = useState({
    username: localStorage.getItem("citizen_username") || "",
    uid: localStorage.getItem("citizen_uid") || "",
  });

  // Optional: You can load from backend if you want live data
  useEffect(() => {
    if (!citizen.username || !citizen.uid) {
      console.log("Citizen details missing in local storage.");
    }
  }, [citizen]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar Navigation */}
      <div className="lg:w-1/5 w-full">
        <SideNav username={citizen.username} />
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row justify-between flex-1 p-6 gap-6">
        {/* Complaint Submission */}
        <div className="w-full lg:w-1/2 h-full flex justify-center items-start">
          <AddComplaintModal />
        </div>

        {/* Complaint History & Feedback */}
        <div className="w-full lg:w-1/2 h-full">
          <ComplaintHistory uid={citizen.uid} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
