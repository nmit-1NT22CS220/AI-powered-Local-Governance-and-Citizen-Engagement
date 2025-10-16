import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔹 Global Components
import CitizenNavbar from "./Components/Navbar";

// 🔹 Pages
import Hero from "./Components/home/Hero";
import Login from "./Components/Login";
import Register from "./Components/Register";

// 🔹 Dashboards
import CitizenDashboard from "./Components/Dashboard/Dashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import OfficerDashboard from "./Components/Dashboard/ResolverDashboard";

// 🔹 Optional future pages
// import About from "./Components/About";
// import Contact from "./Components/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-gray-50 min-h-screen">
        {/* 🌐 Top Navbar (Visible on all pages) */}
        <CitizenNavbar />

        {/* 🔹 App Routes */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Citizen Dashboard */}
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />

          {/* Department Officer Dashboard */}
          <Route path="/officer/dashboard" element={<OfficerDashboard />} />

          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Future Pages */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
