import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the styles
import Constant from "../utils/Constant"; // Make sure you have the correct path for Constant
import { FaEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
function Reset_Password() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000");
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (!checkAuthToken()) return; // Check if the user is authenticated
    axios
      .get(`${Constant.BASE_URL}/super-admin/all-admins`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setAdmins(response.data); // Assuming the response has a list of admins
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
        toast.error("Error fetching admins.");
      });
  }, []);

  const handlePasswordReset = () => {
    if (!selectedAdmin || !newPassword) {
      toast.error("Please select an admin and enter a new password.");
      return;
    }

    axios
      .post(
        `${Constant.BASE_URL}/admin/reset-password`,
        {
          adminId: selectedAdmin,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        toast.success("Password reset successful!");
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        toast.error("Error resetting password.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-10">
        <h1 className="xl:text-2xl xsm:text-md font-bold mb-4">
          Reset Admin Password
        </h1>
        <div className="xl:w-1/2 bg-gray-100 p-4 rounded shadow-lg">
          <div className="mb-4">
            <label
              htmlFor="adminSelect"
              className="block text-sm font-medium text-gray-700"
            >
              Select Admin
            </label>
            <select
              id="adminSelect"
              name="adminSelect"
              className="mt-1 p-2 border border-gray-300 rounded w-full xl:text-sm xsm:text-[12px]"
              onChange={(e) => setSelectedAdmin(e.target.value)}
              value={selectedAdmin}
            >
              <option value="" className="xl:text-sm xsm:text-[14px]">
                Select an Admin
              </option>
              {admins.map((admin) => (
                <option key={admin.adminId} value={admin.adminId}>
                  {admin.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block xl:text-sm xsm:text-[14px] font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type={passwordVisible ? "text" : "password"}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full xl:text-sm xsm:text-[12px]"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center xl:pr-[350px]  xsm:pr-[60px] xsm:pb-[100px]  xl:pb-[140px]  cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <RxEyeOpen className="xl:text-md xsm:text-xs text-black" />
              ) : (
                <FaEyeSlash className="xl:text-md xsm:text-xs text-black" />
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  );
}

export default Reset_Password;
{
  /* <div className="flex flex-col items-center mt-10">
        <h1 className="xl:text-2xl xsm:text-md font-bold mb-4">
          Reset Sub-Admin Password
        </h1>
        <div className="xl:w-1/2 bg-gray-100 p-4 rounded shadow-lg">
          <div className="mb-4">
            <label
              htmlFor="subAdminId"
              className="block xl:text-sm xsm:text-[14px] font-medium text-gray-700"
            >
              Select Sub-Admin:
            </label>
            <select
              value={subAdminId}
              onChange={(e) => setSubAdminId(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full xl:text-sm xsm:text-[12px]"
            >
              <option value="" className="xl:text-sm xsm:text-[14px]">
                Select a Sub-Admin
              </option>
              {subAdmins.map((subAdmin) => (
                <option key={subAdmin._id} value={subAdmin.subAdminId}>
                  {subAdmin.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block xl:text-sm xsm:text-[14px] font-medium text-gray-700"
            >
              New Password:
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full xl:text-sm xsm:text-[12px]"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center xl:pr-[350px]  xsm:pr-[60px] xsm:pb-[17px]  xl:pb-[140px]  cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <RxEyeOpen className="xl:text-md xsm:text-xs text-black" />
              ) : (
                <FaEyeSlash className="xl:text-md xsm:text-xs text-black" />
              )}
            </div>
          </div>
          <button
            onClick={handleResetPassword}
            className="bg-blue-500 text-white px-4 py-2 xl:text-sm xsm:text-[12px] rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </div>
      </div> */
}
