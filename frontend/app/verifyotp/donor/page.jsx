"use client"
import { useState, Suspense } from "react";
import { WEB_URL } from "../../../public/constants";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { notifyError, notifySuccess } from '../../../services/Notification'
import Notification from '../../../services/Notification'


function Verifyotpdonor() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(""); // State for success or failure message
  const searchParams = useSearchParams();
  const search = searchParams.get("email");
  const router = useRouter()

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${WEB_URL}/donor/verify_otp`, {
        email: search,
        otp: otp,
      });
      //console.log("Verification response:", response.data);
      const { token, newDonor } = response.data;
      localStorage.setItem("Authorization", "Bearer " + token)
      notifySuccess("Sign Up successful")
      //console.log("Donor Sign Up successful:", newDonor);
      setMessage("Account created successfully!");
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      //console.error("Verification failed:", error);
      notifyError("OTP verification failed")
      setMessage("OTP verification failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Notification />
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold">OTP Verification</h2>
        {message && (
          <p
            className={`${message.includes("failed") ? "text-red-600" : "text-green-600"
              } mb-4`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleVerification}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter the OTP received on email:
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the 6 digit one time password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Verifyotpdonor />
    </Suspense>
  );
}