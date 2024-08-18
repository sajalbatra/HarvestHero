"use client";
import AllDonors from '../alldonor'; // Assuming this imports your function to fetch donors
import Header from '../../../components/Donorpage/Header';
import { themeState } from '../../../Recoil/Atoms/themechange';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import Footer from '../../../components/Footer';
import axios from 'axios';
import { WEB_URL } from '../../../public/constants';
import { notifyError, notifySuccess } from '../../../services/Notification'
import Notification from '../../../services/Notification'

export default function DonorPage({ params }) {
    const paramsSlug = decodeURIComponent(params.slug);
    const name = paramsSlug.split('&&')[0];
    const email = paramsSlug.split('&&')[1];
    const donors = AllDonors();
    const [password, setpassword] = useState("")
    const changepassword = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(`${WEB_URL}/donor/password_change`, { password }, {
                headers: {
                    Authorization: localStorage.getItem('Authorization')
                }
            });
            const result = response.data.msg
            //console.log(result)
            setpassword("")
            notifySuccess(result)
        } catch (error) {
            notifyError("Error in changing password")
        }
    }
    const [theme, setTheme] = useState("");
    const recoilTheme = useRecoilValue(themeState);

    useEffect(() => {
        setTheme(recoilTheme);
    }, [recoilTheme]);

    const filteredDonor = donors.filter(donor => donor.name === name && donor.email === email);

    if (filteredDonor.length === 0) {
        return <div>donor not found for {paramsSlug}</div>;
    }

    const donor = filteredDonor[0];

    return (
        <div className={`${theme} dark:bg-dark-background dark:text-white`}>
            <Notification />
            <div className="py-4 mx-auto mobile:m-0">
                <Header />

                <h2 className="mb-4 text-3xl font-bold text-center">{donor.name}</h2>

                {/* Contact Information */}
                <div className="p-4 mb-4 border rounded-lg shadow-md">
                    <h3 className="mb-2 text-xl font-semibold">Contact Information</h3>
                    <p className="mb-1"><span className="font-semibold">Email:</span> {donor.email}</p>
                    <p className="mb-1"><span className="font-semibold">Phone Number:</span> {donor.phoneNumber}</p>
                </div>

                {/* Address */}
                <div className="p-4 mb-4 border rounded-lg shadow-md">
                    <h3 className="mb-2 text-xl font-semibold">Address</h3>
                    <p className="mb-1"><span className="font-semibold">Street Address:</span> {donor.address.streetAddress}</p>
                    <p className="mb-1"><span className="font-semibold">City:</span> {donor.address.city}</p>
                    <p className="mb-1"><span className="font-semibold">State:</span> {donor.address.state}</p>
                    <p className="mb-1"><span className="font-semibold">Postal Code:</span> {donor.address.postalCode}</p>
                    <p className="mb-1"><span className="font-semibold">Country:</span> {donor.address.country}</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 mb-10 ml-1 lg:flex-row lg:items-center'>
                <p className='self-center'>Change password?</p>
                <form onSubmit={changepassword} className='flex flex-col gap-4 lg:flex-row'>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => { setpassword(e.target.value) }}
                        placeholder='Enter the new password...'
                        className='flex-1 px-2 py-1 bg-transparent border-b-2 border-gray-300 dark:text-white focus:border-black lg:border-b-0 lg:border-r-2 lg:px-4 lg:py-2'
                    />
                    <button
                        type='submit'
                        className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 lg:rounded-r-none'
                    >
                        Submit
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
}
