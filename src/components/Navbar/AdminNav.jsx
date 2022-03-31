import React, { useState } from 'react'
import './Navbar.css';
import Countdown from './../Countdown';
import Darkmode from './../Darkmode';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const AdminNav = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        alert('Logout success');
    }

    return (
        <>
            <div className="navbardiv">
                <NavLink className="navlogo" to="/" exact='true'><img src="/images/SW2VWLogo.svg" height="60px" alt="Sw2"/></NavLink>
                <Countdown countdownTimestampMs={1646365200000}/>
                <header className="navbar">
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/' exact='true'>Home</NavLink></div>
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/gallery'>Gallery</NavLink></div>
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/skin'>Skin</NavLink></div>
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/event'>Event</NavLink></div>
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/team'>Team</NavLink></div>
                    <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/admin/dashboard'>Dashboard</NavLink></div>
                    <div className="navbox"><NavLink className="navlink" onClick={handleLogout} to='/' exact='true'>Logout</NavLink></div>
                    {/* <div className="navbox"><NavLink className="navlink" activeclassname="active" to='/contact'>Contact</NavLink></div> */}
                    <Darkmode />
                </header>
                <div className='MobileDiv' onClick={handleClick}>{
                    click ? <AiOutlineClose className='MobileBar' /> : <FaBars className='MobileBar' />
                }</div>
            </div>
            <div className={click ? 'Mobile' : 'MobileClose'}>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/' exact='true'>Home</NavLink>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/gallery'>Gallery</NavLink>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/skin'>Skin</NavLink>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/event'>Event</NavLink>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/team'>Team</NavLink>
                <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/admin/dashboard'>Dashboard</NavLink>
                <NavLink className="mobilelink" onClick={() => { handleClick(); handleLogout(); }} to='/' exact='true'>Logout</NavLink>
                {/* <NavLink className="mobilelink" onClick={handleClick} activeclassname="active" to='/contact'>Contact</NavLink> */}
                <div className="mobilelink" onClick={handleClick}>
                    <Darkmode />
                </div>
            </div>
        </>
    )
}

export default AdminNav