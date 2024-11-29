import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000");
    }
  }, []);

  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000");
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  // Handle form submission to create a new admin
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${Constant.BASE_URL}/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Email already in use") {
          setMessage(
            "This email is already registered. Please use a different email."
          );
        } else {
          setMessage(data.message || "An error occurred. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      setMessage("Admin created successfully!");
      navigate("/success");
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="xl:h-[91vh] xsm:h-[88vh] xs:h-[91.6vh] xss:h-[94vh] iphone12:h-[93.5vh] iphone14:h-[94.3vh] pixel7:h-[94vh] gals8:h-[92.5vh] galaxyz:h-[93.8vh] flex flex-col bg-gray-200 xl:p-6 xl:w-full xsm:p-6 xsm:pl-[25px] xs:pl-[35px] xss:pl-[25px] iphone12:pl-[30px] gals8:pl-[37px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px] ">
        <div className="flex flex-grow items-center justify-center bg-gray-200">
          <div className="bg-white xl:p-8 xsm:p-4 rounded-lg shadow-xl w-96">
            <h1 className="xl:text-2xl xsm:lg font-semibold text-yellow-500 mb-6 text-center">
              Create Admin
            </h1>
            {message && (
              <div className="mb-4 p-3 bg-blue-100 xl:text-lg xsm:text-xs text-blue-700 rounded-md text-center transition-all duration-300 ease-in-out">
                {message}
              </div>
            )}
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="mt-1 block w-full xl:p-2 xsm:p-1 bg-white xsm:text-[12px] xl:text-[17px] text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="mt-1 block w-full xl:p-2 xsm:p-1 bg-white xsm:text-[12px] xl:text-[17px] bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mt-1 block w-full xl:p-2 xsm:p-1 bg-white xsm:text-[12px] xl:text-[17px] bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={isLoading}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <RxEyeOpen className="xl:text-xl xsm:text-xs text-black" />
                  ) : (
                    <FaEyeSlash className="xl:text-xl xsm:text-xs text-black" />
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="mt-1 block w-full xl:p-2 xsm:p-1 bg-white xsm:text-[12px] xl:text-[17px] bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={isLoading}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <RxEyeOpen className="xl:text-xl xsm:text-xs text-black" />
                  ) : (
                    <FaEyeSlash className="xl:text-xl xsm:text-xs text-black" />
                  )}
                </div>
              </div>

              <button
                className="w-full bg-green-600 text-white xl:p-2 xsm:p-1 xl:text-lg xsm:text-sm rounded-md hover:bg-green-700 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Creating Admin..." : "Create Admin"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
