"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WEB_URL } from '../../public/constants';

const AllDonors = () => {
  const [donorData, setdonorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${WEB_URL}/donor/getdonor`, {
          headers: {
            Authorization: localStorage.getItem('Authorization')
          }
        });
        setdonorData(response.data);
      } catch (error) {
        console.error('Error fetching Donors:', error);
      }
    };

    fetchData();
  }, []);
  return donorData; 
};

export default AllDonors;
