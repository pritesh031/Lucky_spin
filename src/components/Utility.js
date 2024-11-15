import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Constant from "../utils/Constant";

export default function Utility() {
  const [algorithmPercentage, setAlgorithmPercentage] = useState();
  const [tempAlgorithmPercentage, setTempAlgorithmPercentage] = useState(0); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000");
    } else {
      fetchAlgorithmPercentage();
    }
  }, []);

  const fetchAlgorithmPercentage = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${Constant.BASE_URL}/super-admin/getPercentage`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      const backendUpdatedAt = response.data.updatedAt;
      const parsedDate = new Date(backendUpdatedAt);

      const validDate = isNaN(parsedDate.getTime())
        ? new Date().toLocaleString()
        : parsedDate.toLocaleString();

      setAlgorithmPercentage(response.data.percentage);
      setTempAlgorithmPercentage(response.data.percentage); // Set initial temp value
      setUpdatedAt(validDate);
      setLoading(false);
    } catch (error) {
      setMessage("Error fetching percentage. Please try again.");
      setLoading(false);
    }
  };

  const handleTempAlgorithmPercentageChange = (e) => {
    const value = parseFloat(e.target.value);
    // Validate the input value
    if (!isNaN(value)) {
      setTempAlgorithmPercentage(Math.max(0, Math.min(1000, value))); // Ensure it is between 0 and 100
    } else {
      setTempAlgorithmPercentage(0); // Reset to 0 if input is invalid
    }
  };

  const handleUpdatePercentage = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${Constant.BASE_URL}/super-admin/updatePercentage`,
        {
          percentage: tempAlgorithmPercentage,
          updatedAt: new Date().toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      setAlgorithmPercentage(tempAlgorithmPercentage); // Update state to reflect new percentage

      const backendUpdatedAt = response.data.updatedAt;
      const parsedDate = new Date(backendUpdatedAt);

      const validDate = isNaN(parsedDate.getTime())
        ? new Date().toLocaleString()
        : parsedDate.toLocaleString();

      setUpdatedAt(validDate);
      setMessage("Percentage updated successfully!");
      setLoading(false);
    } catch (error) {
      setMessage("Failed to update percentage. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" bg-gray-200 xl:h-[91vh] xsm:h-[88vh] xs:h-[89.2vh] xss:h-[92vh] iphone12:h-[91.5vh] iphone14:h-[92.3vh] pixel7:h-[92.4vh] gals8:h-[90.5vh] galaxyz:h-[91.8vh] flex flex-col items-center justify-center bg-gray-200 xl:p-6 xl:w-full  xsm:p-6 xsm:pl-[35px] xs:pl-[33px] xss:pl-[25px] iphone12:pl-[30px] iphone14:pl-[28px] pixel7:pl-[29px] gals8:pl-[37px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
        <div className="bg-white rounded-lg xl:w-[380px]  xsm:w-[224px] xs:w-[270px] xss:w-[305px] iphone12:w-[290px] iphone14:w-[330px] pixel7:w-[310px] gals8:w-[270px] galaxyz:w-[253px] shadow-md xl:p-6 xsm:p-3 w-80 text-center">
          <h1 className="xl:text-2xl xsm:text-lg font-bold text-gray-800 mb-4">Utility Dashboard</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="mb-6">
              <h2 className="xl:text-lg xsm:text-md font-semibold text-gray-700">Algorithm Efficiency</h2>
              <div className="flex items-center justify-center mb-4">
                <input
                  type="number"
                  value={tempAlgorithmPercentage} // Controlled input
                  onChange={handleTempAlgorithmPercentageChange}
                  className="border border-gray-300 rounded-md p-2 w-24 text-center"
                  placeholder="%"
                  min="0"
                  max="100"
                />
              </div>

              {/* Circle displaying percentage */}
              <div className="flex items-center justify-center">
                <div className="xl:w-40 xl:h-40 xsm:w-28 xsm:h-28 rounded-full bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="xl:text-3xl xsm:text-xl font-bold text-blue-600">{algorithmPercentage}%</span>
                  </div>
                  <svg className="absolute" width="100%" height="100%" viewBox="0 0 36 36">
                    <path
                      className="text-blue-400"
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${algorithmPercentage}, 100`}
                      d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleUpdatePercentage}
                className="mt-4 xl:px-4 xl:py-2 xl:text-lg xsm:px-3 xsm:py-1 xsm:text-sm bg-blue-600 text-white rounded-md"
              >
                Update Percentage
              </button>

              {updatedAt && (
                <div className="mt-4">
                  <p className="text-gray-500 xl:text-lg xsm:text-[11px]">
                    Last updated:{" "}
                    <span className="font-semibold text-gray-800">
                      {updatedAt}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Success/Error message */}
          {message && (
            <p className={`mt-4 xl:text-lg xsm:text-[12px] ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
