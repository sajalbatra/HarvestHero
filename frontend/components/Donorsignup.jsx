'use client'
import { useRouter } from 'next/navigation'
import axios from "axios";
import React, { useState } from "react";
import { WEB_URL } from "../public/constants";
import { notifyError, notifySuccess } from '../services/Notification'
import Notification from '../services/Notification'
const Web_url = WEB_URL

const Donorsignup = () => {
  // State variables for form inputs
  const router = useRouter()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [donationType, setDonationType] = useState([]);

  // Handle form submission
  const handleDonorSignUp = async (event) => {
    event.preventDefault();
    const parsedPostalCode = parseInt(postalCode, 10); // Convert to base 10 integer

    // Validate data
    const formData = {
      name,
      email,
      password,
      phoneNumber,
      address: {
        streetAddress,
        city,
        state,
        postalCode: parsedPostalCode, // Use parsed integer value
        country,
      },
      affiliation,
      donationType,
    };

    try {
      const response = await axios.post(`${Web_url}/donor/signup`, formData)
      notifySuccess("OTP Send to Email")
      setTimeout(()=>{
      router.push(`/verifyotp/donor?email=${email}`)
      },3000)
  } catch (error) {
      notifyError("Error in sending OTP")            
  }
  };

  return (
    <div className="flex items-center justify-center w-full bg-gray-100">
      <Notification />
      <form
        onSubmit={handleDonorSignUp}
        className="max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="donor-name"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Name:
          </label>
          <input
            id="donor-name"
            name="name"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="donor-email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Email:
          </label>
          <input
            id="donor-email"
            name="email"
            type="email"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="donor-password"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Password:
          </label>
          <input
            id="donor-password"
            name="password"
            type="password"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="donor-phone"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Phone Number:
          </label>
          <input
            id="donor-phone"
            name="phoneNumber"
            type="tel"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        {/* Street Address */}
        <div className="mb-4">
          <label
            htmlFor="donor-street-address"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Street Address:
          </label>
          <input
            id="donor-street-address"
            name="streetAddress"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="donor-city"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            City:
          </label>
          <input
            id="donor-city"
            name="city"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label
            htmlFor="donor-state"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            State:
          </label>
          <input
            id="donor-state"
            name="state"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <label
            htmlFor="donor-postal-code"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Postal Code:
          </label>
          <input
            id="donor-postal-code"
            name="postalCode"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="donor-country"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Country:
          </label>
          <input
            id="donor-country"
            name="country"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        {/* Affiliation */}
        <div className="mb-4">
          <label
            htmlFor="donor-affiliation"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Affiliation:
          </label>
          <input
            id="donor-affiliation"
            name="affiliation"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            required
          />
        </div>

        {/* Donation Type */}
        <div className="mb-4">
          <label
            htmlFor="donor-donation-type"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Donation Type (comma-separated):
          </label>
          <input
            id="donor-donation-type"
            name="donationType"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={donationType}
            onChange={(e) => setDonationType(e.target.value.split(","))}
            required
          />
        </div>

        {/* Submit Button */}
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
  );
};

export default Donorsignup;
