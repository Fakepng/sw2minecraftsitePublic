import React from 'react'
import  { NavLink } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {

  return (
    <div className="Dashboard">
      <p>Dashboard</p>
      <NavLink to='/admin/register' >Register</NavLink>
      <NavLink to='/admin/event' >Event</NavLink>
      <NavLink to='/admin' >Back</NavLink>
    </div>
  )
}

export default Dashboard