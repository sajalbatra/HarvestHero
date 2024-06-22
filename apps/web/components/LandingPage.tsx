"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ReactTyped } from "react-typed";
import Card from './Card';
import star from "../assets/Landingpage/star.svg";
import sun from "../assets/Landingpage/sun.png";
import bg from "../assets/Landingpage/bg.jpeg";
import SelectRole from "./SelectRole";

const Main = () => {
  const [selectedRole, setSelectedRole] = useState(false);

  const roleSelected = () => {
    setSelectedRole(true); 
  };

  return (
    <div>
      {selectedRole ? (
        <SelectRole /> 
      ) : (
        <LandingPage roleSelected={roleSelected} /> 
      )}
    </div>
  );
};

interface LandingPageProps {
  roleSelected: () => void;
}

const LandingPage = ({ roleSelected }:LandingPageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center bg-black font-bitter">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen text-4xl font-bold text-center text-white">
          <ReactTyped strings={["Harvest Hero"]} typeSpeed={40} />
        </div>
      ) : (
        <div>
          <div className="flex -z-50">
            <Image
              src={sun}
              width={100}
              height={100}
              alt="Picture of the sun"
              className="w-[100%] h-[100%] -mt-[6%]"
            />
            <Image
              src={bg}
              width={600}
              height={600}
              alt="Picture of the space"
              className="ml-[15%] -mt-[15%] w-[50%] h-[50%]"
            />
          </div>
          <div className="z-10 -mt-[30%] text-xl text-white ml-[2%] w-[45%] space-y-8">
            <p className='font-extrabold text-7xl '>Connecting Donors with Those in Need</p>
            <p className='text-3xl font-normal'>Streamline your donations and make a tangible impact with HarvestHero.</p>
            <button className='p-2 px-5 text-black bg-white rounded-full' onClick={roleSelected}>Get Started</button>
          </div>
          {/* how it works section*/}
          <div className='my-10'>
            <p className='text-3xl font-semibold text-center text-white'>How It Works</p>
            <div className='flex mx-2 text-white justify-evenly mt-[3%]'>
              <Card img={star} title='Step 1: Sign Up:' description='Create a profile as a donor or NGO.' />
              <Card img={star} title='Step 2: Explore Donations:' description='Browse or request donations.' />
              <Card img={star} title='Step 3: Connect and Donate:' description='Initiate donation transactions easily.' />
              <Card img={star} title='Step 4: Track Impact:' description='Monitor the difference you’re making.' />
            </div>
          </div>
          {/* About Us Section*/}
          <div>
            <p> About Us </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
