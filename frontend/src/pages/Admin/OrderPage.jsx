import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { TbTruckDelivery } from "react-icons/tb";
import { LuArchiveRestore } from "react-icons/lu";
import { MdSort } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

// Function to generate a random status
const getRandomStatus = () => (Math.random() > 0.5 ? "Out for Delivery" : "Delivered");

function OrderPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn) {
      navigate('/login');
    }
    else if (userType !== 'admin') {
      navigate('/404');
    }
  }, [navigate]);

  const [currentPage, setCurrentPage] = useState(1);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  const handleOpenDeliveryModal = (order) => {
    setSelectedOrder(order);
    setShowDeliveryModal(true);
  };

  const handleOpenArchiveModal = (order) => {
    setSelectedOrder(order);
    setShowArchiveModal(true);
  };

  const handleConfirmDelivery = () => {
    console.log(`Order ${selectedOrder?.orderId} is out for delivery.`);
    setShowDeliveryModal(false);
  };

  const handleConfirmArchive = () => {
    console.log(`Order ${selectedOrder?.orderId} is already delivered.`);
    setShowArchiveModal(false);
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
                    Orders
                  </h1>
                </div>
                <div className='flex gap-2 items-center mt-8 justify-end'>
                  <MdSort className='text-xl' />
                  <h1 className='font-semibold font-[POPPINS] text-xl text-[#14463A]'>Sort By</h1>
                </div>
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
            <tbody className="text-center font-semibold text-black">
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
                  <td className={`py-3 px-4 ${item.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.status}
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-3">
                    <button
                      className="text-black hover:text-black"
                      onClick={() => handleOpenDeliveryModal(item)}
                    >
                      <TbTruckDelivery className="text-2xl" />
                    </button>
                    <button
                      className="text-black hover:text-green-400"
                      onClick={() => handleOpenArchiveModal(item)}
                    >
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
                    <span className="text-lg font-semibold font-[POPPINS] text-[#14463A]">
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

      {/* Confirm Out for Delivery Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
            <h2 className="text-xl font-bold text-[#14463A]">Confirm Delivery</h2>
            <p className="text-black mt-3">Are you sure this item is out for delivery?</p>
            <div className="mt-6 flex justify-center gap-4">
            <button className="bg-gray-400 text-white px-4 py-2 rounded-lg  hover:bg-green-700" onClick={handleConfirmDelivery}>Confirm</button>
            <button className="bg-[#14463A] text-white px-4 py-2 rounded-lg hover:bg-gray-500" onClick={() => setShowDeliveryModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Already Delivered Modal */}
      {showArchiveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
            <h2 className="text-xl font-bold text-[#14463A]">Confirm Delivery</h2>
            <p className="text-black mt-3">Are you sure this item is already delivered?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button className="bg-[#14463A] text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={handleConfirmArchive}>Confirm</button>
              <button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500" onClick={() => setShowArchiveModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
