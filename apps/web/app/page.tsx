"use client"
import { useState, useEffect } from 'react';

import LandingPage from "../components/LandingPage"
const page = () => {
  const [isloggedin, setIsloggedin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("Authorization")
    if (token) {
      console.log("User is signedin")
      setIsloggedin(true)
    }
    else {
      console.log("User is not signedin")
      setIsloggedin(false)
    }
  }, [])
  return (
    <>
      {
        isloggedin ? (
          <div>
            User is signed in
          </div>
        )
          :
          <LandingPage />
      }
    </>
  )
}

export default page


