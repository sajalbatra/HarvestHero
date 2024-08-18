import React, { useState, useEffect } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { IoIosLogOut } from "react-icons/io";
import { useRecoilState } from 'recoil';
import { themeState } from '../../Recoil/Atoms/themechange';
import Link from 'next/link';
const Header = () => {
    const [openDialogBox, setOpenDialogBox] = useState(false);
    const [darkMode, setDarkMode] = useRecoilState(themeState);

    useEffect(() => {
        const storedTheme = localStorage.getItem('themePreference') || 'light';
        setDarkMode(storedTheme);
    }, [setDarkMode]);

    const toggleDarkMode = () => {
        const newMode = darkMode === 'light' ? 'dark' : 'light';
        setDarkMode(newMode);
        localStorage.setItem('themePreference', newMode);
    };

    const toggleDialogBox = () => {
        setOpenDialogBox(!openDialogBox);
    };

    return (
        <>
            <div className="flex items-center justify-between px-4 pt-1 pb-0 text-2xl dark:bg-dark-background dark:text-white ">
                <div className="title">
                    <Link href="/">
                        <h1>HarvestHero</h1>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {darkMode === 'light' ? (
                        <MdOutlineWbSunny onClick={toggleDarkMode} className="text-3xl cursor-pointer" />
                    ) : (
                        <FaMoon onClick={toggleDarkMode} className="text-2xl cursor-pointer" />
                    )}
                    <FaRegCircleUser className='transition ease-in-out cursor-pointer hover:-translate-y-1' onClick={toggleDialogBox} />
                </div>
            </div>
            {openDialogBox && <DialogBox />}
        </>
    );
};

const DialogBox = () => {
    const deletetoken = () => {
        localStorage.removeItem('Authorization');
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    };

    const tokenString = localStorage.getItem('Authorization').split(" ")[1] || "";
    const token = jwtDecode(tokenString);
    const name = token.name;
    const email = token.email;
    const role = token.role;

    return (
        <div className='fixed z-10 p-4 border-2 rounded-md shadow-lg bg-surface dark:bg-dark-surface border-primary dark:border-dark-primary top-10 right-2 animate-fade-in-down'>
            <p className='text-primary dark:text-dark-primary'><strong>Name:</strong> {name}</p>
            <p className='text-primary dark:text-dark-primary'><strong>Email:</strong> {email}</p>
            <p className='text-primary dark:text-dark-primary'><strong>Role:</strong> {role === 'USER' ? 'Donor' : 'Ngo'}</p>
            <Link href={`/donor/${name}&&${email}`}>
                <p className='cursor-pointer text-primary dark:text-dark-primary hover:text-primary-variant dark:hover:text-dark-primary-variant'><strong>More Information?</strong></p>
            </Link>
            <p className='flex items-center justify-center text-2xl cursor-pointer text-primary dark:text-dark-primary hover:text-primary-variant dark:hover:text-dark-primary-variant'>
                <IoIosLogOut onClick={deletetoken} />
            </p>
        </div>
    );
};

export default Header;
export { DialogBox };
