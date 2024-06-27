
import Header from "./Header";
import { useState } from 'react';
import Card from "./Card";
// Enum values
const Organisation = [
  "HOSPITAL",
  "SCHOOL", "CHURCH", "NON_PROFIT_ORG", "OTHER"
];

const DonationType = [
  "FOOD", "CLOTHES", "MONETARY", "BOOKS", "TOYS",
  "MEDICAL_SUPPLIES", "TECHNOLOGY", "OTHERS"
];

const NGOType = [
  "NON_PROFIT", "CHARITY", "FOUNDATION", "EDUCATIONAL",
  "RELIGIOUS", "HEALTHCARE", "ENVIRONMENTAL"
];

const HomePage = () => {
  const [selectedOrganisation, setSelectedOrganisation] = useState("");
  const [selectedDonationType, setSelectedDonationType] = useState("");
  const [selectedNGOType, setSelectedNGOType] = useState("");

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
          type="search"
          placeholder="Enter the NGO name..."
          className="w-3/4 h-12 px-5 transition duration-300 border rounded-full shadow-md max-w-3/4 dark:text-black focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="p-3 ml-2 text-white transition duration-300 rounded-md shadow-md bg-primary hover:bg-primary-dark">
          Search
        </button>
      </div>

      <div className="flex flex-col mb-10">
        <h1 className="mb-6 text-2xl text-center">Filters</h1>
        <div className="flex items-center justify-center gap-10">
          <select
            className="p-3 text-lg transition duration-300 bg-white border rounded-md shadow-md dark:bg-dark-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedOrganisation}
            onChange={(e) => setSelectedOrganisation(e.target.value)}
          >
            <option value="">Select Organisation</option>
            {Organisation.map((org, index) => (
              <option key={index} value={org}>{org}</option>
            ))}
          </select>
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
        <Card name="Helping Hands" mission="Providing food and shelter to the homeless." />
      <Card name="EduForAll" mission="Promoting education for underprivileged children." />
      <Card name="Health First" mission="Ensuring healthcare access to remote areas." />
      <Card name="Green Earth" mission="Protecting the environment through conservation efforts." />
    
        </div>
      </div>
    </div>
  );
};

export default HomePage;
