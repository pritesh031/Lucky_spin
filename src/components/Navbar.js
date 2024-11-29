import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
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
    <div>
      <nav className="xl:w-full bg-gray-800 text-white p-4 xsm:flex xl:pt-[20px] xl:p-4 xsm:pt-[0px] xsm:justify-center xl:flex xl:justify-between items-center">
      <h2 className="text-xl font-bold"></h2>
        <div>
          {/* Display Connected Users */}
          <p className="xl:text-lg xsm:text-xs font-semibold">
            Connected Users: {timerData.connectedUsers}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={toggleTimer}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 xsm:hidden xl:flex"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
