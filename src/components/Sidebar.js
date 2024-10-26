import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiUserAdd, HiUsers } from "react-icons/hi";
import { FaWallet, FaBars } from "react-icons/fa"; // FaBars as the hamburger icon
import { AiFillTool, AiOutlineHistory } from "react-icons/ai";
import { SiThealgorithms } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    navigate('/'); 
  };
  return (
    <div className="xl:w-64 xsm:w-[80px] relative">
      {/* Menu Bar for 320px screens */}
      <div className="xsm:gap-4 xl:hidden p-4 bg-gray-800 z-20 fixed top-0 left-0 w-full xsm:flex-row flex justify- items-center h-16">
        <button onClick={toggleSidebar} className="text-white xsm:text-lg">
          <FaBars />
        </button>
        <h1 className="xl:text-xl xsm:text-sm font-bold text-white">Super Admin</h1>
        <nav className="xl:w-full bg-gray-800 text-white  xl:flex xl:justify-between items-center">
        <h2 className="text-xl font-bold"></h2>
        <div className="flex pl-[80px]">
          <button
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 text-xs px-4 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-3/4"
        } fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 pt-4 text-white shadow-md z-10 transition-transform duration-300 xl:translate-x-0`}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-center mb-2">
            Super Admin
          </h1>
        </div>

        <ul>
          <li className="mb-4">
            <Link
              to="/admindata"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
            >
              <HiUsers className="h-5 w-5 mr-3" />
              Your Admins
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/create"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
            >
              <HiUserAdd className="h-5 w-5 mr-3" />
              Create Admin
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/wallet"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
            >
              <FaWallet className="h-5 w-5 mr-3" />
              Wallet
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/utility"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
            >
              <AiFillTool className="h-5 w-5 mr-3" />
              Utility
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/algorithm"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
            >
              <SiThealgorithms className="h-5 w-5 mr-3" />
              Algorithm
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/gamehistory"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
            >
              <AiOutlineHistory className="h-5 w-5 mr-3" />
              Game Id History
            </Link>
          </li>
        </ul>
      </div>

      {/* Sidebar Small Strip (always visible when closed) */}
      <div
        className={`${
          isSidebarOpen ? "hidden" : "block"
        } fixed top-0 left-0 h-full w-3 bg-gray-700 xl:hidden`}
      ></div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 xsm:text-[2px] xl:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
