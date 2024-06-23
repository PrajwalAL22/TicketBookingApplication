import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../Config/apiConfig";

const Register = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const url = `${API_BASE_URL}/register?username=${encodeURIComponent(
        userId
      )}&password=${encodeURIComponent(password)}`;
      const response = await fetch(url, {
        method: "POST",
      });

      if (response.ok) {
        console.log("Registration successful");
        setMessage("Registration successful");
      } else {
        const errorMessage = await response.text();
        console.error("Registration failed:", errorMessage);
        setMessage(errorMessage || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      setMessage("Error registering: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-80 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl text-gray-900">
            Register an account
          </h2>
          <h3 className="text-blue-600 text-xl text-center ">{message}</h3>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleRegister();
          }}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="userId" className="sr-only">
                User ID
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                autoComplete="username"
                required
                className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md  focus:ring-orange-400 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-400 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
            >
              Register
            </button>
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 flex justify-center mt-3"
            >
              Already have an Account, Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
