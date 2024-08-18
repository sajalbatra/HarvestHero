import React, { useEffect, useState } from 'react'
import Header from '../Donorpage/Header'
import { jwtDecode } from 'jwt-decode'
import AllNgo from '../../app/ngo/Allngos';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../Recoil/Atoms/themechange';
import { notifyError, notifySuccess } from '../../services/Notification'
import Notification from '../../services/Notification'
import axios from 'axios';
import { WEB_URL } from '../../public/constants';
import Footer from '../Footer';

const Homepage = () => {
  const [theme, setTheme] = useState("");
  const recoilTheme = useRecoilValue(themeState);
  useEffect(() => {
    setTheme(recoilTheme);
    //console.log(theme);
  }, [recoilTheme]);

  return (
    <div className={`${theme} dark:bg-dark-background`}>
      <Notification />
      <Header />
      <NgoPage theme={theme} />
    </div>
  )
}

export default Homepage


export function NgoPage({ theme }) {
  const auth = jwtDecode(localStorage.getItem('Authorization').split(" ")[1])
  const name = auth.name
  const ngos = AllNgo();
  const [password, setpassword] = useState("")
  //console.log(donors)
  const changepassword = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${WEB_URL}/ngo/password_change`, { password }, {
        headers: {
          Authorization: localStorage.getItem('Authorization')
        }
      });
      const result = response.data.msg
      //console.log(result)
      notifySuccess(result)
      setpassword("")

    } catch (error) {
      //console.log(error)
      notifyError("Error in changing password")
    }
  }
  const filteredNgo = ngos.filter(ngo => ngo.name === name);

  if (filteredNgo.length === 0) {
    return <div>NGO not found for {name}</div>;
  }

  const ngo = filteredNgo[0];

  return (
    <div className={`${theme} w-full`}>
      <div className={"py-4  dark:bg-dark-background dark:text-white"}>
        <div className="flex justify-center mb-4">
          <img src={ngo.ngoProfile.logo} alt={`${ngo.name} Logo`} className="w-64 h-64 transition-transform duration-300 ease-in-out border rounded-full dark:border-white hover:scale-150 mobile:w-32 mobile:h-32" />
        </div>

        <h2 className="mb-4 text-3xl font-bold text-center">{ngo.name}</h2>

        <div className="p-4 mb-4 border rounded-lg shadow-md">
          <h3 className="mb-2 text-xl font-semibold">Contact Information</h3>
          <p className="mb-1"><span className="font-semibold">Email:</span> {ngo.email}</p>
          <p className="mb-1"><span className="font-semibold">Phone Number:</span> {ngo.phoneNumber}</p>
        </div>

        <div className="p-4 mb-4 border rounded-lg shadow-md">
          <h3 className="mb-2 text-xl font-semibold">Address</h3>
          <p className="mb-1"><span className="font-semibold">Street Address:</span> {ngo.address.streetAddress}</p>
          <p className="mb-1"><span className="font-semibold">City:</span> {ngo.address.city}</p>
          <p className="mb-1"><span className="font-semibold">State:</span> {ngo.address.state}</p>
          <p className="mb-1"><span className="font-semibold">Postal Code:</span> {ngo.address.postalCode}</p>
          <p className="mb-1"><span className="font-semibold">Country:</span> {ngo.address.country}</p>
        </div>

        <div className="p-4 mb-4 border rounded-lg shadow-md">
          <h3 className="mb-2 text-xl font-semibold">NGO Profile</h3>
          <p className="mb-1"><span className="font-semibold">Mission:</span> {ngo.ngoProfile.mission}</p>
          <p className="mb-1"><span className="font-semibold">Type:</span> {ngo.ngoProfile.type}</p>
          <p className="mb-1"><span className="font-semibold">Website:</span> <a href={ngo.ngoProfile.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{ngo.ngoProfile.website}</a></p>
          <div className="mb-1">
            <span className="font-semibold">Legal Documentation:</span>
            {ngo.ngoProfile.legalDoc ? (
              <a href={ngo.ngoProfile.legalDoc} className="ml-2 text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View Document</a>
            ) : (
              <span className="ml-2">Not available</span>
            )}
          </div>

          <p className="mb-1"><span className="font-semibold">Requirements:</span> {ngo.ngoProfile.requirement}</p>
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
      </div>
      <Footer />
    </div>
  );
}
