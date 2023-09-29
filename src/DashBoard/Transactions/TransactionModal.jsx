import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RotatingLines } from "react-loader-spinner";

const TransactionModal = ({ userData }) => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(
          `https://coinvault.onrender.com/v1/auth/transaction-history/${userData.userId}`
        );
        setTransactionHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching transaction history:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [userData]);

  const totalPages = Math.ceil(transactionHistory.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderTransactions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Reverse the order of transactions to display the most recent ones first
    const reversedTransactions = [...transactionHistory].reverse();

    return reversedTransactions
      .slice(startIndex, endIndex)
      .map((transaction) => (
        <li
          key={transaction._id}
          className="flex generalDevice:justify-between generalDevice:gap-[10px] gap-[10px] px-[10px] py-[10px] mobileDeviceLesserThan500:block mobileDeviceLesserThan500:w-[90%] mobileDeviceLesserThan500:border-[1px] border-[rgb(46,52,59)] mobileDeviceLesserThan500:my-[20px] mobileDeviceLesserThan500:rounded-[10px] mobileDeviceLesserThan500:mx-auto mobileDeviceLesserThan500:py-[10px]"
          style={{ color: transaction.status === "failed" ? "red" : "green" }}
        >
          <span
            className={`w-[18%] mobileDeviceLesserThan500:block mobileDeviceLesserThan500:my-[5px] capitalize font-[600] ${
              transaction.status === "failed"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {transaction.status}
          </span>

          <span className="w-[38%]  generalDevice:w-[45%] text-[rgb(171,171,171)]">
            {transaction.message}
          </span>

          <span className="hidden mobileDeviceLesserThan500:block mobileDeviceLesserThan500:my-[10px] text-[rgb(171,171,171)]">
            <span className="text-[white] font-[600]">Transaction ID:</span>{" "}
            {transaction._id}
          </span>

          <span className="w-[14%] mediumDevice:w-[20%] mobileDeviceLesserThan500:block mobileDeviceLesserThan500:my-[10px] mobileDeviceLesserThan500:w-[100%]">
            {new Date(transaction.date).toLocaleString()}
          </span>

          <span className="w-[31%] generalDevice:hidden text-[rgb(171,171,171)]">
            {transaction._id}
          </span>
        </li>
      ));
  };

  if (transactionHistory.length === 0) {
    return (
      <section className="border-[1px] border-[rgb(46,52,59)] w-[90%] largeDevice:w-[100%] h-[550px] generalDevice:mx-auto rounded-[10px] bg-[rgb(32,37,43)]">
        <div className="flex justify-center items-center pt-[240px]">
          <p className="text-[rgb(171,171,171)] font-[600]">
            No Transaction Yet
          </p>
        </div>
      </section>
    );
  }

  


  return (
    <section className="border-[1px] border-[rgb(46,52,59)] w-[90%] largeDevice:w-[100%] h-[570px] generalDevice:mx-auto rounded-[10px] bg-[rgb(32,37,43)]">
      <div>
        <div>
          <div>
            <ul className="flex gap-[10px] generalDevice:justify-between px-[10px] py-[10px] mobileDeviceLesserThan500:hidden">
              <li className="w-[18%] generalDevice:w-[20%]">Status</li>
              <li className="w-[38%] generalDevice:w-[45%]">Message</li>
              <li className="w-[14%] generalDevice:w-[20%]">Date</li>
              <li className="w-[31%] generalDevice:hidden">Transaction ID</li>
            </ul>
          </div>

          <div className="h-[550px] mediumDevice:h-[450px] largeDevice:h-[450px]">
            <ul className="h-full overflow-y-auto">{renderTransactions()}</ul>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-[20px]">
              <button
                onClick={handleClickPrev}
                disabled={currentPage === 1}
                className="mr-2 px-[30px] py-2 bg-blue-500 text-white rounded"
              >
                Prev
              </button>
              <button
                onClick={handleClickNext}
                disabled={currentPage === totalPages}
                className="ml-2 px-[30px] py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TransactionModal
