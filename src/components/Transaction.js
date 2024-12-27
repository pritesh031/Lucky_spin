import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10); // Number of transactions per page

  // Fetch transactions from API
  useEffect(() => {
    axios
      .get(`${Constant.BASE_URL}/super-admin/transactions`)
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
        <div className="xl:p-6 xsm:pt-[55px] xsm:p-3 xsm:pl-[25px] xs:pl-[20px] bg-gray-200 min-h-screen xl:w-full overflow-auto xsm:w-[270px]">
          <div className="xl:w-[calc(100vw-310px)] xsm:w-[calc(100vw-90px)]">
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
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTransactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
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
                          className={`xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium ${
                            transaction.status === "SUCCESS"
                              ? "text-green-500"
                              : transaction.status === "PENDING"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.status}
                        </td>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
                          {transaction.adminBalanceBefore}
                        </td>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap font-medium text-gray-900">
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1  xl:text-sm xsm:text-[11px] bg-indigo-600 text-white rounded-md disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1  xl:text-sm xsm:text-[11px] ">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1  xl:text-sm xsm:text-[11px]  bg-indigo-600 text-white rounded-md disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
