import React, { useState, useEffect } from 'react';
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar';
import ClientFooter from '../../components/clients-components/ClientFooter';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([  
    {
      id: 'ORD-3RYXOBQ23',
      name: 'Boba Pearl',
      image: '/assets/images/bobapearl.png',
      quantity: 2,
      price: '$5.99',
      status: 'Processing',
      date: 'Jan 22, 2025'
    },
    {
      id: 'ORD-8KLYZOP98',
      name: 'Boba Pearl',
      image: '/assets/images/bobapearl.png',
      quantity: 1,
      price: '$4.50',
      status: 'Shipped',
      date: 'Jan 20, 2025'
    }
  ]);

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

  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setOrders(orders.filter(order => order.id !== orderToDelete.id));
    setShowModal(false);
  };

  return (
    <div className="bg-[#0D2F26] min-h-screen flex flex-col">
      <ClientInterfaceNavBar />
      
      {/* Main Content */}
      <div className="px-20 mt-10 mb-10 flex-grow">
        <h1 className="text-[#E0EF8F] text-[35px] font-semibold">My Orders</h1>
        <div className="mt-10 space-y-5">
          {orders.map((order, index) => (
            <div key={index} className="bg-[#E0EF8F] w-full p-5 flex items-center space-x-24 rounded-lg shadow-md">
              <input type="checkbox" />
              <div className="w-24">
                <img src={order.image} alt={order.name} className="w-full rounded-md" />
              </div>
              <div className="flex-1">
                <h1 className="text-[20px] font-semibold">{order.name}</h1>
                <p className="text-gray-700">{order.id}</p>
              </div>
              <div className="text-center">
                <h1 className="text-[18px] font-semibold">Quantity</h1>
                <p>{order.quantity}</p>
              </div>
              <div className="text-center">
                <h1 className="text-[18px] font-semibold">Price</h1>
                <p>{order.price}</p>
              </div>
              <div className="text-center">
                <h1 className="text-[18px] font-semibold">Status</h1>
                <p>{order.status}</p>
              </div>
              <div className="text-center">
                <h1 className="text-[18px] font-semibold">Date</h1>
                <p>{order.date}</p>
              </div>
              <div>
                <MdDeleteForever 
                  className="text-red-500 text-2xl cursor-pointer" 
                  onClick={() => handleDeleteClick(order)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this order?</h2>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer at the Bottom */}
      <ClientFooter />
    </div>
  );
};

export default Orders;
