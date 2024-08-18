"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import Card from "./Card";
import star from "../assets/Landingpage/star.svg";
// import sun from "../assets/Landingpage/sun.png";
import bg from "../assets/Landingpage/bg.jpeg";
import SelectRole from "./SelectRole";
import logo from "../assets/logo.png";

const Main = () => {
  const [selectedRole, setSelectedRole] = useState(false);

  const roleSelected = () => {
    setSelectedRole(true);
  };

  return (
    <div>
      {selectedRole ? <SelectRole /> : <LandingPage roleSelected={roleSelected} />}
    </div>
  );
};

interface LandingPageProps {
  roleSelected: () => void;
}

const LandingPage = ({ roleSelected }: LandingPageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black font-bitter">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen text-6xl font-bold text-center text-white">
          <ReactTyped strings={["Harvest Hero"]} typeSpeed={40} />
        </div>
      ) : (
        <div className="w-full mx-4">
          <div className="relative flex justify-evenly">
            {/* <Image
              src={sun}
              width={150}
              height={150}
              alt="Sun"
              className="animate-spin-slow"
            /> */}
            <Image
              src={bg}
              width={800}
              height={800}
              alt="Space"
              className="absolute inset-0 object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 mt-16 space-y-8 text-center text-white mobile:w-full">
            <h1 className="text-6xl font-extrabold mobile:text-3xl">
              Connecting Donors with Those in Need
            </h1>
            <p className="text-2xl font-light mobile:text-lg">
              Streamline your donations and make a tangible impact with HarvestHero.
            </p>
            <button
              className="p-4 px-8 text-2xl text-white transition-transform duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 mobile:text-base"
              onClick={roleSelected}
            >
              Click here to Start
            </button>
          </div>
          {/* How It Works Section */}
          <div className="my-20 text-white">
            <h2 className="text-4xl font-semibold text-center text-white">How It Works</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-10 mobile:grid motion-safe:grid-cols-2">
              <Card img={star} title="Sign Up" description="Create a profile as a donor or NGO." />
              <Card img={star} title="Explore Donations" description="Browse or request donations." />
              <Card img={star} title="Connect and Donate" description="Initiate donation transactions easily." />
              <Card img={star} title="Track Impact" description="Monitor the difference you’re making." />
            </div>
          </div>
          {/* About Us Section */}
          <div className="my-20">
            <h2 className="text-4xl font-semibold text-center text-white">About Us</h2>
            <div className="flex flex-col items-center max-w-4xl mx-auto mt-8 space-y-8 text-lg text-center text-white">
              <p>
                HarvestHero is a platform dedicated to bridging the gap between donors and those in need. Our mission is to create a seamless and efficient way to donate and distribute resources, ensuring that every donation makes a meaningful impact.
              </p>
              <p>
                Founded with the vision of harnessing technology to support communities, HarvestHero connects individuals, restaurants, grocery stores, and other resource providers with NGOs and charities. We believe in the power of collaboration and transparency to drive social good.
              </p>
              <p>
                Join us in our mission to make the world a better place, one donation at a time. Together, we can transform lives and build stronger, more resilient communities.
              </p>
              <p>
                Whether you are a donor looking to make a difference or an NGO seeking support, HarvestHero provides the tools and connections you need to succeed. Our platform is designed to make the donation process simple, transparent, and impactful.
              </p>
            </div>
          </div>
          <footer className={'flex flex-col items-center justify-center py-6 border-t-2 text-white bg-black border-gray-700 '}>
      <div className='container flex flex-col max-w-6xl px-4 mx-auto md:flex-row md:items-center md:justify-between'>
        <div className="flex items-center mb-4 md:mb-0 mobile:ml-[20%] gap-1">
          <Image src={logo} alt="HarvestHero Logo" width={50} height={50} />
          <span className="text-xl font-bold md:text-2xl">Harvest Hero</span>
        </div>
        <div className="flex justify-center gap-10 mr-8 text-xl mobile:justify-evenly mobile:text-sm mobile:gap-0 mobile:mr-0">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
      <div className='mt-4 text-center mobile:text-center'>
        <div className="text-base mobile:text-sm">
          &copy; {new Date().getFullYear()} HarvestHero. All rights reserved.
        </div>
        <div className="text-base md:text-lg">
          Developed By <a href='https://www.linkedin.com/in/sajal-batra/' className="hover:underline">Sajal Batra</a>
        </div>
      </div>
    </footer>
        </div>
      )}
    </div>
  );
};

export default Main;
