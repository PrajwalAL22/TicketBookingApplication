import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { API_BASE_URL } from "../Config/apiConfig";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_BASE_URL}/login?username=${encodeURIComponent(
        userId
      )}&password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: "POST",
        // mode: "cors", // or "no-cors" if it's a cross-origin request
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        console.log("Login successful");
        navigate("/");
      } else {
        console.error("Login failed");
        setMessage("Login Failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-80 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl text-gray-900">
            Sign in to your account
          </h2>
          <h3 className="text-blue-600 text-xl text-center ">{message}</h3>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
                required
                className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-400 focus:border-orange-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-400 focus:border-orange-500 focus:z-10 sm:text-sm"
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
              Sign in
            </button>
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 flex justify-center mt-3"
            >
              Don't have an Account, Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
