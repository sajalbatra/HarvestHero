"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ReactTyped } from "react-typed";
import Card from './Card';
import star from "../assets/Landingpage/star.svg";
import sun from "../assets/Landingpage/sun.png";
import bg from "../assets/Landingpage/bg.jpeg";
import SelectRole from "./SelectRole";
import Footer from "./Footer"
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
        <div className='mx-2 bg-black'>
          <div className="flex justify-evenly">
            <Image
              src={sun}
              width={100}
              height={100}
              alt="Picture of the sun"
              className="w-[100%] h-[100%] "
            />
            <Image
              src={bg}
              width={600}
              height={600}
              alt="Picture of the space"
              className="w-[50%] h-[50%]"
            />
          </div>
          <div className="z-10 -mt-[45%] space-y-8 text-white mobile:w-full mobile:flex-col mobile:justify-center mobile:items-center">
            <p className='font-extrabold text-7xl mobile:text-2xl mobile:text-center'>Connecting Donors with Those in Need</p>
            <p className='text-3xl font-normal mobile:text-lg mobile:text-center'>Streamline your donations and make a tangible impact with HarvestHero.</p>
            <button className='p-2 px-5 text-2xl text-black bg-white rounded-full mobile:text-sm' onClick={roleSelected}>Get Started</button>
          </div>
          {/* how it works section*/}
          <div className='my-10'>
            <p className='text-3xl font-semibold text-center text-white'>How It Works</p>
            <div className='flex text-white justify-evenly mt-[3%]  gap-4 mobile:gap-2 mobile:grid mobile:grid-cols-2 mobile:grid-rows-2'>
              <Card img={star} title='Step 1: Sign Up:' description='Create a profile as a donor or NGO.' />
              <Card img={star} title='Step 2: Explore Donations:' description='Browse or request donations.' />
              <Card img={star} title='Step 3: Connect and Donate:' description='Initiate donation transactions easily.' />
              <Card img={star} title='Step 4: Track Impact:' description='Monitor the difference you’re making.' />
            </div>
          </div>
          {/* About Us Section*/}
          <div className='my-10 '>
            <p className='text-3xl font-semibold text-center text-white'>About Us</p>
            <div className='flex flex-col items-center mt-4 space-y-4 text-xl text-white mobile:text-xs'>
              <p className='max-w-4xl text-center '>
                HarvestHero is a platform dedicated to bridging the gap between donors and those in need. Our mission is to create a seamless and efficient way to donate and distribute resources, ensuring that every donation makes a meaningful impact.
              </p>
              <p className='max-w-4xl text-center'>
                Founded with the vision of harnessing technology to support communities, HarvestHero connects individuals, restaurants, grocery stores, and other resource providers with NGOs and charities. We believe in the power of collaboration and transparency to drive social good.
              </p>
              <p className='max-w-4xl text-center '>
                Join us in our mission to make the world a better place, one donation at a time. Together, we can transform lives and build stronger, more resilient communities.
              </p>
              <p className='max-w-4xl text-center '>
                Whether you are a donor looking to make a difference or an NGO seeking support, HarvestHero provides the tools and connections you need to succeed. Our platform is designed to make the donation process simple, transparent, and impactful.
              </p>
            </div>
        </div>
        <Footer/>
        </div>
        
      )}
    </div>
  );
};

export default Main;
