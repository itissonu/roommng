import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userexpbody.css';
import { useParams } from 'react-router-dom';
export const Userexpbody = () => {
  const [userExpenses, setUserExpenses] = useState([]);
  const[user,setUser]=useState('')
 
  const { userId } = useParams();
  const [viewedImage, setViewedImage] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedExpense, setEditedExpense] = useState(null);

  useEffect(() => {
    // Fetch user expenses when the component mounts
    fetchUserExpenses();
  }, []);
 // console.log(userId)
  const fetchUserExpenses = async () => {
    try {
      const userResponse=await axios.get(`http://localhost:8000/api/user/${userId}`)
      setUser(userResponse.data.name)
      //console.log(user)
      const response = await axios.get(`http://localhost:8000/api/expense/user-expenses/${userId}`);
      const expensesData = response.data;
      
      setUserExpenses(expensesData);
    } catch (error) {
      console.error('Error fetching user expenses:', error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };
  
  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:8000/api/expense/delete-expense/${userId}/${expenseId}`);
      // Remove the deleted expense from state
      setUserExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };
  const handleCloseImage = () => {
    setViewedImage(null);
  };
  const handleViewImage = (imageURL) => {
    setViewedImage(imageURL);
  };
  const openEditModal = (expense) => {
    setEditedExpense(expense);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
    setEditedExpense(null);
  };
 // console.log(editedExpense);
  const handleEditExpense = async (editedData) => {
    try {
    
      
      await axios.put(`http://localhost:8000/api/expense/edit/${userId}/${editedExpense._id}`, editedExpense);

      
      closeEditModal();
      fetchUserExpenses();
    } catch (error) {
      console.error('Error editing expense:', error);
    }
  };

  return (
    <div className='userexpbody'>
      <div className='userexpheader'>
        <h1 style={{ textAlign: 'center'}}>{user}</h1>
        {userExpenses.map((expense) => (
          <div className='expensecards' key={expense._id}>
            <div className='topcard'>
              <div>
                <span className='status'>checked</span>
                <input type='checkbox' />
              </div>
              <input type='button' value='View Image' onClick={() => handleViewImage(expense.photo)}/>
            </div>
            <div className='experdesc'>
              <span className='descspan'>Description</span>
              <span className='descspandetails'>{expense.description}</span>
            </div>
            <div className='bootomcard'>
              <div className='expdate'>Date:  {formatDate(expense.date)}</div>
              <div className='expamnt'>Amount: ${expense.amount}</div>
              <div className='btnofuserexp'>
              <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
              <button onClick={() => openEditModal(expense)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
        {viewedImage && (
          <div className='viewedImage'>
            <img src={viewedImage} alt='Viewed Expense' />
            <button onClick={handleCloseImage}>Close</button>
          </div>
        )}
        {editModalVisible && (
  <div className='editModal'>
    <h2>Edit Expense</h2>
    <form onSubmit={(e) => handleEditExpense(e)}>
      <div className='form-group'>
        <label htmlFor='editDescription'>Description:</label>
        <input
          type='text'
          id='editDescription'
          value={editedExpense.description}
          onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='editAmount'>Amount:</label>
        <input
          type='number'
          id='editAmount'
          value={editedExpense.amount}
          onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='editDate'>Date:</label>
        <input
          type='date'
          id='editDate'
          value={editedExpense.date}
          onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
          
        />
      </div>
      <div className='form-group'>
        <label htmlFor='editPhoto'>Photo (Upload):</label>
        <input
          type='file'
          id='editPhoto'
          onChange={(e) => setEditedExpense({ ...editedExpense, photo: e.target.files[0] })}
          accept='image/*'
        />
      </div>
      <button type='submit'>Save Changes</button>
      <button type='button' onClick={closeEditModal}>Cancel</button>
    </form>
  </div>
)}

      </div>
    </div>
  );
};
