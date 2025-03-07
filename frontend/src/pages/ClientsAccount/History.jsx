import React, { useState, useEffect } from 'react';
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar';
import ClientFooter from '../../components/clients-components/ClientFooter';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { formatDateToPHT, formatToPeso } from '../../CustomFunctions';

const History = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    if (!isLoggedIn) {
      navigate('/login');
    }
    else if (userType !== 'client') {
      navigate('/error');
    }
  }, []);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`https://teatrackbackend.vercel.app/delivered-order/${localStorage.getItem('userId')}`);
      const data = await response.json();
      setOrders(data);
    };  
    fetchOrders();
  }, []);

  return (
    <div className="bg-[#14463A] h-[120vh] flex flex-col">
      <ClientInterfaceNavBar />
      <div className='px-24 mt-10'>
        <div className=" bg-white flex-1 py-8 px-24 rounded-[10px]">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="relative">
              <button className="border rounded px-4 py-2 flex items-center gap-2">
                Sort By <span className="text-xs">▼</span>
              </button>
            </div>
          </div>
  
          {orders.map((order, index) => (
            <div key={index} className="border rounded-lg mb-6 overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-4" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[#14463A] font-medium">Order ID: {order.id}</span>
                        <span className="text-[#14463A] ml-2">{order.itemCount}</span>
                      </div>
                      <span className='px-3 py-1 bg-green-100 rounded-full text-md text-green-600'>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-[#14463A] text-sm mt-1">{formatDateToPHT(order.date)}</div>
                  </div>
                </div>
              </div>
  
              {order.items.map((item, idx) => (
                <div key={idx} className="flex p-4 border-b">
                  <div className="flex-shrink-0 w-16 h-16 mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-[#14463A] text-sm">Category: {item.category}</p>
                    <p className="text-[#14463A] text-sm">{item.number} × {item.quantity}</p>
                  </div>
                  <div className="text-right flex items-center">
                    {idx === 0 && <span className="font-semibold">{formatToPeso(order.totalPrice)}</span>}
                    {idx === 0 && <span className="ml-2 text-gray-400">▶</span>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
                {/* Pagination (non-functional, just for design) */}
        <div className="max-w-[100rem] mx-auto mt-10 mb-10">
          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">25</span> orders
            </div>
            <div className="flex items-center space-x-1">
              <button className="px-3 py-2 border border-gray-300 rounded-md text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
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
      </div>
      <ClientFooter />
    </div>
  );
};

export default History;