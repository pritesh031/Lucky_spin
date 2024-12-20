import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Constant from "../utils/Constant";
export default function SubAdmins() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [error, setError] = useState("");

  // Fetching SubAdmins
  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await axios.get(
          `${Constant.BASE_URL}/super-admin/getAllSubAdmins`
        ); // API call
        setSubAdmins(response.data.data); // Set the `data` array
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
    };

    fetchSubAdmins();
  }, []);

  return (
    <>
      <Navbar />
      <div className="xl:p-6 xsm:pt-[55px] xsm:p-3 xsm:pl-[25px] xs:pl-[20px] bg-gray-200 min-h-screen xl:w-full overflow-auto  xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
        <h1 className="xl:text-3xl xsm:text-lg font-bold text-gray-800 mb-4">
          Sub-Admins
        </h1>
        {subAdmins.length > 0 ? (
          <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="xl:min-w-full divide-y divide-gray-200 xsm:w-[350px]">
                <thead className="bg-gray-50">
                  <tr className="xsm:py-1">
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Created On
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Creator Admin ID
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Creator Name
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Creator Email
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Wallet
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subAdmins.map((subAdmin, index) => (
                    <tr key={subAdmin._id} className="text-center">
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {subAdmin.name}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {subAdmin.email}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(subAdmin.createdAt).toLocaleDateString()}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {subAdmin.createdBy}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {subAdmin.creatorAdmin?.name}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {subAdmin.creatorAdmin?.email}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {subAdmin.commission}
                      </td>

                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {subAdmin.wallet}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No Sub-Admins found.</p>
        )}
      </div>
    </>
  );
}
