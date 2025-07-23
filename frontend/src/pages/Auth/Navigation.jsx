import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const [logoutApiCall] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

 const toggleDropdown = () => {
  setDropdownOpen(prev => !prev);
};

  const logoutHandler = async () => {
  console.log("Logout clicked");
  try {
    const res = await logoutApiCall().unwrap();
    console.log("Logout API success:", res);
    dispatch(logout());
    navigate("/login");
  } catch (error) {
    console.error("Logout API failed:", error);
  }
};


  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#1a1a1a] border border-gray-700 rounded shadow-xl w-[80%] max-w-3xl px-6 py-3">
      <section className="flex justify-between items-center text-white">
        {/* Left icons */}
        <div className="flex space-x-6 items-center">
          <Link to="/" className="flex items-center hover:text-gray-300">
            <AiOutlineHome size={24} />
            <span className="hidden nav-item-name ml-1">Home</span>
          </Link>
          <Link to="/movies" className="flex items-center hover:text-gray-300">
            <MdOutlineLocalMovies size={24} />
            <span className="hidden nav-item-name ml-1">Shop</span>
          </Link>
        </div>

        {/* Right user or auth links */}
        <div className="relative flex items-center space-x-4">
          {userInfo ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none hover:text-gray-300"
              >
                <span>{userInfo.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 bottom-full mb-2 w-40 bg-[#2b2b2b] border border-gray-700 rounded text-sm text-white shadow-lg">
                  {userInfo.isAdmin && (
                    <li>
                      <Link
                        to="/admin/movies/dashboard"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center hover:text-gray-300"
              >
                <AiOutlineLogin size={24} />
                <span className="hidden nav-item-name ml-1">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:text-gray-300"
              >
                <AiOutlineUserAdd size={24} />
                <span className="hidden nav-item-name ml-1">Register</span>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
