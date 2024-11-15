import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Successfull() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="xl:h-[91vh] xl:h-[91vh] xsm:h-[88vh] xs:h-[89.2vh] xss:h-[92vh] iphone12:h-[91.5vh] iphone14:h-[92.3vh] pixel7:h-[92.4vh] gals8:h-[90.5vh] galaxyz:h-[91.8vh] flex flex-col justify-center items-center bg-gray-200 xl:p-6 xl:w-full xsm:p-6 xsm:pl-[35px] xs:pl-[33px] xss:pl-[25px] iphone12:pl-[30px] iphone14:pl-[28px] pixel7:pl-[29px] gals8:pl-[37px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
      <div className="bg-white p-8 rounded-lg shadow-xl xl:w-96 xsm:w-[230px] xs:w-[270px] xss:w-[305px] iphone12:w-[290px] iphone14:w-[330px] pixel7:w-[310px] gals8:w-[270px] galaxyz:w-[253px]">
        <h1 className="xl:text-3xl xsm:text-lg font-semibold text-green-500 mb-4 text-center">
          Admin Created Successfully!
        </h1>
        <p className="text-black text-center xl:text-xl xsm:text-sm mb-6">
        Check your admin in your admins
        </p>
        <button
          onClick={() => navigate("/admindata")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold xl:py-2 xl:px-4 xsm:py-2 xl:text-lg xsm:text-xs rounded-md transition duration-200 text-center"
        >
          Go to Your Admins
        </button>
      </div>
    </div>
    </>
  );
}

export default Successfull;
