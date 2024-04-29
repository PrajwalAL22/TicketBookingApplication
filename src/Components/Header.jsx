import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../Context/UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext); // Access user state from UserContext

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      setUser(null);
    }
  };

  return (
    <>
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex-none">
              {user && (
                <div className="flex items-center">
                  <p className="text-gray-700 mr-4">Welcome, {user.username}</p>
                </div>
              )}
            </div>
            <div className="flex justify-center" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `block ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cancellations"
                    className={({ isActive }) =>
                      `block ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Cancellations
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="flex-none">
              {user && (
                <button
                  onClick={handleLogout}
                  className="block text-gray-700 py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
