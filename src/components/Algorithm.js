import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";

export default function Algorithm() {
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000"); 
    }
  }, []);
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value) {
      axios
        .post(
          `${Constant.BASE_URL}/super-admin/choose-algorithm`,
          {
            algorithm: value,
          }
        )
        .then((response) => {
          console.log("Data posted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    }
  };
  return (
    <>
      <Navbar />
      <div className="xl:h-[91vh] xsm:h-[88vh] xs:h-[89.2vh] xss:h-[92vh] iphone12:h-[91.5vh] iphone14:h-[92.3vh] pixel7:h-[92.4vh] gals8:h-[90.5vh] galaxyz:h-[91.8vh] flex flex-col items-center justify-center bg-gray-200 xl:p-6 xl:w-full  xsm:p-6 xsm:pl-[35px] xs:pl-[33px] xss:pl-[25px] iphone12:pl-[30px] iphone14:pl-[28px] pixel7:pl-[29px] gals8:pl-[37px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
        <div className="bg-white rounded-lg shadow-lg xl:p-8 xsm:p-6 max-w-md w-full ">
          <h2 className="xl:text-2xl xsm:text-lg font-bold text-center text-gray-800 mb-6">
            Select Algorithm Option
          </h2>
          <div className="mb-4">
            <label
              htmlFor="algorithmOptions"
              className="block xl:text-lg xsm:text-sm font-medium text-gray-700 mb-2"
            >
              Choose an option:
            </label>
            <select
              id="algorithmOptions"
              value={selectedOption}
              onChange={handleSelectChange}
              className="w-full p-3 border  xl:text-lg xsm:text-xs border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
            >
              <option value="">--Select an option--</option>
              <option value="default">Default</option>
              <option value="zeroAndRandom">With Zero</option>
              <option value="minAmount">With Minimum</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => console.log(`Selected Option: ${selectedOption}`)} 
              className="mt-4 w-full xl:py-2 xl:px-4 xsm:py-1 xsm:px-2 xl:text-lg xsm:text-sm bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}