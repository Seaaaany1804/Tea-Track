import React, { useState } from 'react';
import Navbar from '../../components/NavBar';
import { FaAngleLeft, FaAngleRight, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { MdSort } from "react-icons/md";

function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const inventoryData = Array(40).fill({
    sku: "ADNS-1E1OUF40HB",
    itemName: "Boba Pearls",
    category: "ADD-ONS",
    price: "₱150.00",
    measurement: "1KG/pack",
    stocks: 90
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventoryData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(inventoryData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-[#14463A] min-h-screen text-white">
      <Navbar />
      <div className="p-8 px-40">

        {/* Inventory Table */}
        <div className="px-6 bg-white rounded-lg shadow-lg">
          <div className="w-full text-black">
            <div>
              <h1 className="py-4 text-[#14463A] text-start text-3xl font-bold">
                Inventory
              </h1>

              <div className="py-3 flex justify-between items-center">
                <div>
                  <button className="bg-[#14463A] text-white px-4 py-2 w-full rounded-md hover:bg-green-800">
                    + Add Item
                  </button>
                </div>
                <div className='flex gap-2 items-center justify-end'>
                  <MdSort className='text-xl' />
                <h1 className='font-semibold font-[POPPINS] text-xl'>Sort By</h1>
              </div>
            </div>
          </div>
            <table className='w-full'>
            <thead className="bg-white text-[#14463A]">
              {/* Table Headers */}
              <tr className="text-center font-bold border-t-2">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Item Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Measurement</th>
                <th className="py-3 px-4">Stocks</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-center font-semibold">
              {currentItems.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-[#0D2F264D]' : 'bg-white'
                  } border-b`}
                >
                  <td className="py-3 px-4">{item.sku}</td>
                  <td className="py-3 px-4">{item.itemName}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td className="py-3 px-4">{item.measurement}</td>
                  <td className={`py-3 px-4 ${item.stocks < 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {item.stocks}
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-3">
                    <button className="text-blue-600 hover:text-blue-400">
                      <FaRegEdit className='text-2xl' />
                    </button>
                    <button className="text-red-600 hover:text-red-400">
                      <FaRegTrashAlt className='text-2xl' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Pagination Inside Table */}
            <tfoot>
              <tr>
                <td colSpan="7" className="py-8 text-center">
                  <div className="flex justify-end gap-x-4 items-center">
                    {/* Left Arrow */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="text-[#14463A] hover:text-green-700 disabled:opacity-50"
                    >
                      <FaAngleLeft size={20} />
                    </button>

                    {/* Page Numbers */}
                    <span className="text-lg font-semibold font-[POPPINS]">
                      Page {currentPage} of {totalPages}
                    </span>

                    {/* Right Arrow */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="text-[#14463A] hover:text-green-700 disabled:opacity-50"
                    >
                      <FaAngleRight size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
            </table>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
