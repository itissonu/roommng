import React, { useEffect, useState } from 'react';
import './header.scss';
import axios from 'axios';

export const Header = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
   
    fetchTotalExpenses();
  }, []);

  const fetchTotalExpenses = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const userResponse = await axios.get(`http://localhost:8000/api/user/${userId}`);
       const selectedRoomId = userResponse.data.selectedroom;
      const response = await axios.get(`http://localhost:8000/api/expense/total-expenses/${selectedRoomId}`);
      const total = response.data.totalAmount;
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching total expenses:', error);
    }
  };

  return (
    <div className="header">
      <p className="para">Just bhai kehi thakiba nahin</p>
      <div className="wholetotal">
        <span className="total">Total = ${totalExpenses}</span>
      </div>
    </div>
  );
};
