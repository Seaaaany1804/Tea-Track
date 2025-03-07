import React, { useState, useEffect } from "react";
import { FaBarcode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";

function EditItemModal({ isOpen, closeModal, item }) {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    sku: "",
    price: 0,
    stocks: 0,
    measurement: "",
    image_link: "",
    barcode: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id || 0,
        name: item.name || "",
        sku: item.sku || "",
        price: item.price || 0,
        stocks: item.stocks || 0,
        measurement: item.measurement || "",
        image_link: item.image_link || "",
        barcode: item.barcode || ""
      });
    }

  }, [item]);

  console.log(formData);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updateItem = async () => {
      const response = await fetch(`https://teatrackbackend.vercel.app/products/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        closeModal();
        navigate("/inventory");
      }
    };
    updateItem();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
          <h2 className="text-2xl font-bold text-[#14463A] mb-4">Edit Item</h2>

          <form onSubmit={handleSave}>
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

            {/* Price and Stock */}
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

            {/* SKU (Read-Only) */}
            <div className="mb-4">
              <label className="block text-gray-700">SKU</label>
              <input
                name="sku"
                type="text"
                value={formData.sku}
                className="w-full p-2 border rounded-md text-black bg-gray-100"
                readOnly
              />
            </div>

            {/* Barcode */}
            <div className="mb-4">
              <label className="block text-gray-700">Barcode</label>
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
                type="submit"
                className="bg-[#14463A] text-white px-4 py-2 rounded-md hover:bg-green-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default EditItemModal;
