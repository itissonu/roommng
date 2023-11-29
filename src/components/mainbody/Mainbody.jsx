import React, { useEffect, useState } from 'react'
import './mainbody.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
export const Mainbody = ({ totalAmount, setTotalAmount }) => {
  const [photo, setPhoto] = useState(null);
  const [info, setInfo] = useState({
    description: '',
    amount: '',  
  });
  const [name,setname]=useState({})
  const [amount,setamount]=useState('')
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState('');

  const [expenses, setExpenses] = useState([]); // State to store expenses
 
  useEffect(() => {
    // Fetch expenses when the component mounts
    fetchExpenses()
  }, []);

  const fetchExpenses = async () => {
    const userId = localStorage.getItem('userId');
    const selectedRoomId = userId.selectedroom;
    console.log(selectedRoomId)
    try {
      const response = await axios.get(`http://localhost:8000/api/expense/user-expenses/${userId}`);
      const expensesData = response.data;
      const userResponsedata = await axios.get(`http://localhost:8000/api/user/${userId}`);
      setname(userResponsedata.data)
      const totalAmountResponse = await axios.get(`http://localhost:8000/api/expense/user-expenses-total/${userId}`)
      setamount(totalAmountResponse.data.totalAmount)
     
      setExpenses(expensesData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };
  const handleChange = (e) => {
    if (e.target.id === 'date') {
      
      const selectedDate = new Date(e.target.value);
      setDate(selectedDate, () => {
        console.log(date); // Log the updated date value
      });
    }else {
     
      setInfo((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };
  const handleSubmit =async (e) => {
   
   
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "upload"); 
    const userid = localStorage.getItem('userId');
    console.log(date)
  try {
    const uploadRes =await axios.post(
      "https://api.cloudinary.com/v1_1/dbsonu270/image/upload",
       data)
       const { url } = uploadRes.data;
       const userResponse = await axios.get(`http://localhost:8000/api/user/${userid}`);
       const selectedRoomId = userResponse.data.selectedroom;
       setname(userResponse.data)
       
       const newUser = {
        description: info.description,
        amount: info.amount,
        date: date, 
        photo: url,
        selectedroom: selectedRoomId,
      };
     
      await axios.post(`http://localhost:8000/api/expense/add-expense/${userid}`, newUser);
      window.location.reload();
      setSuccessMessage('Expense added successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
  } catch (error) {
    console.log(error)
  }finally {
    setLoading(false); 
  }

  };

  return (
    <div className='mainbody'>
      <div className='top'>
    <div className='left'>
   <div className='ownprof'>
    <img  className='profimg' src={name.profilePic} alt=''/>
    <span className='profname'>{name.name}</span>
   </div>
    </div>
    <div className='right'>
     <span className='curtime'>Date:- 12-12-2000</span>
     <div className='lower'>
      <span className='owntotal'> Total = ${amount}</span>
      <Link to={`/user/${name._id}`}>
                <button className="owndetbtn">View</button>
              </Link>
     </div>
    </div>
      </div>
      <div className='botttom'>
      <h2>Add Expense</h2>
      {loading && <Loader />}
      {successMessage && <div className='success-message'>{successMessage}</div>}
        <form  className='expnseform' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='description'>Description:</label>
            <input
              type='text'
              id='description'
              value={info.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='amount'>Amount:</label>
            <input
              type='number'
              id='amount'
              value={info.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Date:</label>
            <input
              type='date'
              id='date'
              value={info.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='photo'>Photo (Upload):</label>
            <input
              type='file'
              id='photo'
              onChange={(e) => setPhoto(e.target.files[0])}
              accept='image/*' 
            />
          </div>
          <button className='addexpbtn' type='submit'>Add Expense</button>
        </form>
      </div>
    </div>
  )
}
