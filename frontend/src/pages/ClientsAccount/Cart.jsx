import React, { useState, useEffect } from 'react';
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar';
import ClientFooter from '../../components/clients-components/ClientFooter';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { formatDateToPHT, formatToPeso } from '../../CustomFunctions';

const Cart = () => {
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [deletedOrderId, setDeletedOrderId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
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

    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:8081/users/' + localStorage.getItem('userId'));
        const data = await response.json();
        setUser(data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();

    const getCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8081/cart-items/' + localStorage.getItem('userId'));
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    getCartItems();
  }, []);

  const handleCheckboxChange = (order) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(order)
        ? prevSelected.filter((item) => item !== order)
        : [...prevSelected, order]
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/cart-items/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setShowDeleteModal(false);
        setDeletedOrderId(null);
        setOrders(orders.filter(order => order.id !== id));
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleBuyNowModal = () => {
    setShowBuyNowModal(true);
    setTotalPrice(selectedOrders.reduce((total, order) => total + (parseFloat(order.unit_price) * order.quantity), 0));
    console.log(selectedOrders);
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch('http://localhost:8081/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: localStorage.getItem('userId'),
          total_amount: totalPrice,
          order_details: selectedOrders.map(orderdetail => ({
            product_id: orderdetail.product_id,
            product_quantity: orderdetail.quantity,
            unit_price: orderdetail.unit_price,
            sub_total: orderdetail.quantity * orderdetail.unit_price
          }))
        })
      })
      if (response.ok) {
        alert("Order confirmed successfully!");
        navigate("/clientorders");
      };
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className='bg-[#0D2F26] h-screen flex flex-col'>
      <ClientInterfaceNavBar />
      <div className='px-20 mt-10 mb-10 flex-grow'>
        <div className='flex items-center justify-between'>
          <h1 className='text-[#E0EF8F] text-[35px] font-semibold'>Cart</h1>
          <button
            onClick={() => selectedOrders.length > 0 && handleBuyNowModal()}
            disabled={selectedOrders.length === 0}
            className={`p-2 px-10 text-black text-[17px] font-semibold rounded-[20px] ${selectedOrders.length > 0 ? 'bg-[#E39E05]' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Buy now
          </button>
        </div>
        <div className='mt-10 space-y-7'>
          {orders.map((order) => (
            <div key={order.id} className='w-full p-5 flex items-center space-x-24 rounded-lg shadow-md bg-[#E0EF8F] text-[#0D2F26] relative'>
              <input type='checkbox'
                onChange={() => handleCheckboxChange(order)} checked={selectedOrders.includes(order)} />
              <div className='w-24'>
                <img src={order.image_link} alt={order.product_name} className='w-full rounded-md' />
              </div>
              <div>
                <h1 className='text-[18px] font-semibold'>Item Name</h1>
                <h1>{order.product_name}</h1>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Quantity</h1>
                <p>{order.quantity}</p>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Price</h1>
                <p>{formatToPeso(order.unit_price)}</p>
              </div>
              <div className='text-center'>
                <h1 className='text-[18px] font-semibold'>Date & Time</h1>
                <p>{formatDateToPHT(order.created_at)}</p>
              </div>
              <div className='absolute right-10'>
                <MdDeleteForever className='text-red-500 text-2xl cursor-pointer' onClick={() => { setShowDeleteModal(true); setDeletedOrderId(order.id); }} />
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
              <button className='px-4 py-2 bg-red-500 text-white rounded-md' onClick={() => { handleDelete(deletedOrderId); }}>Delete</button>
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
                    <img src={order.image_link} alt={order.name} className='w-10 h-10 rounded-md' />
                    <p>{order.name} (x{order.quantity})</p>
                  </div>
                  <p>{formatToPeso(order.unit_price)}</p>
                </div>
              ))}
            </div>
            <div className='mt-4 text-lg font-semibold'>
              Total: {formatToPeso(totalPrice)}
            </div>
            <input type='text' placeholder='Full Name' value={user.first_name + " " + user.middle_name.charAt(0).toUpperCase() + ". " + user.last_name} className='w-full p-2 mt-2 border rounded-md' required />
            <input type='text' placeholder='Contact Number' value={user.phone_number} className='w-full p-2 mt-2 border rounded-md' required />
            <input type='text' placeholder='Address' value={user.address} className='w-full p-2 mt-2 border rounded-md' required />
            <div className='mt-4 flex justify-center space-x-4'>
              <button className='px-4 py-2 bg-green-500 text-white rounded-md' onClick={handleConfirmOrder}>Confirm</button>
              <button className='px-4 py-2 bg-gray-300 rounded-md' onClick={() => setShowBuyNowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
