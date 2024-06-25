import React, { useState } from 'react'
import axios from 'axios'
import {WEB_URL} from "../public/constants"
import { useRouter } from 'next/navigation'
import {notifyError, notifySuccess} from '../services/Notification'
import Notification from '../services/Notification'
const Web_url=WEB_URL

const DonorLogin = () => {
  const router=useRouter()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const handleDonorLogin = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const sendData = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(`${Web_url}/donor/login`,sendData);
      const {token} = response.data;
      //console.log(token); 
      localStorage.setItem("Authorization","Bearer "+token)
      //console.log("Donor Login successful:");
      notifySuccess("Login successful")
      setTimeout(()=>{
        router.push("/")
        window.location.reload();
      },3000)
    } catch (error) {
      //console.error('Error while logging in:', error);
      notifyError("Error while logging in")

    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-[1%] w-full h-screen">
    <Notification />
    <form onSubmit={handleDonorLogin} className="max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Enter Email:</label>
          <input name='email' type='text' id='email' placeholder='Enter the email for donor' required value={email} onChange={(e) => { setemail(e.target.value) }} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
        <label className="block mb-2 text-sm font-bold text-gray-700">Enter Password:</label>
        <input name='password' type='text' id='password' placeholder='Enter the Login password donor' required value={password} onChange={(e) => { setpassword(e.target.value) }} 
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <br/>
        <button type='submit'className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default DonorLogin