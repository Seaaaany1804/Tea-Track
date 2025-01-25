import React from 'react'
import { FaUser,FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const ContactUs = () => {
  return (
    <div className='grid grid-cols-2 bg-black bg-opacity-[30%] min-h-[68vh] pt-24'>
      <div className='text-[#E0EF8F] px-24'>
        <h1 className='text-[40px] font-extrabold'>Contact Us</h1>
        <p className='text-[18px] font-extralight text-justify w-[80%]'>Have questions or need assistance? We’re here to help! Feel free to reach out to us, and we’ll get back to you as soon as possible, or just react out manually to <span className='underline text-[#3D71E0] font-bold'>example@gmail.com</span></p>
      </div>

      <div className="w-[85%]">
        <form className="space-y-8">
          {/* First Name & Last Name */}
          <div className="flex space-x-8">
            <div className="relative w-full">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D2F26]" />
              <input type="text" placeholder="First Name" className="w-full pl-10 pr-4 py-4 rounded bg-white" />
            </div>
            <div className="relative w-full">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D2F26]" />
              <input type="text" placeholder="Last Name" className="w-full pl-10 pr-4 py-4 rounded bg-white" />
            </div>
          </div>

          {/* Email & Phone Number */}
          <div className="flex space-x-8">
            <div className="relative w-full">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D2F26]" />
              <input type="text" placeholder="Email Address" className="w-full pl-10 pr-4 py-4 rounded bg-white" />
            </div>
            <div className="relative w-full">
              <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D2F26]" />
              <input type="text" placeholder="Phone Number" className="w-full pl-10 pr-4 py-4 rounded bg-white" />
            </div>
          </div>

          {/* Textarea */}
          <div className="flex space-x-8">
            <div className="relative w-full">
              <textarea rows="7" placeholder="Type your inquiries here..." 
                className="w-full pl-10 pr-4 py-4 rounded bg-white resize-none" />
            </div>
          </div>

          <div className='flex items-center justify-center bg-[#E39E05] py-3 w-[50%] rounded-[15px] mx-auto'>
          <button className='text-[20px] font-bold'>Submit</button>
        </div>

        </form>
      </div>
    </div>
  )
}

export default ContactUs