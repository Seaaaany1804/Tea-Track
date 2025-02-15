import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom"
const OurStore = () => {

  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    const fetchStoreItems = async () => {
      const response = await fetch("http://localhost:8081/products");
      const data = await response.json();
      setStoreItems(data);
    };
    fetchStoreItems();
  }, []);
  //   {
  //     name: "Boba Pearl",
  //     img: "/assets/images/bobapearl.png",
  //     shape:
  //       "rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[5%]",
  //   },
  //   {
  //     name: "Nata de Coco",
  //     img: "/assets/images/natadecoco.png",
  //     shape: "rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[30%]",
  //   },
  //   {
  //     name: "Nata de Coco",
  //     img: "/assets/images/natadecoco.png",
  //     shape: "rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[30%]",
  //   },
  //   {
  //     name: "Nata de Coco",
  //     img: "/assets/images/natadecoco.png",
  //     shape: "rounded-tr-[30%] rounded-bl-[5%] rounded-tl-[30%] rounded-br-[30%]",
  //   },
  //   {
  //     name: "Nata de Coco",
  //     img: "/assets/images/natadecoco.png",
  //     shape: "rounded-tr-[5%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[30%]",
  //   },
  //   {
  //     name: "Nata de Coco",
  //     img: "/assets/images/natadecoco.png",
  //     shape: "rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[30%]",
  //   },
  //   {
  //     name: "Boba Pearl Straw",
  //     img: "/assets/images/straw.png",
  //     shape: "rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[30%]",
  //   },
  //   {
  //     name: "Choco Syrup",
  //     img: "/assets/images/chocosyrup.png",
  //     shape: "rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[5%] rounded-br-[30%]",
  //   },
  // ];

  return (
    <div className="mt-24" id="ourstore">
      {/* Left Column */}
      <div className="flex items-center justify-between w-full">
        <p className="px-36 w-[40%] text-[20px] font-extralight text-[#E0EF8F]">
          Explore our curated collection of milk tea essentials-premium flavors,
          toppings, and tools to create your perfect brew every time!
        </p>

        <h1 className="flex text-[70px] text-[#E0EF8F] font-extrabold leading-[60px] px-36">
          OUR<br />STORE
        </h1>
      </div>

      {/* Right Column (Grid of Store Items) */}
      <div className="flex flex-wrap gap-8 mt-10 justify-center mb-20">
        {storeItems.map((item, index) => (
          <div
            key={index}
            className={`relative bg-[#E0EF8F] w-[20%] p-7 rounded-tr-[30%] rounded-bl-[30%] rounded-tl-[30%] rounded-br-[30%] flex items-center justify-center text-center`}
          >
            {/* Image and Name Container */}
            <div className="flex flex-col items-center justify-center text-center">
              <img src={item.image_link} alt={item.name} className="w-[60%] h-[25vh]" />
              <h1 className="text-[#0D2F26] mt-3 text-[25px] font-bold">
                {item.name}
              </h1>
            </div>

            {/* Icon Positioned on the Side (Added to All Items) */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Link to='/buyitem' state={{item}}><FaArrowAltCircleRight className="text-[#0D2F26] text-[35px]" /></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStore;
