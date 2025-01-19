import React, { useState } from 'react';
import Navbar from '../../components/NavBar';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { TbTruckDelivery } from "react-icons/tb";
import { LuArchiveRestore } from "react-icons/lu";
import { MdSort } from "react-icons/md";

// Function to generate a random status
const getRandomStatus = () => (Math.random() > 0.5 ? "Paid" : "Unpaid");

function LogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const orderData = Array(20).fill().map(() => ({
    orderId: "ORD-3L5BQJRVS",
    totalAmount: "₱400.00",
    items: "Milk Tea Tumbler",
    quantity: 2,
    timestamp: "11/16/2024 7:21AM",
    address: "B23 L29 Pecsonville...",
    status: getRandomStatus() // Randomized status for each entry
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
                <h1 className='font-semibold font-[POPPINS] text-xl'>Sort By</h1>
            </div>
            </div>
        </div>
            <table className='w-full'>
            <thead className="bg-white text-[#14463A]">
            {/* Table Headers */}
            <tr className="text-center font-bold border-t-2">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            {/* Body Section */}
            <tbody className="text-center font-semibold">
              {currentItems.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-[#0D2F264D]' : 'bg-white'
                  } border-b`}
                >
                  <td className="py-3 px-4">{item.orderId}</td>
                  <td className="py-3 px-4">{item.totalAmount}</td>
                  <td className="py-3 px-4">{item.items}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">{item.timestamp}</td>
                  <td className="py-3 px-4">{item.address}</td>
                  <td className={`py-3 px-4 ${item.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.status}
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-3">
                    <button className="text-black hover:text-black">
                      <TbTruckDelivery className="text-2xl" />
                    </button>
                    <button className="text-black hover:text-green-400">
                      <LuArchiveRestore className="text-2xl" />
                    </button>
                  </td>
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
