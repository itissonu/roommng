import React, { useEffect, useState } from 'react'
import './home.css'
import { Navbar } from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Mainbody } from '../../components/mainbody/Mainbody'
export const Home = () => {
  const [totalAmount, setTotalAmount] = useState(0);

useEffect(() => {
 
  }, [totalAmount]);
  console.log(totalAmount);
 
  return (
    <div className='home'>
      <Navbar/>
      <Header/>
      <div className='mainbodycon'>
        <div className='sidecont'>
      <Sidebar/>
        </div>
        <div className='maincont'>
    <Mainbody  totalAmount={totalAmount} setTotalAmount={setTotalAmount}/>
        </div>
      </div>
      
    </div>
  )
}
