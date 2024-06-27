"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WEB_URL } from '../../public/constants';

const AllNgo = () => {
  const [ngoData, setNgoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${WEB_URL}/ngo/getngo`, {
          headers: {
            Authorization: localStorage.getItem('Authorization')
          }
        });
        setNgoData(response.data);
      } catch (error) {
        console.error('Error fetching NGOs:', error);
      }
    };

    fetchData();
  }, []);

  return ngoData; 
};

export default AllNgo;
