import React from 'react'
import './userexp.css'
import { Navbar } from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Userexpbody } from '../../components/userexpbody/Userexpbody'
export const UserExp = () => {
  return (
    <div className='userexpdiv'>
      <Navbar/> 
      <Header/>
     
      
      <div className='mainbodycon'>
     
        
        <div className='maincont'>
        <Userexpbody/>
        </div>
      </div>

    </div>
  )
}
