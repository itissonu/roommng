import React, { useEffect, useState } from 'react';
import './sidebar.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [members, setMembers] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) return;

        const userResponse = await axios.get(`http://localhost:8000/api/user/${userId}`);
        const selectedRoomId = userResponse.data.selectedroom;

        const membersResponse = await axios.get(`http://localhost:8000/api/user/userbyroom/${selectedRoomId}`);
        const membersData = membersResponse.data;

        // Fetch and update the total amount for each member
        const updatedMembersData = await Promise.all(
          membersData.map(async (member) => {
            const totalAmountResponse = await axios.get(`http://localhost:8000/api/expense/user-expenses-total/${member._id}`);
           
            const totalAmount = totalAmountResponse.data.totalAmount;
            return { ...member, totalAmount };
          })
        );

        setMembers(updatedMembersData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="sidebar">
      <div className="sidebardiv">
        <span className="heading">Member</span>
        {members.length > 0 ? (
          members.map((member, index) => (
            <div className="member" key={index}>
              <img src={member.profilePic} alt="" />
              <span className="membername">{member.name}</span>
              <span className="membermoney"> &#8377; {member.totalAmount}</span>
              <Link to={`/user/${member._id}`}>
                <button className="sidebrbtn">View</button>
              </Link>
            </div>
          ))
        ) : (
          <div>No members found.</div>
        )}
      </div>
    </div>
  );
};
