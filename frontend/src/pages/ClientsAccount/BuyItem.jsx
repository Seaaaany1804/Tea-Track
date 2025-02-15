import React, { useState } from 'react'
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar';
import ClientFooter from '../../components/clients-components/ClientFooter';
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
const BuyItem = () => {
    const location = useLocation();
    const item = location.state?.item;
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const handleQuantityChange = (change) => {
        if (quantity + change < 1) return;
        setQuantity(quantity + change);
    }

    const handleAddToCart = async () => {
        try {
            const response = await fetch("http://localhost:8081/cart-items", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: localStorage.getItem('userId'),
                    product_id: item.id,
                    quantity: quantity,
                    unit_price: item.price
                }),
              }
            );
            if(response.ok){
                alert("Item added to cart");
                navigate("/clientCart");
            };
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <div className=''>
            <ClientInterfaceNavBar />
            <div className='px-24'><Link to='/client'><FaArrowLeftLong className='text-[30px] text-[#0D2F26] mt-10 ' /></Link></div>
            <div className='flex item-center p-5 mt-10 mb-10'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <img src={item.image_link} alt="" className='w-[70%] h-[50vh] border-2 border-[#0D2F26] p-10 rounded-[10px]' />
                    <div className='text-[#0D2F26] mt-5 w-full px-[137px]'>
                        <h1 className='text-[25px]'>Description:</h1>
                        <p className='font-extralight w-[80%] '>
                            {item.description}
                        </p>
                    </div>
                </div>


                <div className='w-full'>
                    <h1 className='text-[#0D2F26] text-[35px] font-bold'>{item.name}</h1>
                    <p className='text-[#0D2F26] text-[20px] text-extralight'>Stocks: {item.stocks}</p>
                    <h1 className='text-[30px] font-semibold text-[#0D2F26]'>P {item.price}.00</h1>
                    <div className='border-2 border-[#0D2F26] text-[#0D2F26] flex items-center justify-center space-x-10 w-[20%] rounded-[15px] mt-5'>
                        <button className='py-3' onClick={() => handleQuantityChange(-1)} >
                            <FaMinus />
                        </button>
                        <h1 className='font-bold text-[20px]'>{quantity}</h1>
                        <button className='py-3' onClick={() => handleQuantityChange(1)} >
                            <FaPlus />
                        </button>
                    </div>

                    <div className='space-x-10 mt-10'>
                        <Link to='/clientcart'><button className='bg-[#E39E05] p-3 px-16 rounded-[15px] text-[20px] font-bold'>Buy Now</button></Link>
                        <button onClick={handleAddToCart} className='border-2 border-[#0D2F26] p-3 px-16 rounded-[15px] text-[20px] font-bold'>Add to Cart</button>
                    </div>
                </div>
            </div>

            <ClientFooter />
        </div>
    )
}

export default BuyItem