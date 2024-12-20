import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Commission() {
  const [admins, setAdmins] = useState([]); // Admin list
  const [selectedAdmin, setSelectedAdmin] = useState(""); // Selected admin
  const [commission, setCommission] = useState(""); // Commission value
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch admins when the component mounts
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Fetch all admins for the current superadmin
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Please log in first");
        return;
      }

      const response = await axios.get(
        `${Constant.BASE_URL}/super-admin/all-admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming the API returns an array of admins (superadmins and other admins)
      setAdmins(response.data || []);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins. Please try again.");
    }
  };

  // Handle setting the commission for the selected admin
  const handleSetCommission = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Input validation
    if (!selectedAdmin) {
      toast.error("Please select an admin");
      setIsLoading(false);
      return;
    }

    if (commission === "" || commission < 0 || commission > 100) {
      toast.error("Commission should be between 0 and 100%");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Please log in first");
        return;
      }

      // Debugging logs
      console.log("Auth token:", token);
      console.log("Payload:", {
        adminId: selectedAdmin,
        commission: Number(commission),
      });

      const response = await axios.post(
        `${Constant.BASE_URL}/super-admin/setAdminCommission`,
        {
          adminId: selectedAdmin,
          commission: Number(commission),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Commission set successfully!");
        setCommission("");
        setSelectedAdmin("");
        fetchAdmins(); // Refresh the admin list
      }
    } catch (error) {
      console.error("Error while setting commission:", error);

      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Bad request");
      } else if (error.response?.status === 404) {
        toast.error(error.response.data.message || "Admin not found");
      } else {
        toast.error("Failed to set commission. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="xl:h-[91vh] xsm:h-[88vh] xs:h-[91.6vh] xss:h-[94vh] iphone12:h-[93.5vh] iphone14:h-[94.3vh] pixel7:h-[94vh] gals8:h-[92.5vh] galaxyz:h-[93.8vh] flex flex-col items-center justify-center bg-gray-200 xl:p-6 xl:w-full  xsm:p-6 xsm:pl-[35px] xs:pl-[33px] xss:pl-[25px] iphone12:pl-[30px] iphone14:pl-[28px] pixel7:pl-[29px] gals8:pl-[37px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
      <div className="bg-white rounded-lg shadow-lg xl:p-8 xsm:p-6 max-w-md w-full ">
      <h2 className="xl:text-2xl xsm:text-lg font-bold text-center text-gray-800 mb-6">
      Set Commission for Admin
          </h2>
          <form onSubmit={handleSetCommission}>
            <div className="mb-4">
              <label
              className="block xl:text-lg xsm:text-sm font-medium text-gray-700 mb-2"
              htmlFor="adminId"
              >
                Select Admin
              </label>
              <select
                value={selectedAdmin}
                onChange={(e) => setSelectedAdmin(e.target.value)}
                className="w-full p-3 border  xl:text-lg xsm:text-xs border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                required
              >
                <option value="">Select an Admin</option>
                {admins.map((admin) => (
                  <option key={admin._id} value={admin.adminId}>
                    {admin.name} - Current Commission: {admin.commission || 0}%
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
              className="block xl:text-lg xsm:text-sm font-medium text-gray-700 mb-2"
              htmlFor="commission"
              >
                Commission (%)
              </label>
              <input
                type="number"
                id="commission"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                className="w-full p-3 border  xl:text-lg xsm:text-xs border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                min="0"
                max="100"
                placeholder="Enter commission percentage"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full xl:py-2 xl:px-4 xsm:py-1 xsm:px-2 xl:text-lg xsm:text-sm bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              {isLoading ? "Setting Commission..." : "Set Commission"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
