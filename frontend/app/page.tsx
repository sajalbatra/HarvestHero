"use client"
import { useState, useEffect } from 'react';
import HomePage from "../components/Donorpage/HomePage";
import LandingPage from "../components/LandingPage";
import Homepage from "../components/Ngopage/Homepage";
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  role: string;
}

const page: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const authToken = localStorage.getItem('Authorization') || "";
    if (authToken) {
      try {
        const tokenString = authToken.split(" ")[1] || "";
        const token = jwtDecode<DecodedToken>(tokenString);
        if (token) {
          setIsLoggedIn(true);
          setUserRole(token.role);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {
        isLoggedIn ? (
          userRole === 'USER' ? (
            <div>
              <HomePage />
            </div>
          ) : (
            <Homepage />
          )
        ) : (
          <LandingPage />
        )
      }
    </>
  );
};

export default page;
