import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch transactions from API
  useEffect(() => {
    axios
      .get(`${Constant.BASE_URL}/super-admin/transactions`) // Update the URL based on your backend
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar (Assumed already present) */}
        <div
          className={`${
            sidebarCollapsed ? "w-1" : "w-6"
          } bg-gray-800 text-white transition-all duration-300 ease-in-out`}
        >
          {/* Sidebar content with toggle button */}
        </div>

        {/* Main Content */}
        <div className="xl:p-6 xsm:pt-[55px] xsm:p-3 xsm:pl-[25px] xs:pl-[20px] bg-gray-200 min-h-screen xl:w-full overflow-auto  xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
          <h1 className="xl:text-3xl xsm:text-lg font-bold text-gray-800 mb-4 ">
            Transaction History
          </h1>
          <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
            <div className="overflow-x-auto">
              <table className="xl:min-w-full divide-y divide-gray-200 xsm:w-[350px]">
                <thead className="bg-gray-50">
                  <tr className="xsm:py-1">
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Admin ID
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      SubAdmin ID
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Admin Balance Before
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Admin Balance After
                    </th>
                    <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Date{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {transaction._id}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.adminId}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.subAdminId}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.amount}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.transactionType}
                      </td>
                      <td
                        className={`xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900 ${
                          transaction.status === "SUCCESS"
                            ? "text-green-500"
                            : transaction.status === "PENDING"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.status}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {transaction.adminBalanceBefore}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                        {transaction.adminBalanceAfter}
                      </td>
                      <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
