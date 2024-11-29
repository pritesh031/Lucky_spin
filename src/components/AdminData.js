import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";
import Modal from "./Modal";

function AdminData() {
  const [data, setData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [gameDetails, setGameDetails] = useState([]);
  const [filteredGameDetails, setFilteredGameDetails] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!checkAuthToken()) return;
    axios
      .get(`${Constant.BASE_URL}/super-admin/all-admins`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);

  const handleCheckDetails = async (admin) => {
    setSelectedAdmin(admin);
    setPopupOpen(true);

    try {
      const response = await axios.get(
        `${Constant.BASE_URL}/super-admin/winnings/${admin.adminId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      const sortedGameDetails = response.data.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setGameDetails(sortedGameDetails);
      setFilteredGameDetails(sortedGameDetails);
    } catch (error) {
      console.error("Error fetching game details:", error);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedAdmin(null);
    setGameDetails([]);
    setFilteredGameDetails([]);
    setSelectedDate("");
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    if (selected) {
      const filtered = gameDetails.filter((game) => {
        const gameDate = new Date(game.createdAt).toISOString().split("T")[0];
        return gameDate === selected;
      });
      setFilteredGameDetails(filtered);
    } else {
      setFilteredGameDetails(gameDetails);
    }
  };

  // Handle reset button click
  const handleResetFilter = () => {
    setFilteredGameDetails(gameDetails);
    setSelectedDate("");
  };

  const handleDelete = (adminId) => {
    if (!checkAuthToken()) return;
    setSelectedEmail(adminId);
    setActionType("delete");
    setModalOpen(true);
  };

  const toggleBlockUnblock = (admin) => {
    if (!checkAuthToken()) return;
    setSelectedAdmin(admin);
    setSelectedEmail(admin.adminId);
    setActionType(admin.isBlocked ? "unblock" : "block");
    setModalOpen(true);
  };

  const confirmAction = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000");
      return;
    }
    let apiUrl = "";
    if (actionType === "delete") {
      apiUrl = `${Constant.BASE_URL}/super-admin/delete-admin`;
    } else if (actionType === "block") {
      apiUrl = `${Constant.BASE_URL}/super-admin/block-admin`;
    } else if (actionType === "unblock") {
      apiUrl = `${Constant.BASE_URL}/super-admin/unblock-admin`;
    }
    try {
      await axios.post(
        apiUrl,
        { adminId: selectedEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (actionType === "delete") {
        setData((prevData) =>
          prevData.filter((item) => item.adminId !== selectedEmail)
        );
      } else {
        setData((prevData) =>
          prevData.map((item) =>
            item.adminId === selectedEmail
              ? { ...item, isBlocked: actionType === "block" }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
    setModalOpen(false);
    setSelectedEmail("");
  };

  return (
    <>
      <Navbar />
      <div className="xl:p-6 xsm:pt-[55px] xsm:p-3 xsm:pl-[25px] xs:pl-[20px] bg-gray-200 min-h-screen xl:w-full overflow-auto  xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
        <h1 className="xl:text-3xl xsm:text-lg font-bold text-gray-800 mb-4 ">Admin Data</h1>
        {data.length > 0 ? (
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
                    Wallet Balance
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Admin Data
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 text-left xl:text-sm xsm:text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.email}>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap  font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.email}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(item.creationDate).toLocaleDateString()}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{item.walletBalance}
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        className="mr-2 text-white bg-green-600 hover:bg-green-700 font-semibold xl:py-1 xl:px-2 xsm:py-[2px] xsm:px-2 rounded"
                        onClick={() => handleCheckDetails(item)}
                      >
                        Check Details
                      </button>
                    </td>
                    <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        className="mr-2 text-white bg-red-500 hover:bg-red-600 font-semibold  xl:py-1 xl:px-2 xsm:py-[2px] xsm:px-2 rounded"
                        onClick={() => handleDelete(item.adminId)}
                      >
                        Delete
                      </button>
                      <button
                        className={`mr-2 text-white font-semibold  xl:py-1 xl:px-2 xsm:py-[2px] xsm:px-2 rounded ${
                          item.isBlocked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                        onClick={() => toggleBlockUnblock(item)}
                      >
                        {item.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-gray-500">No admin data available.</div>
        )}
      </div>

      {/* Static Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center xl:pl-[100px] xsm:pl-[15px] xsm:pr-[15px] bg-gray-900 bg-opacity-75 z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white xl:p-8 xsm:p-4 rounded-lg shadow-xl max-w-5xl w-full xl:h-[500px] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="xl:flex xl:flex-row xsm:flex xsm:flex-col items-center xl:gap-[310px]">
              <h2 className="xl:text-2xl xsm:text-lg font-bold mb-6 text-gray-800">
                Admin Game Details
              </h2>

              {/* Date filter input */}
              <div className="mb-4 xl:flex xl:flex-row xsm:flex xsm:flex-col items-center xl:space-x-4  ">
                <label
                  htmlFor="filter-date"
                  className="text-gray-700 font-medium"
                >
                  Filter by Date:
                </label>
                <div className="xsm:flex xsm:flex-row xsm:space-x-2">
                <input
                  type="date"
                  id="filter-date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="xl:px-4 xl:py-2 xsm:px-2 xsm:py-[2px] border rounded-md"
                />
                <button
                  className="bg-blue-500 text-white xl:text-md xsm:text-[12px] xl:px-4 xl:py-2 xsm:px-2 xsm:py-[2px] rounded-md hover:bg-blue-600"
                  onClick={handleResetFilter}
                >
                  Reset Filter
                </button>
                </div>
              </div>
            </div>
            {/* Game details table */}
            <div className="w-full h-[350px] overflow-auto scrollbar-hide rounded-lg mb-4 border border-gray-300">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] font-semibold text-gray-700">
                      Game ID
                    </th>
                    <th className="border  xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] font-semibold text-gray-700">
                      Admin ID
                    </th>
                    <th className="border  xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] font-semibold text-gray-700">
                      Winning Amount
                    </th>
                    <th className="border  xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] font-semibold text-gray-700">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGameDetails.length > 0 ? (
                    filteredGameDetails.map((game) => (
                      <tr
                        key={game._id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="border xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] text-gray-800 ">
                          {game.gameId}
                        </td>
                        <td className="border xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] text-gray-800 ">
                          {game.adminId}
                        </td>
                        <td className="border xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] text-gray-800 ">
                          ₹{game.winningAmount}
                        </td>
                        <td className="border xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] text-gray-800 ">
                          {new Date(game.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="border xl:px-6 xl:py-3 xsm:px-6 xsm:py-0.5 xl:text-lg xsm:text-[12px] text-center text-gray-500 "
                      >
                        No game details available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button
              className="absolute xl:bottom-2 xsm:bottom-0.5 right-6 bg-red-500 text-white hover:bg-red-600 font-semibold xl:px-6 xl:py-2 xsm:px-4 xsm:py-1 xl:text-lg xsm:text-[12px] rounded-lg shadow-md "
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal
          message={`Are you sure you want to ${
            actionType === "delete"
              ? "delete"
              : actionType === "block"
              ? "block"
              : "unblock"
          } the admin?`}
          onCancel={() => setModalOpen(false)}
          onConfirm={confirmAction}
          className="xsm:w-[100px]"
        />
      )}
    </>
  );
}

export default AdminData;
