import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdSort } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function LogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const itemsPerPage = 10;

  const orderData = Array(20).fill().map(() => ({
    orderId: "Add Item",
    totalAmount: "Added Bobo Tea Pearl",
    items: "January 14, 2025 2:10PM",
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orderData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const formatDateToPHT = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 8);
    return date.toLocaleString("en-PH", {
      timeZone: "Asia/Manila", // Convert to Philippine Time (PHT)
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');

    if (!isLoggedIn) {
      navigate('/login');
    }
    else if (userType !== 'admin') {
      navigate('/error');
    }

    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:8081/logs");
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-[#14463A] min-h-screen text-white">
      <Navbar />
      <div className="p-8 px-40">

        {/* Inventory Table */}
        <div className="px-6 bg-white rounded-lg shadow-lg">
          <div className="w-full text-black">
            <div>
              <div className="py-3 flex justify-between items-center">
                <div>
                  <h1 className="py-4 text-[#14463A] text-start text-3xl font-bold">
                    Logs
                  </h1>
                </div>
                <div className='flex gap-2 items-center mt-8 justify-end'>
                  <MdSort className='text-xl' />
                  <h1 className='font-semibold font-[POPPINS] text-xl text-[#14463A]'>Sort By</h1>
                </div>
              </div>
            </div>
            <table className='w-full'>
              <thead className="bg-white text-[#14463A]">
                {/* Table Headers */}
                <tr className="text-center font-bold border-t-2">
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4">Date & Time</th>
                </tr>
              </thead>

              {/* Body Section */}
              <tbody className="text-center font-semibold">
                {logs.map((log, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-[#0D2F264D]' : 'bg-white'
                      } border-b`}
                  >
                    <td className="py-3">{log.action}</td>
                    <td className="py-3 px-14">{log.description}</td>
                    <td className="py-3 px-4 font-light">{formatDateToPHT(log.created_at)}</td>
                  </tr>
                ))}
              </tbody>

              {/* Pagination Inside Table */}
              <tfoot>
                <tr>
                  <td colSpan="8" className="py-8 text-center">
                    <div className="flex justify-end gap-x-4 items-center">
                      {/* Left Arrow */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="text-[#14463A] hover:text-green-700 disabled:opacity-50"
                      >
                        <FaAngleLeft size={20} />
                      </button>

                      {/* Page Numbers */}
                      <span className="text-lg font-semibold font-[POPPINS]">
                        Page {currentPage} of {totalPages}
                      </span>

                      {/* Right Arrow */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="text-[#14463A] hover:text-green-700 disabled:opacity-50"
                      >
                        <FaAngleRight size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogPage;
