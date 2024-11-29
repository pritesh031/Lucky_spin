import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Constant from "../utils/Constant";

export default function Ntp() {

  const [ntpData, setNtpData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Constant.BASE_URL}/super-admin/all-admin-ntp`);
        setNtpData(response.data.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar/>
      <div className="xl:p-6  xl:w-full bg-gray-200 xl:h-[91vh] xsm:h-[88vh] xs:h-[91.6vh] xss:h-[94vh] iphone12:h-[93.5vh] iphone14:h-[94.3vh] pixel7:h-[94vh] gals8:h-[92.5vh] galaxyz:h-[93.8vh] xsm:p-6 xsm:pl-[35px] xs:pl-[33px] xss:pl-[25px] iphone12:pl-[30px] iphone14:pl-[28px] pixel7:pl-[29px] gals8:pl-[37px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px] flex flex-col items-center">
        <h2 className="xl:text-2xl xsm:text-lg font-semibold mb-4 xsm:pt-[20px]">NTP Details</h2>
        {ntpData.length > 0 ? (
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-2 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-600 uppercase tracking-wider">
                    Admin ID
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-2 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-600 uppercase tracking-wider">
                    NTP
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ntpData.map((admin) => (
                  <tr key={admin.adminId}>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-2 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                      {admin.adminId}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-2 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm text-gray-900">
                      {admin.NTP}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Loading data...</p>
        )}
      </div>
    </>
  );
}
