import React from 'react'

const HeroPage = () => {
  return (
    <div className="bg-[#F0A500] min-h-[83vh] ">
      <img src="/assets/images/bglines.png" alt="error" className="absolute" />
      <div className="grid grid-cols-2 items-center min-h-[83vh] relative">
        {/* Left Content */}
        <div className="text-[#14463A] flex flex-col justify-center items-start h-full px-24">
          <div>
            <h1 className="text-[25px]">MILK TEA MADE EASY!</h1>
            <h1 className="flex flex-wrap text-[60px] font-extrabold w-[90%] leading-[70px]">
              Brewing happiness, one sip at a time
            </h1>
            <hr className="mt-5 mb-5 w-[80%] border-2 border-[#14463A]" />
          </div>
          <p className="flex flex-wrap text-[20px] w-[70%]">
            Our goal is to create unforgettable moments by serving premium milk teas that delight every customer.
          </p>
          <button className="text-white mt-5 p-2 text-[18px] bg-[#14463A] rounded-[15px] px-5">
            Order Now
          </button>
        </div>

        {/* Right Content */}
        <div className="flex justify-center items-center h-full">
          <img src="/assets/images/thumbler.png" alt="error" />
        </div>
      </div>
    </div>
  )
}

export default HeroPage
