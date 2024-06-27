"use client";
import Header from "./Header";
import { useState, useEffect } from 'react';
import Card from "./Card";
import AllNgo from "../../app/ngo/Allngos";

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

      <div className="w-full bg-secondary p-[10%] dark:bg-dark-primary shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl text-center max-w-[1/6] drop-shadow-md mb-6">
            <span className="text-primary dark:text-black">Happiness </span>
            comes from your action.
          </p>
          <div className="flex items-center justify-center gap-4 mt-10 -mb-10">
            <button className="p-3 text-xl font-semibold text-white transition duration-300 border rounded-full shadow-md border-1 bg-error dark:bg-dark-error hover:bg-error-dark dark:hover:bg-dark-error-dark">
              Donate Now
            </button>
            <button className="p-3 text-xl font-semibold text-white transition duration-300 border rounded-full shadow-md border-1 bg-error dark:bg-dark-error hover:bg-error-dark dark:hover:bg-dark-error-dark">
              Watch Video
            </button>
          </div>
        </div>
      </div>

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
        <div className="flex items-center justify-center gap-10">
          <select
            className="p-3 text-lg transition duration-300 bg-white border rounded-md shadow-md dark:bg-dark-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedDonationType}
            onChange={(e) => setSelectedDonationType(e.target.value)}
          >
            <option value="">Select Donation Type</option>
            {DonationType.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="p-3 text-lg transition duration-300 bg-white border rounded-md shadow-md dark:bg-dark-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedNGOType}
            onChange={(e) => setSelectedNGOType(e.target.value)}
          >
            <option value="">Select NGO Type</option>
            {NGOType.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-10">
          {fetchedNgoData.map((ngo, index) => (
            <Card key={index} name={ngo.name} mission={ngo.ngoProfile.mission} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
