"use client";
import Header from "./Header";
import { useState, useEffect } from 'react';
import Card from "./Card";
import AllNgo from "../../app/ngo/Allngos";
import Hero from "./Hero"
import Footer from "../Footer";
// Enum values
const DonationType = [
  "FOOD", "CLOTHES", "MONETARY", "BOOKS", "TOYS",
  "MEDICAL_SUPPLIES", "TECHNOLOGY", "OTHERS"
];

const NGOType = [
  "NON_PROFIT", "CHARITY", "FOUNDATION", "EDUCATIONAL",
  "RELIGIOUS", "HEALTHCARE", "ENVIRONMENTAL"
];

const HomePage = () => {
  const Allngodata = AllNgo();
  const [selectedDonationType, setSelectedDonationType] = useState("");
  const [selectedNGOType, setSelectedNGOType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedNgoData, setFetchedNgoData] = useState(Allngodata);

  useEffect(() => {
    const filteredData = Allngodata.filter(ngo => {
      const donationTypeMatch = selectedDonationType === "" || ngo.donationType.includes(selectedDonationType);
      const ngoTypeMatch = selectedNGOType === "" || ngo.ngoProfile.type === selectedNGOType;
      const searchQueryMatch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase());
      return searchQueryMatch && donationTypeMatch && ngoTypeMatch;
    });

    setFetchedNgoData(filteredData);
  }, [selectedDonationType, selectedNGOType, searchQuery, Allngodata]);

  return (
    <div className="min-h-screen dark:bg-black dark:text-white">
      <Header />
      <Hero />

      <h1 className="m-10 text-3xl text-center drop-shadow-md">Open Donations</h1>

      <div className="flex items-start justify-center mb-10">
        <input
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Enter the NGO name..."
          className="w-3/4 h-12 px-5 transition duration-300 border rounded-full shadow-md max-w-3/4 dark:text-black focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col mb-10">
        <h1 className="mb-6 text-2xl text-center">Filters</h1>
        <div className="flex items-center justify-center gap-10 text-lg mobile:gap-1 mobile:text-xs">
          <select
            className="p-3 transition duration-300 bg-white border rounded-md shadow-md mobile:p-1 dark:bg-[#3700B3] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedDonationType}
            onChange={(e) => setSelectedDonationType(e.target.value)}
          >
            <option value="">Select Donation Type</option>
            {DonationType.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="p-3 transition duration-300 bg-white border rounded-md shadow-md mobile:p-1 dark:bg-[#3700B3] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedNGOType}
            onChange={(e) => setSelectedNGOType(e.target.value)}
          >
            <option value="">Select NGO Type</option>
            {NGOType.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center mt-10 mobile:grid mobile:grid-col-2 ">
          {fetchedNgoData.map((ngo, index) => (
            <Card key={index} name={ngo.name} mission={ngo.ngoProfile.mission} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;