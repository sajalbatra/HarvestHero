import axios from "axios";
import React, { useState } from "react";
const Web_Url = "http://localhost:3000/api/v1/testing"


const Donorsignup = () => {
    
  const handleDonorSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Debug: Print formData content
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(`${Web_Url}/donor/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Donor Sign Up successful:", response.data);
    } catch (error) {
      console.error("Donor Sign Up failed:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response);
        console.error("Error config:", error.config);
      }
    }
  };


  return (
    <div className="flex items-center justify-center bg-gray-100">
    <form onSubmit={handleDonorSignUp} className="max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="donor-name" className="block mb-2 text-sm font-bold text-gray-700">
          Name:
        </label>
        <input
          id="donor-name"
          name="name"
          type="text"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="donor-email" className="block mb-2 text-sm font-bold text-gray-700">
          Email:
        </label>
        <input
          id="donor-email"
          name="email"
          type="email"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="donor-password" className="block mb-2 text-sm font-bold text-gray-700">
          Password:
        </label>
        <input
          id="donor-password"
          name="password"
          type="password"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          minLength={6}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="donor-phone" className="block mb-2 text-sm font-bold text-gray-700">
          Phone Number:
        </label>
        <input
          id="donor-phone"
          name="phoneNumber"
          type="tel"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
  )
}

export default Donorsignup