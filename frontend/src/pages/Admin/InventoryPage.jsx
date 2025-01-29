import React, { useState } from 'react';
import Navbar from '../../components/NavBar';
import { FaAngleLeft, FaAngleRight, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { MdSort } from "react-icons/md";
import AddItemModal from '../../components/AddItemModal';

function InventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                  <button
                    onClick={openModal}
                    className="bg-[#14463A] text-white px-4 py-2 w-full rounded-md hover:bg-green-800"
                  >
                    + Add Item
                  </button>
                </div>
                <div className='flex gap-2 items-center justify-end'>
                  <MdSort className='text-xl' />
                  <h1 className='font-semibold font-[POPPINS] text-xl'>Sort By</h1>
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            {/* Your existing table code goes here... */}

          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default InventoryPage;
