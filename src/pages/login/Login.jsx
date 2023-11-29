import React, { useEffect, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
export const Login = () => {
  const [username, setUser] = useState("")
  const [password, setPass] = useState("")
  const [selectedroom, setSelectedRoom] = useState('');
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get('http://localhost:8000/api/user/allrooms/');
        if (response.status === 200) {
          setRooms(response.data); 
        } else {
          console.error('Failed to fetch rooms:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }

    fetchRooms();
  }, []);

  const handleForm = async(event) => {
    event.preventDefault();

    if (selectedroom === 'null') {
      setError('Please select a valid room.');
      return;
    }

    try {
  
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        username,
        password,
        selectedroom,
      });

      
      if (response.status === 201) {
        const {  userId } = response.data.user;

        // Store the username, selected room, and user ID in local storage
      
        localStorage.setItem('userId', userId);
       
        navigate('/');
      } else {
        
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      
      setError('An error occurred while logging in. Please try again later.');
    }
  }
  
  return (
    <div className='login'>

      <form className='logform'>
        <input type='text' className='username' placeholder='enter the username' onChange={(e) => setUser(e.target.value)} required={true}/>

        <input className='password' type='password' onChange={(e) => setPass(e.target.value)} required={true} />

        <select placeholder='select a room' className='selectroom' value={selectedroom} onChange={(e) => setSelectedRoom(e.target.value)} required={true}>
        <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <button className='button' type="button" onClick={handleForm}>Login</button>
       
        <span>or</span>
        <Link to="/register" className="Link" >Register</Link>
      
      </form>
      {error && <span>{error}</span>}
    </div>
  )
}
