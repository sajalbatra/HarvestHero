import axios from "axios";
import React, { useState } from "react";
const Web_Url = "http://localhost:3000/api/v1/testing"

const SelectRole: React.FC = () => {
  const [ngostate, setNgostate] = useState<string>("");
  const [donorstate, setDonorstate] = useState<string>("");

  const handleNGOSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const ngoFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      address: {
        streetAddress: formData.get("streetAddress") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postalCode: parseInt(formData.get("postalCode") as string),
        country: formData.get("country") as string,
      },
      ngoProfile: {
        mission: formData.get("mission") as string,
        logo: formData.get("logo") as File,
        type: formData.get("type") as string,
        legalDoc: formData.get("legalDoc") as File,
        requirement: formData.get("requirement") as string,
      },
    };

    axios
      .post(`${Web_Url}/ngo/signup`, ngoFormData)
      .then((response) => {
        console.log("NGO Sign Up successful:", response.data);
        // Optionally handle success response here
      })
      .catch((error) => {
        console.error("NGO Sign Up failed:", error);
        // Optionally handle error response here
      });
  };

  const handleDonorSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Donor Sign Up form submitted");
    // Add logic to handle Donor Sign Up form submission
  };

  const handleNGOLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("NGO Login form submitted");
    // Add logic to handle NGO Login form submission
  };

  const handleDonorLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Donor Login form submitted");
    // Add logic to handle Donor Login form submission
  };

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
        <div className="flex items-center justify-center bg-gray-100">
          <form onSubmit={handleNGOLogin} className="max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                NGO email
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="ngo-email"
                type="text"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                NGO Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="ngo-password"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      ) : ngostate === "Signup" ? (
        <div className="flex items-center justify-center bg-gray-100">
          <form onSubmit={handleNGOSignUp} className="max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="mb-4">
              <label htmlFor="ngo-name" className="block mb-2 text-sm font-bold text-gray-700">
                Name:
              </label>
              <input
                id="ngo-name"
                name="name"
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-email" className="block mb-2 text-sm font-bold text-gray-700">
                Email:
              </label>
              <input
                id="ngo-email"
                name="email"
                type="email"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-password" className="block mb-2 text-sm font-bold text-gray-700">
                Password:
              </label>
              <input
                id="ngo-password"
                name="password"
                type="password"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                minLength={6}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-phone" className="block mb-2 text-sm font-bold text-gray-700">
                Phone Number:
              </label>
              <input
                id="ngo-phone"
                name="phoneNumber"
                type="tel"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-address" className="block mb-2 text-sm font-bold text-gray-700">
                Street Address:
              </label>
              <input
                id="ngo-address"
                name="streetAddress"
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-city" className="block mb-2 text-sm font-bold text-gray-700">
                City:
              </label>
              <input
                id="ngo-city"
                name="city"
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-state" className="block mb-2 text-sm font-bold text-gray-700">
                State:
              </label>
              <input
                id="ngo-state"
                name="state"
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-postal" className="block mb-2 text-sm font-bold text-gray-700">
                Postal Code:
              </label>
              <input
                id="ngo-postal"
                name="postalCode"
                type="number"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-country" className="block mb-2 text-sm font-bold text-gray-700">
                Country:
              </label>
              <input
                id="ngo-country"
                name="country"
                type="text"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-mission" className="block mb-2 text-sm font-bold text-gray-700">
                Mission:
              </label>
              <textarea
                id="ngo-mission"
                name="mission"
                rows={4}
                cols={50}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-legalDoc" className="block mb-2 text-sm font-bold text-gray-700">
                NGO LOGO:
              </label>
              <input
                id="ngo-logo"
                name="logo"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-type" className="block mb-2 text-sm font-bold text-gray-700">
                NGO Type:
              </label>
              <select
                id="ngo-type"
                name="type"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              >
                <option value="NON_PROFIT">Non-Profit</option>
                <option value="CHARITY">Charity</option>
                <option value="FOUNDATION">Foundation</option>
                <option value="EDUCATIONAL">Educational</option>
                <option value="RELIGIOUS">Religious</option>
                <option value="HEALTHCARE">Healthcare</option>
                <option value="ENVIRONMENTAL">Environmental</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-legalDoc" className="block mb-2 text-sm font-bold text-gray-700">
                Legal Document:
              </label>
              <input
                id="ngo-legalDoc"
                name="legalDoc"
                type="file"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ngo-requirement" className="block mb-2 text-sm font-bold text-gray-700">
                Requirements:
              </label>
              <textarea
                id="ngo-requirement"
                name="requirement"
                rows={4}
                cols={50}
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
      ) : donorstate === "Login" ? (
        <div className="flex items-center justify-center bg-gray-100">
          <form onSubmit={handleDonorLogin} className="max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Donor email
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="donor-email"
                type="text"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Donor Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="donor-password"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      ) : donorstate === "Signup" ? (
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
