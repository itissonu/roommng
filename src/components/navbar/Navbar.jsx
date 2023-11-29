import React, { useEffect, useState } from 'react'
import './navbar.scss'
import axios from 'axios';
import {
  Link, useNavigate,
 } from "react-router-dom";
export const Navbar = () => {
  const userid = localStorage.getItem('userId');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {

    axios.get(`http://localhost:8000/api/user/${userid}`)
      .then((response) => {
       
        const { name } = response.data;
        setUserName(name);
       
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userid]);
  const handleSignout = () => {
   
    localStorage.removeItem('userId');
    
   
    navigate('/login');
  };
  
  return (
    <div className='navbar'>
        <span className='roomname'><Link to="/">Tulubhai Room</Link></span>
        <span className='roomname'>{userName ? `Welcome, ${userName}` : 'Loading...'}</span>
        {userid ? (
    <button className='navbutton' onClick={handleSignout}>Signout</button>
  ) : (
    <Link to="/register" className="navbutton">
      Register/Login
    </Link>
  )}
    </div>
  )
}
