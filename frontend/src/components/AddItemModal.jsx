import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { FaBarcode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddItemModal({ isOpen, closeModal }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://teatrackbackend.vercel.app/product-categories");
      const categories = await response.json();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: 0,
    stocks: 0,
    category_id: 1,
    measurement: "",
    image_link: "",
    barcode: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBarcodeGeneration = () => {
    const generatedBarcode = `ITEM-${Math.random().toString(36).substr(2, 9)}`; // Simple random barcode generation
    setFormData({ ...formData, barcode: generatedBarcode, sku: categories[formData.category_id - 1].code + "-" + generatedBarcode.split('-')[1] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      sku,
      name,
      price,
      stocks,
      category_id,
      measurement,
      image_link,
      barcode,
    } = formData;


    console.log(formData);

    if (
      !name ||
      !sku ||
      !price ||
      !stocks ||
      !category_id ||
      !measurement ||
      !image_link ||
      !barcode
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("https://teatrackbackend.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        try {
          const response = await fetch("https://teatrackbackend.vercel.app/logs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: `Added: ${name}`,
              action: "Add Item",
            }),
          });
          if (response.ok) {
            console.log("Item added successfully");
            closeModal(); // Close the modal after submitting
            window.location.reload();
          }
        } catch (error) {
          console.error("Error submitting log:", error);
        }
      } else {
        console.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
          <h2 className="text-2xl font-bold text-[#14463A] mb-4">
            Add New Item
          </h2>

          <form>
            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md text-black"
              >
                {categories.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Item Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Item Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md text-black"
              />
            </div>

            {/* Price and Quantity Inputs */}
            <div className="flex gap-10 mb-4">
              <div className="w-full">
                <label className="block text-gray-700">Price</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md text-black"
                />
              </div>

              <div className="w-full">
                <label className="block text-gray-700">Stock</label>
                <input
                  name="stocks"
                  type="number"
                  value={formData.stocks}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md text-black"
                />
              </div>
            </div>

            {/* Measurement */}
            <div className="mb-4">
              <label className="block text-gray-700">Measurement</label>
              <input
                name="measurement"
                type="text"
                value={formData.measurement}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md text-black"
              />
            </div>

            {/* Image Link */}
            <div className="mb-4">
              <label className="block text-gray-700">Image Link</label>
              <input
                name="image_link"
                type="text"
                value={formData.image_link}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md text-black"
              />
            </div>

            {/* Barcode Generation */}
            <div className="mb-4 flex justify-between items-center">
              <label className="block text-gray-700">Barcode</label>
              <button
                name="barcode"
                type="button"
                onClick={handleBarcodeGeneration}
                className="bg-[#14463A] text-white px-4 py-2 rounded-md hover:bg-green-800"
              >
                Generate <FaBarcode className="inline ml-2" />
              </button>
            </div>

            <div>
              <div className="flex justify-center border rounded-md">
                <Barcode value={formData.barcode} displayValue={false} />
              </div>
            </div>

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
