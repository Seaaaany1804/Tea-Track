import React, { useState, useEffect } from 'react';
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar';
import ClientFooter from '../../components/clients-components/ClientFooter';
import { useNavigate } from 'react-router-dom';

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

  const [orders, setOrders] = useState([
    {
      id: 'ORD-3RYXOBQ23',
      name: 'Tea Track Boba Pearl Tea',
      image: '/assets/images/bobapearl.png',
      quantity: 'x23',
      itemprice:'P200',
      price: 'P400',
      dateandtime:'8:22PM 2/12/2024',
      status: 'Completed',
      weight: '600g'
    },
    {
      id: 'ORD-3RYXOBQ23',
      name: 'Tea Track Boba Pearl Tea',
      image: '/assets/images/bobapearl.png',
      quantity: 'x23',
      price: 'P400',
      dateandtime:'8:22PM 2/12/2024',
      status: 'Completed',
      weight: '600g'
    }
  ]);

  return (
    <div className="bg-[#0D2F26] min-h-screen flex flex-col">
      <ClientInterfaceNavBar />
      <div className="flex-1 px-20 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[#E0EF8F] text-3xl font-semibold">Order History</h1>
          <div className="text-[#E0EF8F]">
            <span className="mr-2">Sort By:</span>
            <select className="bg-transparent border border-[#E0EF8F] rounded px-2 py-1">
              <option value="date">Date</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {orders.map((order, index) => (
          <div key={index} className="bg-[#E0EF8F] rounded-xl p-6 px-12 mb-6 text-[#0D2F26] ">
            <div className="flex justify-between items-center mb-4">
              <div className='flex flex-col'>
                <span className="text-[#0D2F26] text-xl font-bold">{order.id}</span>
                <span className="text-[#0D2F26]">{order.dateandtime}</span>
              </div>
              <span className="text-green-600 text-xl">{order.status}</span>
            </div>
            
            {/* Repeat the same item twice as shown in the image */}
            {[1, 2].map((_, idx) => (
              <div key={idx} className="flex items-center gap-4 mb-4 border-t-2  border-[#0D2F26] py-5">
                <div className="w-32 h-32">
                  <img 
                    src={order.image} 
                    alt={order.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className='flex gap-2 items-center'>
                    <h3 className="font-medium text-lg">{order.name}</h3>
                    <span className="text-gray-600">{order.quantity}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{order.weight}</p>
                </div>
                <div className="text-right">
                  <span className="text-[#0D2F26] text-xl">{order.itemprice}</span>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end mt-2">
              <div className="text-right flex items-center gap-5">
                <p className="text-md text-gray-600">Total 2 items:</p>
                <p className="font-bold text-xl">Total: {order.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ClientFooter />
    </div>
  );
};

export default History;