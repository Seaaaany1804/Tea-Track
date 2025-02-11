import React, { useState, useEffect } from 'react';
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar';
import ClientFooter from '../../components/clients-components/ClientFooter';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

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

  const orders = [
    {
      id: 1,
      name: 'Boba Pearl',
      image: '/assets/images/bobapearl.png',
      quantity: 2,
      price: 5.99,
      date: 'Jan 20, 2025 10:31AM'
    },
    {
      id: 2,
      name: 'Boba Pearl',
      image: '/assets/images/bobapearl.png',
      quantity: 1,
      price: 4.50,
      date: 'Jan 20, 2025 10:31AM'
    },
  ];

  const handleCheckboxChange = (order) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(order)
        ? prevSelected.filter((item) => item !== order)
        : [...prevSelected, order]
    );
  };

  const totalPrice = selectedOrders.reduce((acc, order) => acc + order.price * order.quantity, 0).toFixed(2);

  return (
    <div className='bg-[#0D2F26] h-screen flex flex-col'>
      <ClientInterfaceNavBar />
      <div className='px-20 mt-10 mb-10 flex-grow'>
        <div className='flex items-center justify-between'>
          <h1 className='text-[#E0EF8F] text-[35px] font-semibold'>Order History</h1>
          <button
            onClick={() => selectedOrders.length > 0 && setShowBuyNowModal(true)}
            disabled={selectedOrders.length === 0}
            className={`p-2 px-10 text-black text-[17px] font-semibold rounded-[20px] ${selectedOrders.length > 0 ? 'bg-[#E39E05]' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Buy now
          </button>
        </div>
        <div className='mt-10 space-y-7'>
          {orders.map((order) => (
            <div key={order.id} className='w-full p-5 flex items-center space-x-24 rounded-lg shadow-md bg-[#E0EF8F] text-[#0D2F26] relative'>
              <input type='checkbox' onChange={() => handleCheckboxChange(order)} checked={selectedOrders.includes(order)} />
              <div className='w-24'>
                <img src={order.image} alt={order.name} className='w-full rounded-md' />
              </div>
              <div>
                <h1 className='text-[18px] font-semibold'>Item Name</h1>
                <h1>{order.name}</h1>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Quantity</h1>
                <p>{order.quantity}</p>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Price</h1>
                <p>${order.price.toFixed(2)}</p>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Date & Time</h1>
                <p>{order.date}</p>
              </div>
              <div className='absolute right-10'>
                <MdDeleteForever className='text-red-500 text-2xl cursor-pointer' onClick={() => { setSelectedOrder(order); setShowDeleteModal(true); }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ClientFooter />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded-md text-center'>
            <h2 className='text-lg font-semibold'>Are you sure you want to delete this order?</h2>
            <div className='mt-4 flex justify-center space-x-4'>
              <button className='px-4 py-2 bg-red-500 text-white rounded-md' onClick={() => setShowDeleteModal(false)}>Delete</button>
              <button className='px-4 py-2 bg-gray-300 rounded-md' onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Buy Now Modal */}
      {showBuyNowModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded-md text-center w-96'>
            <h2 className='text-lg font-semibold'>Confirm Your Order</h2>
            <div className='mt-2 max-h-40 overflow-y-auto'>
              {selectedOrders.map((order, index) => (
                <div key={index} className='flex items-center justify-between p-2 border-b'>
                  <div className='flex items-center space-x-2'>
                    <img src={order.image} alt={order.name} className='w-10 h-10 rounded-md' />
                    <p>{order.name} (x{order.quantity})</p>
                  </div>
                  <p>${(order.price * order.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className='mt-4 text-lg font-semibold'>
              Total: ${totalPrice}
            </div>
            <input type='text' placeholder='Full Name' className='w-full p-2 mt-2 border rounded-md' required />
            <input type='text' placeholder='Contact Number' className='w-full p-2 mt-2 border rounded-md' required />
            <input type='text' placeholder='Address' className='w-full p-2 mt-2 border rounded-md' required />
            <div className='mt-4 flex justify-center space-x-4'>
              <button className='px-4 py-2 bg-green-500 text-white rounded-md'>Confirm</button>
              <button className='px-4 py-2 bg-gray-300 rounded-md' onClick={() => setShowBuyNowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
