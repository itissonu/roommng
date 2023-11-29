import React, { useEffect, useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
export const Register = () => {
  const [formdata, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    selectedroom: '',
  });
  const [profilePic, setProfilePic] = useState(null); // Separate state for profile picture
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

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      // Set the profile picture separately
      setProfilePic(e.target.files[0]);
    } else {
      setFormData({ ...formdata, [name]: value });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    // Create a FormData object for the profile picture
    const data = new FormData();
    if (profilePic) {
      data.append('file', profilePic);
      data.append('upload_preset', 'upload');
    }

    try {
      let updatedProfilePic = profilePic;
      // Upload the profile picture to Cloudinary
      if (profilePic) {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dbsonu270/image/upload',
          data
        );
        const { url } = uploadRes.data;
        updatedProfilePic = url; 
        console.log( updatedProfilePic)

       
      }
      const newUser={
        ...formdata,profilePic: updatedProfilePic,
      }

      const response = await axios.post(
        'http://localhost:8000/api/auth/register',
        newUser
      );

      if (response.status === 201) {
        navigate('/login');
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };


  return (
    <div className="register">
      <h2>Register</h2>
      <form className="regform" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formdata.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formdata.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formdata.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formdata.password}
          onChange={handleInputChange}
          required
        />
        <select
          className="selectrooom"
          name="selectedroom"
          value={formdata.selectedroom}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files[0])} // Update the profilePic state directly
        />
        <button className="button" type="submit">
          Register
        </button>
        <Link to="/roomreg" className="Link">
          Register for a new room
        </Link>
      </form>
    </div>
  );
};
