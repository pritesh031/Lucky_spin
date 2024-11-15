import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Constant from "../utils/Constant";

const cardNumbers = {
  A001: "Jheart",
  A002: "Jspade",
  A003: "Jdiamond",
  A004: "Jclub",
  A005: "Qheart",
  A006: "Qspade",
  A007: "Qdiamond",
  A008: "Qclub",
  A009: "Kheart",
  A010: "Kspade",
  A011: "Kdiamond",
  A012: "Kclub",
};

const GameHistory = () => {
  const [gameHistoryData, setGameHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const navigate = useNavigate();

  const fetchGameHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
        return;
      }

      const response = await axios.get(
        `${Constant.BASE_URL}/super-admin/game-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedData = response.data.data.games || [];
      setGameHistoryData(fetchedData);
    } catch (err) {
      setError("Failed to load game history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    } else {
      fetchGameHistory();
    }
  }, [navigate]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = gameHistoryData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(gameHistoryData.length / rowsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  
  return (
    <>
      <Navbar />
      <div className="min-h-screen  flex items-center justify-center bg-gray-200 xl:w-full xsm:p-6 xsm:pl-[37px] xs:pl-[31px] xss:pl-[25px] iphone12:pl-[30px] iphone14:pl-[24px] pixel7:pl-[27px] gals8:pl-[35px] galaxyz:pl-[35px] xsm:w-[270px] xs:w-[320px] xss:w-[355px] iphone12:w-[335px] iphone14:w-[370px] pixel7:w-[355px] gals8:w-[310px] galaxyz:w-[293px] mxs:w-[370px]">
      <div className=" xl:w-full  xsm:w-[240px] xs:w-[280px] xss:w-[305px] iphone12:w-[290px] iphone14:w-[330px] pixel7:w-[310px] gals8:w-[270px] galaxyz:w-[253px] xl:min-h-[500px]  h-auto xl:p-6 xsm:p-3 rounded-lg bg-white">
          <h1 className="xl:text-3xl xsm:text-lg font-bold mb-6 text-gray-800">
            Game History
          </h1>

          <div className="border border-gray-300 shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] font-semibold text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] font-semibold text-gray-700 uppercase">
                    Admin ID
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] font-semibold text-gray-700 uppercase">
                    Date
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] font-semibold text-gray-700 uppercase">
                    Tickets Sold
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] font-semibold text-gray-700 uppercase">
                    Winning Amount
                  </th>
                  <th className="xl:px-6 xl:py-3 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] font-semibold text-gray-700 uppercase">
                    Cards
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRows.length > 0 ? (
                  currentRows.map((game) => {
                    const ticketsSold = game.Bets.map(
                      (bet) => bet.ticketsID
                    ).join(", ");
                    const winningAmount = game.Bets.reduce((total, bet) => {
                      return (
                        total +
                        bet.card.reduce((acc, card) => acc + card.Amount, 0)
                      );
                    }, 0);

                    const cardIcons = game.Bets.flatMap((bet) =>
                      bet.card.map(
                        (card) => cardNumbers[card.cardNo] || card.cardNo
                      )
                    ).join(", ");

                    return (
                      <tr key={game._id}>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] font-medium text-gray-900">
                          {game._id}
                        </td>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] text-gray-900">
                          {game.Bets.length > 0 ? game.Bets[0].adminID : "N/A"}
                        </td>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] text-gray-900">
                          {new Date(game.createdAt).toLocaleDateString()}
                        </td>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] text-gray-900">
                          {ticketsSold}
                        </td>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] text-gray-900">
                          {winningAmount}
                        </td>
                        <td className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-1 xl:text-sm xsm:text-[11px] text-gray-900">
                          {cardIcons || "No Cards"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="xl:px-6 xl:py-4 xsm:px-6 xsm:py-2  text-center xl:text-sm xsm:text-xs text-gray-500"
                    >
                      No game history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1  xl:text-sm xsm:text-[11px] bg-indigo-600 text-white rounded-md disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1  xl:text-sm xsm:text-[11px]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="xl:px-4 xl:py-2 xsm:px-4 xsm:py-1  xl:text-sm xsm:text-[11px] bg-indigo-600 text-white rounded-md disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameHistory;
