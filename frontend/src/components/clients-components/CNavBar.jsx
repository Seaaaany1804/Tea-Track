import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const CNavBar = () => {
  const location = useLocation();
      // Helper function to determine active link styling
  const getLinkStyle = (path) => {
    return location.pathname === path
      ? 'text-[#E39E05] font-semibold'  // Active page - Yellow
      : 'text-white hover:text-yellow-300'; // Inactive page - White
  };
  const NavBar = [
    {
      name:'Home',
      path:'/client'
    },

    {
      name:'Store',
      path:'/ourstore'
    },

    {
      name:'Contact',
      path:'/contactus'
    },

  ]
  return (
    <div className='flex items-center justify-between p-5 px-24 text-white bg-[#0D2F26] shadow-xl'>
      <div className='flex items-center gap-3'>
        <img src="/assets/images/icons/Logo-Yellow.png" alt="error" className='h-16'/>
        <h1 className='text-[25px] font-bold'><span className='text-[#E39E05]'>TEA</span> TRACK</h1>
      </div>

      <div className='flex items-center gap-[70px]'>
      <ul className='flex gap-[70px]'>
          {NavBar.map((link, index) =>(
            <li key={index}>
              <Link to={link.path} className={getLinkStyle(link.path)}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <Link className='bg-white text-black p-2 px-5 rounded-[20px] font-medium'>Register Now</Link>
      </div>
    </div>
  )
}

export default CNavBar