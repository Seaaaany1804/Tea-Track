import React from 'react'

const BgCircle = () => {
  return (
    <>
        <div className="absolute w-[20vw] h-[25vh] rounded-full bg-[#E39E05] -bottom-14 -right-14 bg-opacity-30" />
        <div className="absolute w-[20vw] h-[25vh] rounded-full bg-[#E39E05] -top-14 -left-14 bg-opacity-30" />
        <div className="absolute w-[20vw] h-[25vh] rounded-full bg-white top-2 right-2 bg-opacity-30" />
        <div className="absolute w-[20vw] h-[25vh] rounded-full bg-[#E39E05] left-1/2 transform -translate-x-1/2 top-24 bg-opacity-30" />
        <div className="absolute w-[20vw] h-[25vh] rounded-full bg-[#FFFFFF] bottom-40 left-24 bg-opacity-30" />
    </>
  )
}

export default BgCircle
