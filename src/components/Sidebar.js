import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Link } from "react-router-dom";
import { HiUserAdd, HiUsers } from "react-icons/hi";
import { FaWallet, FaBars, FaMoneyCheckAlt } from "react-icons/fa";
import { AiFillTool, AiOutlineHistory } from "react-icons/ai";
import { SiThealgorithms } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
  const [timerData, setTimerData] = useState({
    remainingTime: 120,
    isRunning: false,
    connectedUsers: 0,
    totalLogins: 0,
    uniqueUsers: 0,
    calculatedAmounts: null,
  });
  const [socket, setSocket] = useState(null);
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  

  const toggleTimer = async () => {
    try {
      const url = isTimerRunning
        ? 'https://lucky-card-backend.onrender.com/api/super-admin/stop-timer'
        : 'https://lucky-card-backend.onrender.com/api/super-admin/start-timer';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsTimerRunning(!isTimerRunning); 
      } else {
        console.error('Failed to toggle timer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    const newSocket = io('https://lucky-card-backend.onrender.com');
    setSocket(newSocket);

    // Listen for timer and user updates
    newSocket.on('timerUpdate', (data) => {
      setTimerData(data);
    });
    newSocket.on('userCountUpdate', (data) => {
      setTimerData((prev) => ({
        ...prev,
        connectedUsers: data.loggedInUsers,
        totalLogins: data.totalLogins,
        uniqueUsers: data.uniqueUsers,
      }));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="xl:w-64 xsm:w-[60px] relative">
      {/* Mobile Menu Bar */}
      <div className="xsm:gap-4 h-[95px] xl:hidden p-4 bg-gray-800 z-20 fixed top-0 left-0 w-full xsm:flex-col flex justify-between items-center h-16">
       <div className='flex flex-row justify-between items-center xsm:gap-14 xs:gap-[80px] xss:gap-[100px] iphone12:gap-[90px] iphone14:gap-[110px] pixel7:gap-[100px] gals8:gap-[70px] galaxyz:gap-[64px]'>
        <button onClick={toggleSidebar} className="text-white xsm:text-lg">
          <FaBars />
        </button>
        <h1 className="xl:text-xl xsm:text-sm font-bold text-white">
          Super Admin
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 text-xs px-4 rounded-md transition duration-200"
        >
          Logout
        </button>
        </div>
        <div className='flex flex-row pl-[65px] items-center xsm:gap-2'>
        <p className="xl:text-lg xsm:text-xs text-white font-semibold">
            Connected Users: {timerData.connectedUsers}
          </p>
        <button
            onClick={toggleTimer}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold flex justify-end py-1.5 text-xs px-4 rounded-md transition duration-200"
          >
            {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
          </button>
          </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-3/4 xl:translate-x-0"
        } fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 pt-4 text-white shadow-md z-10 transition-transform duration-300`}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-center mb-2">
            Super Admin
          </h1>
        </div>

        <ul className='xsm:pt-[30px]'>
          {[
            { to: "/admindata", icon: <HiUsers />, label: "Your Admins" },
            { to: "/create", icon: <HiUserAdd />, label: "Create Admin" },
            { to: "/wallet", icon: <FaWallet />, label: "Wallet" },
            { to: "/utility", icon: <AiFillTool />, label: "Utility" },
            { to: "/algorithm", icon: <SiThealgorithms />, label: "Algorithm" },
            { to: "/gamehistory", icon: <AiOutlineHistory />, label: "Game Id History" },
            { to: "/ntp", icon: <FaMoneyCheckAlt />, label: "NTP" }
          ].map((item, index) => (
            <li key={index} className="mb-4">
              <Link
                to={item.to}
                className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
              >
                {item.icon}
                {/* Show label only if sidebar is open or on larger screens */}
                <span className={`ml-3 ${isSidebarOpen || "hidden xl:block"}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Small Sidebar Strip for Mobile Icons Only */}
      {!isSidebarOpen && (
        <div className="fixed top-[80px] left-0 h-full w-[60px] bg-gray-800 p-4 text-white shadow-md z-10 xl:hidden">
          <ul className="space-y-6 pt-[20px]">
            <li>
              <Link to="/admindata" className="flex justify-center">
                <HiUsers className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link to="/create" className="flex justify-center">
                <HiUserAdd className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link to="/wallet" className="flex justify-center">
                <FaWallet className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link to="/utility" className="flex justify-center">
                <AiFillTool className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link to="/algorithm" className="flex justify-center">
                <SiThealgorithms className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link to="/gamehistory" className="flex justify-center">
                <AiOutlineHistory className="h-5 w-5" />
              </Link>
            </li>
            <li>
              <Link to="/ntp" className="flex justify-center">
                <FaMoneyCheckAlt className="h-5 w-5" />
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 xl:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;



// import React from "react";
// import { Link } from "react-router-dom";
// import { HiUserAdd, HiUsers } from "react-icons/hi";
// import { FaWallet } from 'react-icons/fa';
// import { AiFillTool } from 'react-icons/ai';
// import { AiOutlineHistory } from 'react-icons/ai';
// import { SiThealgorithms } from "react-icons/si";
// import { FaMoneyCheckAlt } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gray-800  p-4 pt-4 text-white shadow-md ">
//       <div className="mb-6">
//         <h1 className="text-2xl font-extrabold text-center mb-2">
//           Super Admin{" "}
//         </h1>
//       </div>
//       <ul>
//         <li className="mb-4">
//           <Link
//             to="/admindata"
//             className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
//           >
//             <HiUsers className="h-5 w-5 mr-3" />
//             Your Admins
//           </Link>
//         </li>
//         <li className="mb-4">
//           <Link
//             to="/create"
//             className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
//           >
//             <HiUserAdd className="h-5 w-5 mr-3" />
//             Create Admin
//           </Link>
//         </li>
//         <li className="mb-4">
//           <Link
//             to="/wallet"
//             className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
//           >
//             <FaWallet className="h-5 w-5 mr-3" />
//             Wallet{" "}
//           </Link>
//         </li>
//         <li className="mb-4">
//           <Link
//             to="/utility"
//             className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
//           >
//             <AiFillTool className="h-5 w-5 mr-3" />
//             Utility
//           </Link>
//         </li>
//         <li className="mb-4">
//           <Link
//             to="/algorithm"
//             className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
//           >
//             <SiThealgorithms className="h-5 w-5 mr-3" />
//             Algorithm
//           </Link>
//         </li>
//         <li className="mb-4">
//           <Link
//             to="/gamehistory"
//             className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
//           >
//             <AiOutlineHistory className="h-5 w-5 mr-3" />
//             Game Id History
//           </Link>
//         </li>
//         <li className="mb-4">
//           <Link
//             to="/ntp"
//             className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold"
//           >
//             <FaMoneyCheckAlt className="h-5 w-5 mr-3" />
//             NTP
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };
// export default Sidebar;
