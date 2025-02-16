import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import {
  FaAngleLeft,
  FaAngleRight,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdSort } from "react-icons/md";
import AddItemModal from "../../components/AddItemModal";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import EditItemModal from "../../components/modals/EditItemModal";
import DeleteItemModal from "../../components/modals/DeleteItemModal";
import { useNavigate } from "react-router-dom";
import { formatToPeso } from "../../CustomFunctions";

function InventoryPage() {

  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');

    if (!isLoggedIn) {
      navigate('/login');
    }
    else if (userType !== 'admin') {
      navigate('/error');
    }

    const getProducts = async () => {
      const response = await fetch("http://localhost:8081/products");
      const data = await response.json();
      setProducts(data);
    };
    const getCategories = async () => {
      const response = await fetch("http://localhost:8081/product-categories");
      const data = await response.json();
      setCategories(data);
    };
    getProducts();
    getCategories();
  }, []);

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

  const openDeleteModal = (item) => {
    setDeleteItem(item);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/products/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
      } else {
        console.error("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
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
                  <button
                    onClick={openModal}
                    className="bg-[#14463A] text-white px-4 py-2 w-full rounded-md hover:bg-green-800"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="flex gap-2 items-center justify-end">
                  <MdSort className="text-xl" />
                  <h1 className="font-semibold font-[POPPINS] text-xl">
                    Sort By
                  </h1>
                </div>
              </div>
            </div>

            <div class="p-4">
              <hr class="mb-4" />

              <div class="overflow-x-auto">
                <table class="min-w-full shadow-md">
                  <thead class="">
                    <tr>
                      <th class="px-4 py-2">Image</th>
                      <th class="px-4 py-2">SKU</th>
                      <th class="px-4 py-2">Item Name</th>
                      <th class="px-4 py-2">Category</th>
                      <th class="px-4 py-2">Price</th>
                      <th class="px-4 py-2">Measurement</th>
                      <th class="px-4 py-2">Stocks</th>
                      <th class="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr class="text-center">
                          <td class="px-4 py-2 flex items-center justify-center">
                            <img
                              src={product.image_link}
                              alt="error"
                              className="w-16 h-16 object-contain"
                            />
                          </td>
                          <td class="px-4 py-2">{product.sku}</td>
                          <td class="px-4 py-2">{product.name}</td>
                          <td class="px-4 py-2">{categories.find(category => category.id === product.category_id)?.name}</td>
                          <td class="px-4 py-2">{formatToPeso(product.price)}</td>
                          <td class="px-4 py-2">{product.measurement}</td>
                          <td class="px-4 py-2">{product.stocks}</td>
                          <td class="px-4 py-2">
                            <div className="space-x-2">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => openEditModal(product)}
                              >
                                <AiOutlineEdit size={30} />
                              </button>
                              <button
                                type="button"
                                onClick={() => openDeleteModal(product)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <AiOutlineDelete size={30} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
        item={selectedItem}
        onSave={(updatedItem) => console.log("Updated Item:", updatedItem)} // Replace with API call
      />

      <DeleteItemModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        item={deleteItem}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default InventoryPage;
