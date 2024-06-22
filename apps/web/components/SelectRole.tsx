import React, { useState } from "react";
import DonorLogin from "./DonorLogin";
import Donorsignup from "./Donorsignup";
import Ngologin from "./Ngologin";
import Ngosignup from "./Ngosignup";
const SelectRole: React.FC = () => {
  const [ngostate, setNgostate] = useState<string>("");
  const [donorstate, setDonorstate] = useState<string>("");


  return (
    <>
      {ngostate === "" && donorstate === "" ? (
        <div className="flex flex-wrap w-full pt-10 text-white bg-black justify-evenly">
          {/* LOGIN SECTION */}
          <div className="flex-col max-w-40">
            <h1 className="text-4xl text-center">Already A User? Login</h1>
            <button className="text-2xl" onClick={() => setDonorstate("Login")}>
              Login as Donor
            </button>
            <br />
            <button className="text-2xl" onClick={() => setNgostate("Login")}>
              Login as NGO
            </button>
          </div>
          {/* Signup SECTION */}
          <div className="flex-col max-w-40">
            <h2 className="text-4xl">Create an Account Now</h2>
            <button className="text-2xl" onClick={() => setDonorstate("Signup")}>
              Join as Donor
            </button>
            <br />
            <button className="text-2xl" onClick={() => setNgostate("Signup")}>
              Join as NGO
            </button>
          </div>
        </div>
      ) : ngostate === "Login" ? (
        <Ngologin/>
      ) : ngostate === "Signup" ? (
        <Ngosignup/>
      ) : donorstate === "Login" ? (
       <DonorLogin/>
      ) : donorstate === "Signup" ? (
       <Donorsignup/>
      ) : (
        <div>
          {/* Placeholder for future content when both states are not empty */}
          <h1>Placeholder for combined state content</h1>
        </div>
      )}
    </>
  );
};

export default SelectRole;
