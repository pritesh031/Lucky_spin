import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";

const AdminWalletUpdate = () => {
  const [admins, setAdmins] = useState([]);
  const [depositAdminId, setDepositAdminId] = useState("");
  const [withdrawAdminId, setWithdrawAdminId] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositMessage, setDepositMessage] = useState("");
  const [withdrawMessage, setWithdrawMessage] = useState("");
  const [error, setError] = useState("");
  const [walletHistory, setWalletHistory] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (depositAdminId || withdrawAdminId) {
      getWalletHistory();
    }
  }, [depositAdminId, withdrawAdminId]);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${Constant.BASE_URL}/super-admin/all-admins`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else {
        setError("Failed to fetch admin list");
      }
    } catch (error) {
      setError("Error connecting to the server");
    }
  };

  const getWalletHistory = async () => {
    const adminId = depositAdminId || withdrawAdminId; 
    if (!adminId) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${Constant.BASE_URL}/super-admin/wallet-history/${adminId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setWalletHistory(data.data.transactions || []); 
        setCurrentPage(1); 
      } else {
        setError("Failed to fetch wallet history");
      }
    } catch (error) {
      setError("Error fetching wallet history");
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setDepositMessage("");
    setError("");

    if (!depositAdminId) {
      setError("Please select an admin");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${Constant.BASE_URL}/super-admin/add-to-wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            adminId: depositAdminId,
            amount: Number(depositAmount),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDepositMessage(
          `Deposit successful! New balance: ${data.newBalance}`
        );
        setDepositAmount("");
        setDepositAdminId("");

        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.adminId === depositAdminId
              ? { ...admin, walletBalance: data.newBalance }
              : admin
          )
        );

        await getWalletHistory();
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      setError("Failed to connect to the server");
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setWithdrawMessage("");
    setError("");

    if (!withdrawAdminId) {
      setError("Please select an admin");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
      `${Constant.BASE_URL}/super-admin/set-withdrawal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            adminId: withdrawAdminId,
            amount: Number(withdrawAmount),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setWithdrawMessage(
          `Withdrawal successful! New balance: ${data.newBalance}`
        );
        setWithdrawAmount("");
        setWithdrawAdminId("");

        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.adminId === withdrawAdminId
              ? { ...admin, walletBalance: data.newBalance }
              : admin
          )
        );

        await getWalletHistory();
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      setError("Failed to connect to the server");
    }
  };

  // Calculate the current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWalletHistory = walletHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(walletHistory.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 xl:h-[120vh] xsm:pl-[33px] xsm:pr-[20px] xl:p-6 xsm:p-4  flex flex-col items-center space-y-6 xl:w-full  xsm:p-6 xsm:pl-[25px] xs:pl-[27px] xss:pl-[25px] iphone12:pl-[30px] iphone14:pl-[20px] pixel7:pl-[27px] gals8:pl-[33px] galaxyz:pl-[32px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
        <div className="xl:flex xl:flex-row xsm:flex xsm:flex-col items-center xl:gap-8 xsm:gap-0">
          {/* Deposit Box */}
          <div className="xl:w-[500px] xsm:w-[240px] xs:w-[270px] xss:w-[305px] iphone12:w-[290px] iphone14:w-[330px] pixel7:w-[310px] gals8:w-[270px] galaxyz:w-[253px]  mb-4 mt-8 xl:p-6 xsm:p-4 bg-white rounded-lg shadow-xl">
            <h2 className="xl:text-2xl xsm:text-md font-bold mb-6 text-center">
              Admin Deposit Wallet
            </h2>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label
                  htmlFor="adminSelect"
                  className="block xl:text-sm xsm:text-[12px] font-medium text-gray-700 mb-1"
                >
                  Select Admin
                </label>
                <select
                  id="adminSelect"
                  value={depositAdminId}
                  onChange={(e) => setDepositAdminId(e.target.value)}
                  className="mt-1 block w-full xl:p-2 xsm:p-1 xl:text-lg xsm:text-[12px] bg-white text-black border border-gray-600 rounded-md"
                >
                  <option value="" >Select an admin</option>
                  {admins.map((admin) => (
                    <option key={admin.adminId} value={admin.adminId}>
                      {admin.name} ({admin.email}) - Balance:{" "}
                      {admin.walletBalance}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="depositAmount"
                  className="block xl:text-sm xsm:text-[12px] font-medium text-gray-700"
                >
                  Deposit Amount
                </label>
                <input
                  type="number"
                  id="depositAmount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  required
                  className="mt-1 block w-full xl:p-2 xsm:p-1 xl:text-lg xsm:text-[12px] bg-white text-black border border-gray-600 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full xl:py-3 xl:px-4 xsm:py-1 xsm:py-2 xl:text-lg xsm:text-[12px] bg-indigo-600 text-white rounded-md"
              >
                Deposit
              </button>
            </form>
            {depositMessage && (
              <div className="bg-green-100 p-3 mt-4 xl:text-lg xsm:text-[12px] ">{depositMessage}</div>
            )}
            {error && <div className="bg-red-100 p-3 mt-4 xl:text-lg xsm:text-[12px] ">{error}</div>}
          </div>

          {/* Withdraw Box */}
          <div className="xl:w-[500px] xsm:w-[240px] xs:w-[270px] xss:w-[305px] iphone12:w-[290px] iphone14:w-[330px] pixel7:w-[310px] gals8:w-[270px] galaxyz:w-[253px] mb-4 mt-8 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="xl:text-2xl xsm:text-md font-bold mb-6 text-center">
              Admin Withdraw Wallet
            </h2>
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label
                  htmlFor="withdrawAdminSelect"
                  className="block xl:text-sm xsm:text-[12px] font-medium text-gray-700 mb-1"
                >
                  Select Admin
                </label>
                <select
                  id="withdrawAdminSelect"
                  value={withdrawAdminId}
                  onChange={(e) => setWithdrawAdminId(e.target.value)}
                  className="mt-1 block w-full xl:p-2 xsm:p-1 xl:text-lg xsm:text-[12px] bg-white text-black border border-gray-600 rounded-md"
                >
                  <option value="">Select an admin</option>
                  {admins.map((admin) => (
                    <option key={admin.adminId} value={admin.adminId}>
                      {admin.name} ({admin.email}) - Balance:{" "}
                      {admin.walletBalance}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="withdrawAmount"
                  className="block xl:text-sm xsm:text-[12px] font-medium text-gray-700"
                >
                  Withdraw Amount
                </label>
                <input
                  type="number"
                  id="withdrawAmount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  required
                  className="mt-1 block w-full xl:p-2 xsm:p-1 xl:text-lg xsm:text-[12px] bg-white text-black border border-gray-600 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full xl:py-3 xl:px-4 xsm:py-1 xsm:py-2 xl:text-lg xsm:text-[12px] bg-red-600 text-white rounded-md"
              >
                Withdraw
              </button>
            </form>
            {withdrawMessage && (
              <div className="bg-green-100 p-3 mt-4 xl:text-lg xsm:text-[12px] ">{withdrawMessage}</div>
            )}
            {error && <div className="bg-red-100 p-3 mt-4 xl:text-lg xsm:text-[12px] ">{error}</div>}
          </div>
        </div>

        {/* Wallet History */}
        <div className="xl:w-[1100px] xsm:w-[240px] xs:w-[270px] xss:w-[305px] iphone12:w-[290px] iphone14:w-[330px] pixel7:w-[310px] gals8:w-[270px] galaxyz:w-[253px] overflow-x-auto p-6 bg-white rounded-lg shadow-xl ">
          <h2 className="xl:text-2xl xsm:text-md  font-bold mb-6 text-center">
            Wallet History
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-sm xsm:text-[12px] font-medium text-gray-500">
                  Sr.No
                </th>
                <th className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-sm xsm:text-[12px] font-medium text-gray-500">
                  Transaction Id
                </th>
                <th className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-sm xsm:text-[12px] font-medium text-gray-500">
                  Admin Id
                </th>
                <th className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-sm xsm:text-[12px] font-medium text-gray-500">
                  Amount
                </th>
                <th className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-sm xsm:text-[12px] font-medium text-gray-500">
                  Status
                </th>
                <th className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-sm xsm:text-[12px] font-medium text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentWalletHistory.length > 0 ? (
                currentWalletHistory.map((transaction, index) => (
                  <tr key={transaction._id}>
                    <td className="border xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left  xl:text-[15px]  xsm:text-[11px] ">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-[15px]  xsm:text-[11px] ">{transaction._id}</td>
                    <td className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-[15px]  xsm:text-[11px] ">{transaction.adminId}</td>
                    <td className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-[15px]  xsm:text-[11px] ">{transaction.amount}</td>
                    <td className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left  xl:text-[15px]  xsm:text-[11px] ">
                      {transaction.transactionType === "withdraw"
                        ? "Withdrawal"
                        : "credit"}
                    </td>
                    <td className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1 text-left xl:text-[15px] xsm:text-[11px] ">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-2  xl:text-[15px] xsm:text-[11px]">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
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
    </>
  );
};
export default AdminWalletUpdate;
