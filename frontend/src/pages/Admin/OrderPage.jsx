import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCheckCircle,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { LuArchiveRestore } from "react-icons/lu";
import { MdSort } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatDateToPHT, formatToPeso } from "../../CustomFunctions";

function OrderPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");

    if (!isLoggedIn) {
      navigate("/login");
    } else if (userType !== "admin") {
      navigate("/error");
    }
  }, [navigate]);

  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Updated data for Michael with different items
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://teatrackbackend.vercel.app/orders");
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleOpenDeliveryModal = (order) => {
    setSelectedOrder(order);
    setShowDeliveryModal(true);
  };

  const handleOpenArchiveModal = (order) => {
    setSelectedOrder(order);
    setShowArchiveModal(true);
  };

  const handleConfirmDelivery = async () => {
    setShowDeliveryModal(false);
    const response = await fetch(
      `https://teatrackbackend.vercel.app/set-order-status/${selectedOrder?.orderId}`,
      {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Shipped" }),
    });
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to update order status");
    }
  };

  const handleConfirmArchive = async () => {
    setShowArchiveModal(false);
    const response = await fetch(`https://teatrackbackend.vercel.app/set-order-status/${selectedOrder?.orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Delivered" }),
    });
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to update order status");
    }
  };

  return (
    <div className="bg-[#14463A] min-h-[120vh]">
      <Navbar />
      <div className="bg-white p-8 max-w-[100rem] mx-10 mt-10 rounded-[10px] px-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#14463A]">Orders</h1>
          <div className="flex gap-3">
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md border shadow-sm text-gray-700">
                <MdSort className="text-gray-500" />
                <span className="font-medium">Sort By</span>
                <FaChevronDown className="text-xs text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-4 ">
          {orderData.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#14463A] font-medium ">
                        {order.customerName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({order.items.length}{" "}
                        {order.items.length === 1 ? "Item" : "Items"})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div>
                        Order Number:{" "}
                        <span className="text-[#14463A] font-medium">
                          {order.orderId}
                        </span>
                      </div>
                      <span>•</span>
                      <div className="text-[#14463A]">
                        {formatDateToPHT(order.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {order.status === "Delivered" ? "Completed" : order.status}
                  </span>
                </div>
              </div>

              {/* Order Details */}
              {order.items.map((item, itemIndex) => (
                <div
                  key={`${index}-${itemIndex}`}
                  className="p-6 flex border-b border-gray-100 last:border-0"
                >
                  {/* Left - Product Info */}
                  <div className="flex-grow flex space-x-4">
                    <div className="flex-none">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border border-gray-200"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <div className="mt-1 text-sm text-gray-600">
                        Category: {item.category}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <span>#{itemIndex + 1}</span>
                        <span className="mx-2">×</span>
                        <span>{item.quantity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Price & Buttons (only show for the last item) */}
                  {itemIndex === order.items.length - 1 && (
                    <div className="flex flex-col items-end space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">
                          {formatToPeso(order.totalAmount)}
                        </span>
                        <FaChevronRight className="text-gray-400" />
                      </div>

                      <div className="flex space-x-2">
                        <button
                          className={`flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors ${
                            order.status !== "Pending"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            order.status === "Pending" &&
                            handleOpenDeliveryModal(order)
                          }
                          disabled={order.status !== "Pending"}
                        >
                          <TbTruckDelivery />
                          <span className="text-sm">Update Delivery</span>
                        </button>
                        <button
                          className={`flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors ${
                            order.status !== "Shipped"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            order.status === "Shipped" &&
                            handleOpenArchiveModal(order)
                          }
                          disabled={order.status !== "Shipped"}
                        >
                          <LuArchiveRestore />
                          <span className="text-sm">Mark Delivered</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination (non-functional, just for design) */}
      <div className="max-w-[100rem] mx-10 mt-10 pb-10">
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">3</span> of{" "}
            <span className="font-medium">25</span> orders
          </div>
          <div className="flex items-center space-x-1">
            <button
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <FaAngleLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md bg-[blue-600] text-white font-medium ">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              4
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              5
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FaAngleRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Out for Delivery Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Update Delivery Status
            </h2>
            <p className="text-gray-600 mt-3 mb-5">
              Are you sure this item is out for delivery?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setShowDeliveryModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleConfirmDelivery}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Already Delivered Modal */}
      {showArchiveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Mark as Delivered
            </h2>
            <p className="text-gray-600 mt-3 mb-5">
              Are you sure this item is already delivered?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setShowArchiveModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleConfirmArchive}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
