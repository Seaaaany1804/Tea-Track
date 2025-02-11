import React, { useState, useEffect } from 'react';
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar';
import ClientFooter from '../../components/clients-components/ClientFooter';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const History = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    if (!isLoggedIn) {
      navigate('/login');
    }
    if (userType !== 'client') {
      navigate('/404');
    }
  }, []);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-3RYXOBQ23',
      name: 'Boba Pearl',
      image: '/assets/images/bobapearl.png',
      quantity: 2,
      price: '$5.99',
      status: 'Cancelled',
      date: 'Jan 20, 2025 10:31AM'
    },
    {
      id: 'ORD-8KLYZOP98',
      name: 'Boba Pearl',
      image: '/assets/images/bobapearl.png',
      quantity: 1,
      price: '$4.50',
      status: 'Shipped',
      date: 'Jan 20, 2025 10:31AM'
    }
  ]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedOrder(null);
  };

  const deleteOrder = () => {
    setOrders(orders.filter(order => order.id !== selectedOrder.id));
    closeDeleteModal();
  };

  return (
    <div className='bg-[#0D2F26] min-h-screen flex flex-col'>
      <ClientInterfaceNavBar />
      <div className='px-20 mt-10 mb-10 flex-1'>
        <h1 className='text-[#E0EF8F] text-[35px] font-semibold'>Order History</h1>
        <div className='mt-10 space-y-7'>
          {orders.map((order, index) => (
            <div key={index} className='w-full p-5 flex items-center space-x-24 rounded-lg shadow-md bg-[#E0EF8F] text-[#0D2F26]'>
              <input type='checkbox' />
              <div className='w-24'>
                <img src={order.image} alt={order.name} className='w-full rounded-md' />
              </div>
              <div className='flex-1'>
                <h1 className='text-[20px] font-semibold'>{order.name}</h1>
                <p className='text-gray-700'>{order.id}</p>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Quantity</h1>
                <p>{order.quantity}</p>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Price</h1>
                <p>{order.price}</p>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Status</h1>
                <p className={`${order.status === 'Cancelled' ? 'text-red-500' : ''}`}>{order.status}</p>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Date & Time</h1>
                <p>{order.date}</p>
              </div>
              <div>
                <MdDeleteForever 
                  className='text-red-500 text-2xl cursor-pointer' 
                  onClick={() => openDeleteModal(order)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ClientFooter />

      {deleteModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <h2 className='text-lg font-semibold mb-4'>Are you sure you want to delete this order?</h2>
            <div className='flex justify-end space-x-4'>
              <button 
                onClick={deleteOrder} 
                className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
              >
                Delete
              </button>
              <button 
                onClick={closeDeleteModal} 
                className='bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
