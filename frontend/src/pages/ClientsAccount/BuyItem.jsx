import React from 'react'
import ClientInterfaceNavBar from '../../components/clients-components/ClientInterfaceNavBar';
import ClientFooter from '../../components/clients-components/ClientFooter';
import { FaMinus,FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const BuyItem = () => {
  return (
    <div className=''>
        <ClientInterfaceNavBar/>
        <div className='px-24'><Link to='/client'><FaArrowLeftLong className='text-[30px] text-[#0D2F26] mt-10 '/></Link></div>
        <div className='flex item-center p-5 mt-10 mb-10'>
            <div className='w-full flex flex-col items-center justify-center'>
                <img src="/assets/images/bobapearl.png" alt="" className='w-[70%] h-[50vh] border-2 border-[#0D2F26] p-10 rounded-[10px]' />
                <div className='text-[#0D2F26] mt-5 w-full px-[137px]'>
                    <h1 className='text-[25px]'>Description:</h1>
                    <p className='font-extralight w-[80%] '>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>


            <div className='w-full'>
                <h1 className='text-[#0D2F26] text-[35px] font-bold'>Tea Track Boba Pearls</h1>
                <p className='text-[#0D2F26] text-[20px] text-extralight'>1KG/PACK</p>
                <h1 className='text-[30px] font-semibold text-[#0D2F26]'>P 400.00</h1>
                <div className='border-2 border-[#0D2F26] text-[#0D2F26 flex items-center justify-center space-x-10 p-3 w-[20%] rounded-[15px] mt-5'>
                    <FaMinus/>
                    <h1 className='font-bold text-[20px]'>1</h1>
                    <FaPlus/>
                </div>

                <div className='space-x-10 mt-10'>
                    <Link to='/clientcart'><button className='bg-[#E39E05] p-3 px-16 rounded-[15px] text-[20px] font-bold'>Buy Now</button></Link>
                    <Link to='/clientcart'><button className='border-2 border-[#0D2F26] p-3 px-16 rounded-[15px] text-[20px] font-bold'>Add to Cart</button></Link>
                </div>
            </div>
        </div>

        <ClientFooter/>
    </div>
  )
}

export default BuyItem