import React from 'react'

const OurStore = () => {
  const storeItems = [
    {name: 'Boba Pearl', img: '/assets/images/bobapearl.png', shape: 'rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[5%]' },
    {name: 'Nata de Coco', img: '/assets/images/natadecoco.png', shape: 'rounded-tr-[30%] rounded-bl-[5%] rounded-tl-[30%] rounded-br-[30%]' },
    {name: 'Boba Pearl Straw', img: '/assets/images/straw.png', shape: 'rounded-tr-[5%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[30%]' },
    {name: 'Choco Syrup', img: '/assets/images/chocosyrup.png', shape: 'rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[5%] rounded-br-[30%]' },
  ];

  return (
    <div className="mt-20 grid grid-cols-2">
      {/* Left Column */}
      <div className=''>
        <h1 className="flex flex-wrap text-[70px] text-[#E0EF8F] font-extrabold w-[10%] leading-[60px] px-24 mb-10">
          OUR STORE
        </h1>

        <div className="flex items-end justify-end mb-14">
          <p className="text-right w-[50%] text-[20px] font-extralight text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        <p className="px-24 w-[70%] text-[20px] font-extralight text-white">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>

      {/* Right Column (Grid of Store Items) */}
      <div className="flex flex-wrap gap-8 mt-10 justify-center  mb-20">
        {storeItems.map((item) => (
          <div key={item.id} className={`bg-[#E0EF8F] w-[40%] p-7 ${item.shape} flex flex-col items-center justify-center text-center`}>
            <img src={item.img} alt={item.name} className="w-[70%] h-[25vh]" />
            <h1 className="text-[#0D2F26] mt-3 text-[25px] font-bold">{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurStore;
