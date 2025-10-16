import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname: username, pass: pass }),
      });

      // ✅ Handle admin login (no JSON response)
      if (res.status === 201) {
        alert("👑 Welcome Admin!");
        localStorage.setItem("admin_username", username);
        navigate("/admin/dashboard");
        return;
      }

      // ✅ Handle officer login (no JSON response)
      if (res.status === 202) {
        alert("⚙️ Welcome Department Officer!");
        localStorage.setItem("officer_name", username);
        navigate("/officer/dashboard");
        return;
      }

      // ✅ Parse JSON only for citizen login or errors
      const data = await res.json();

      if (res.status === 200) {
        alert("✅ Welcome Citizen!");

        // 🔥 Store citizen details for later use
        if (data.uid) {
          localStorage.setItem("uid", data.uid);
          console.log("✅ UID stored in localStorage:", data.uid);
        } else {
          console.error("⚠️ No UID received from backend");
        }
        localStorage.setItem("citizen_username", username);

        navigate("/citizen/dashboard");
      } else {
        alert("❌ Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side (Brand) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-700 to-indigo-700 justify-center items-center relative overflow-hidden">
        <div className="text-center px-6">
          <h1 className="text-white text-4xl font-bold mb-2">
            Citizen Grievance Portal
          </h1>
          <p className="text-indigo-100 text-sm font-light">
            Empowering citizens. Enabling transparent governance.
          </p>
        </div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 border-4 border-indigo-300 border-opacity-20 rounded-full" />
        <div className="absolute -top-32 -right-20 w-80 h-80 border-4 border-indigo-200 border-opacity-20 rounded-full" />
      </div>

      {/* Right Side (Form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            Sign in to continue to your dashboard
          </p>

          {/* Username */}
          <div className="flex items-center border border-gray-300 py-2 px-3 rounded-md mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 5a7 7 0 00-7 7v1h14v-1a7 7 0 00-7-7z"
              />
            </svg>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="pl-2 w-full outline-none border-none text-sm"
              type="text"
              placeholder="Enter Username"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 py-2 px-3 rounded-md mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              onChange={(e) => setPass(e.target.value)}
              className="pl-2 w-full outline-none border-none text-sm"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm font-semibold transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" /> Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center mt-4">
            <a
              href="/register"
              className="text-sm text-indigo-500 hover:text-indigo-700"
            >
              Not registered? Click here to register →
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;