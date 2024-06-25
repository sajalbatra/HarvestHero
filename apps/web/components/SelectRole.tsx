"use client"
import Marquee from "react-fast-marquee";
import React, { useEffect, useState } from "react";
import DonorLogin from "./DonorLogin";
import Donorsignup from "./Donorsignup";
import Ngologin from "./Ngologin";
import Ngosignup from "./Ngosignup";
import BoxModel from "./BoxModel"
const SelectRole: React.FC = () => {
  const [ngostate, setNgostate] = useState<string>("");
  const [donorstate, setDonorstate] = useState<string>("");
  return (
    <>
      <BoxModel/>
     <Marquee pauseOnHover={true} className="inline-block px-4 py-2 text-lg font-semibold text-white bg-blue-600 shadow-md"	>
      Welcome to Harvest Hero &emsp; Join Now!!!!!
      </Marquee>
    <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
      {ngostate === "" && donorstate === "" ? (
        <div className="flex flex-col w-full bg-gray-800 rounded-lg shadow-lg max-w-[90%] md:max-w-[60%] lg:max-w-[50%] md:flex-row">
          {/* LOGIN SECTION */}
          <div className="flex flex-col items-center w-full p-4 border-b border-gray-700 md:border-b-0 md:border-r md:w-1/2">
            <h1 className="mb-6 text-4xl font-semibold text-center">Already A User?</h1>
            <button 
              className="w-3/4 px-4 py-2 mb-4 text-2xl font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
              onClick={() => setDonorstate("Login")}
            >
              Login as Donor
            </button>
            <button 
              className="w-3/4 px-4 py-2 text-2xl font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
              onClick={() => setNgostate("Login")}
            >
              Login as NGO
            </button>
          </div>
          {/* Signup SECTION */}
          <div className="flex flex-col items-center w-full p-4 md:w-1/2">
            <h2 className="mb-6 text-4xl font-semibold text-center">Join Now!</h2>
            <button 
              className="w-3/4 px-4 py-2 mb-4 text-2xl font-semibold text-white transition-colors bg-green-600 rounded hover:bg-green-700"
              onClick={() => setDonorstate("Signup")}
            >
              Join as Donor
            </button>
            <button 
              className="w-3/4 px-4 py-2 text-2xl font-semibold text-white transition-colors bg-green-600 rounded hover:bg-green-700"
              onClick={() => setNgostate("Signup")}
            >
              Join as NGO
            </button>
          </div>
        </div>
      ) : ngostate === "Login" ? (
        <Ngologin />
      ) : ngostate === "Signup" ? (
        <Ngosignup />
      ) : donorstate === "Login" ? (
        <DonorLogin />
      ) : donorstate === "Signup" ? (
        <Donorsignup />
      ) : (
        <div>
          {/* Placeholder for future content when both states are not empty */}
          <h1>Placeholder for combined state content</h1>
        </div>
      )}
    </div>
    </>

  );
};

export default SelectRole;
