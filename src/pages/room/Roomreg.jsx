import React, { useState } from 'react'
import './roomreg.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Roomreg = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        'http://localhost:8000/api/auth/registerroom',
        { name }
      );

      if (response.status === 201) {
        setMessage('Room registration successful.');

        navigate("/register")
      } else {
        setMessage('Room registration failed.');
      }
    } catch (error) {
      console.error('Error during room registration:', error);
      setMessage('Room registration failed.');
    }
  }


  return (
    <div className='room-registration'>
      <h2>Room Registration</h2>
      <div className='message'>{message}</div>
      <form className='form'>
        <input
          type='text'
          placeholder='Room Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type='button' className='button' onClick={handleRegistration}>
          Register Room
        </button>
      </form>
    </div>
  )
}
