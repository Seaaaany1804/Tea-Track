import React, { useState } from 'react';
import Navbar from '../../components/NavBar';
import { FaAngleLeft, FaAngleRight, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { MdSort } from "react-icons/md";
import AddItemModal from '../../components/AddItemModal';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import EditItemModal from "../../components/modals/EditItemModal";
function InventoryPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setIsEditModalOpen(false);
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

            <div class="p-4">
              <hr class="mb-4" />

              <div class="overflow-x-auto">
                <table class="min-w-full shadow-md">
                  <thead class="">
                    <tr>
                      <th class="px-4 py-2">SKU</th>
                      <th class="px-4 py-2">Item Name</th>
                      <th class="px-4 py-2">Category</th>
                      <th class="px-4 py-2">Price</th>
                      <th class="px-4 py-2">Measurement</th>
                      <th class="px-4 py-2">Expires In</th>
                      <th class="px-4 py-2">Stocks</th>
                      <th class="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-center">
                      <td class="px-4 py-2">ADNS-1E1OUF40HB</td>
                      <td class="px-4 py-2">Boba Pearls</td>
                      <td class="px-4 py-2">ADD-ONS</td>
                      <td class="px-4 py-2">₱100</td>
                      <td class="px-4 py-2">500ml</td>
                      <td class="px-4 py-2">January 26, 2025</td>
                      <td class="px-4 py-2">50</td>
                      <td class="px-4 py-2">
                      <div className='space-x-2'>
                      <button className="text-blue-500 hover:text-blue-700"
                        onClick={() => openEditModal(inventoryData[0])}
                      >
                        <AiOutlineEdit size={30} />
                      </button>
                        <button className="text-red-500 hover:text-red-700">
                          <AiOutlineDelete size={30} />
                        </button>
                      </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal isOpen={isModalOpen} closeModal={closeModal} />

      <EditItemModal
      isOpen={isEditModalOpen}
      closeModal={closeEditModal}
      item={selectedItem || { itemName: "", category: "", price: "", stocks: 0 }}
      onSave={(updatedItem) => console.log("Updated Item:", updatedItem)} // Replace with API call
    />
    </div>
  );
}

export default InventoryPage;
