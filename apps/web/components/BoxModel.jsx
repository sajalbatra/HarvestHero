"use client";
import React, { useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";

const BoxModel = () => {
    const [toggle, setToggle] = useState(true);

    return (
        <>
            {!toggle ? (
                <div>
                    {/* Nothing to display when toggle is true */}
                </div>
            ) : (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex justify-end">
                            <button
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setToggle(false)}
                            >
                                <MdOutlineCancel className="text-xl" />
                            </button>
                        </div>
                        <div className=" text-center -mt-[5%]">
                            <h2 className="mb-4 text-xl font-bold text-gray-800">Welcome to HarvestHero!</h2>
                            <p className="leading-relaxed text-gray-600">
                                Join HarvestHero today and make a difference in your community and beyond. Our platform connects generous individuals, businesses, and organizations with NGOs and charities. Whether you have surplus food, clothing, technology, or other essentials to donate, HarvestHero ensures that your contributions reach those in need efficiently and effectively.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BoxModel;
