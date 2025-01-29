import React, { useState } from 'react';
import { FaBarcode } from 'react-icons/fa';

function AddItemModal({ isOpen, closeModal }) {
  const [category, setCategory] = useState('add-ons');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [barcode, setBarcode] = useState('');

  const handleBarcodeGeneration = () => {
    const generatedBarcode = `ITEM-${Math.random().toString(36).substr(2, 9)}`; // Simple random barcode generation
    setBarcode(generatedBarcode);
  };

  const handleSubmit = () => {
    // Add logic to save the new item (e.g., send to backend or add to state)
    console.log({ category, itemName, price, quantity, measurement, imageLink, barcode });
    closeModal(); // Close the modal after submitting
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
          <h2 className="text-2xl font-bold text-[#14463A] mb-4">Add New Item</h2>

          <form>
            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md text-black"
              >
                <option value="add-ons">Add-Ons</option>
                <option value="main">Main</option>
                <option value="none">None</option>
              </select>
            </div>

            {/* Item Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Item Name</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Price and Quantity Inputs */}
            <div className="flex gap-10 mb-4">
              <div className="w-full">
                <label className="block text-gray-700">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="w-full">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Measurement */}
            <div className="mb-4">
              <label className="block text-gray-700">Measurement</label>
              <input
                type="text"
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Image Link */}
            <div className="mb-4">
              <label className="block text-gray-700">Image Link</label>
              <input
                type="text"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Barcode Generation */}
            <div className="mb-4 flex justify-between items-center">
              <label className="block text-gray-700">Barcode</label>
              <button
                type="button"
                onClick={handleBarcodeGeneration}
                className="bg-[#14463A] text-white px-4 py-2 rounded-md hover:bg-green-800"
              >
                Generate <FaBarcode className="inline ml-2" />
              </button>
            </div>

            {/* Display Generated Barcode */}
            {barcode && (
              <div className="mb-4">
                <div className="flex justify-end p-2 border rounded-md text-center">
                  <FaBarcode className="text-[30px] text-[#14463A]" />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-7">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#14463A] text-white px-4 py-2 rounded-md hover:bg-green-800"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default AddItemModal;
