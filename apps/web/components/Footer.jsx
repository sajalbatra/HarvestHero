import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from "../assets/logo.png";
import { themeState } from '../Recoil/Atoms/themechange';
import { useRecoilValue } from 'recoil';
const Footer = () => {
  const [theme, setTheme] = useState("");
  const recoilTheme = useRecoilValue(themeState);
  useEffect(() => {
    setTheme(recoilTheme);
    //console.log(theme);
  }, [recoilTheme]);

  return (
    <div className={`${theme} dark:bg-dark-background`}>
    <footer className={'flex flex-col items-center justify-center py-6 border-t-2 dark:text-white dark:bg-black dark:border-gray-700 text-gray-800  border-gray-300'}>
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
  );
};

export default Footer;
