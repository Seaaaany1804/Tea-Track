import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar';
import { FaBoxOpen, FaTruck, FaDollarSign } from 'react-icons/fa';
import { MdOutlineInventory, MdAddCircleOutline, MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { formatToShortDate } from '../../CustomFunctions';

Chart.register(...registerables);

const DashboardPage = () => {

    const [logs, setLogs] = useState([]);

    // Sample Chart Data
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Item Purchases',
                data: [10, 20, 15, 25, 30, 45, 35, 50, 60, 70, 80, 75],
                borderColor: '#14463A',
                backgroundColor: 'rgba(20, 70, 58, 0.2)',
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userType = localStorage.getItem('userType');
        
        if (!isLoggedIn) {
            navigate('/login');
        }
        else if (userType !== 'admin') {
            navigate('/error');
        }

        const fetchLogs = async () => {
            const response = await fetch('https://teatrackbackend.vercel.app/logs');
            const data = await response.json();
            setLogs(data.reverse());
        }
        fetchLogs();
    }, [navigate]);

    return (
        <div className="bg-gray-100 min-h-screen text-gray-900">
            <Navbar />
            <div className="p-8 px-20">
                {/* Title Section */}
                <h1 className="text-3xl font-bold text-[#14463A] mb-6">Dashboard</h1>

                {/* Grid Layout for Dashboard Cards */}
                <div className="grid grid-cols-3 gap-6">

                    {/* Orders Section */}
                    <div className="bg-white shadow-lg p-6 rounded-lg col-span-1">
                        <h2 className="text-2xl font-semibold text-[#14463A] mb-4">Orders</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
                                <FaBoxOpen className="text-3xl text-[#14463A]" />
                                <p className="text-lg font-bold mt-2">Total Orders</p>
                                <p className="text-2xl font-bold">1000</p>
                            </div>
                            <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
                                <FaDollarSign className="text-3xl text-[#14463A]" />
                                <p className="text-lg font-bold mt-2">Total Amount</p>
                                <p className="text-2xl font-bold">₱1000</p>
                            </div>
                            <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
                                <FaTruck className="text-3xl text-[#14463A]" />
                                <p className="text-lg font-bold mt-2">Out for Delivery</p>
                                <p className="text-2xl font-bold">1000</p>
                            </div>
                            <div className="p-4 border rounded-lg flex flex-col items-center justify-center">
                                <FaBoxOpen className="text-3xl text-[#14463A]" />
                                <p className="text-lg font-bold mt-2">Delivered</p>
                                <p className="text-2xl font-bold">1000</p>
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-[#14463A] text-white py-2 rounded-md hover:bg-green-800">
                            View Details
                        </button>
                    </div>

                    {/* Inventory Section */}
                    <div className="bg-white shadow-lg p-6 rounded-lg col-span-1">
                        <h2 className="text-2xl font-semibold text-[#14463A] mb-4">Inventory</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center">
                                <MdOutlineRemoveShoppingCart className="text-3xl text-[#14463A]" />
                                <p className="text-lg font-bold mt-2">Out of Stock</p>
                                <p className="text-2xl font-bold">98</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <MdOutlineInventory className="text-3xl text-[#14463A]" />
                                <p className="text-lg font-bold mt-2">Total Items</p>
                                <p className="text-2xl font-bold">98</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <MdAddCircleOutline className="text-3xl text-[#14463A]" />
                                <p className="text-lg font-bold mt-2">New Items</p>
                                <p className="text-2xl font-bold">98</p>
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-[#14463A] text-white py-2 rounded-md hover:bg-green-800">
                            View Details
                        </button>
                    </div>

                    {/* Logs Section */}
                    <div className="bg-white shadow-lg p-6 rounded-lg col-span-1">
                        <h2 className="text-2xl font-semibold text-[#14463A] mb-4">Logs</h2>
                        <ul className="space-y-2 overflow-y-auto max-h-[330px]">
                            {logs.map((log) => {
                                return (
                                    <li className="flex justify-between items-center border-b pb-2">
                                        <span>{log.description}</span>
                                        <span className="text-gray-600">{formatToShortDate(log.created_at)}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Item Purchases Chart */}
                    <div className="col-span-3 bg-white shadow-lg p-6 rounded-lg mt-6">
                        <h2 className="text-2xl font-semibold text-[#14463A] mb-4">Item Purchases</h2>
                        <div className="h-80">
                            <Line data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
