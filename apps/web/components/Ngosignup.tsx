import axios from "axios";
import React, { useState } from "react";
const Web_Url = "http://localhost:3000/api/v1/testing";

const Ngosignup = () => {
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
    const [donationType, setDonationType] = useState("");
    const [mission, setMission] = useState("");
    const [type, setType] = useState("NON_PROFIT");
    const [website, setWebsite] = useState("");
    const [requirement, setRequirement] = useState("");
    const [logo, setLogo] = useState<File | null>(null);
    const [legalDoc, setLegalDoc] = useState<File | null>(null);

    const handleNGOSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const signUpData = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            address: {
              streetAddress: streetAddress,
              city: city,
              state: state,
              postalCode: postalCode,
              country: country
            },
            affiliation: affiliation,
            donationType: donationType.split(",").map(type => type.trim()),
            ngoProfile: {
              mission: mission,
              type: type,
              website: website,
              requirement: requirement
            },
            logo: logo,       
            legalDoc: legalDoc 
          };
        //   if (logo) {
        //     signUpData.logo=logo;
        //   }
        //   if (legalDoc) {
        //     signUpData.legalDoc=legalDoc;
        //   }
  
        try {
            console.log(signUpData)
            const response = await axios.post("http://localhost:3000/api/v1/testing/ngo/signup", signUpData);
            console.log("NGO Sign Up successful:", response.data);
        } catch (error) {
            console.error("NGO Sign Up failed:", error);
        }
    };
    return (
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
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
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
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
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="ngo-affiliation" className="block mb-2 text-sm font-bold text-gray-700">
                        Affiliation:
                    </label>
                    <input
                        id="ngo-affiliation"
                        name="affiliation"
                        type="text"
                        value={affiliation}
                        onChange={(e) => setAffiliation(e.target.value)}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="ngo-donationtype" className="block mb-2 text-sm font-bold text-gray-700">
                        Donation Type:
                    </label>
                    <input
                        id="ngo-donationtype"
                        name="donationType"
                        type="text"
                        value={donationType}
                        onChange={(e) => setDonationType(e.target.value)}
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
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="ngo-logo" className="block mb-2 text-sm font-bold text-gray-700">
                        NGO Logo:
                    </label>
                    <input
                        id="ngo-logo"
                        name="logo"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => setLogo(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
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
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
                        onChange={(e) => setLegalDoc(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="ngo-website" className="block mb-2 text-sm font-bold text-gray-700">
                        Website:
                    </label>
                    <input
                        id="ngo-website"
                        name="website"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
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
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
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
    );
};

export default Ngosignup;
