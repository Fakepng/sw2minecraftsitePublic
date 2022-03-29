import React from 'react'
import { NavLink } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {

  return (
    <div className="Dashboard">
      <p className="dashboardTitle">Dashboard</p>
      <div className="dashboardSelect">
        <NavLink className="dashboardSelector" to='/admin/register' >Register</NavLink>
        <NavLink className="dashboardSelector" to='/admin/event' >Event</NavLink>
      </div>
    </div>
  )
}

export default Dashboard