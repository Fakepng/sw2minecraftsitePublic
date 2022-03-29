import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AdminNav from './components/Navbar/AdminNav'
import Footer from './components/Footer'
import Home from './Pages/Home'
import Gallery from './Pages/Gallery'
import Skin from './Pages/Skin'
import Event from './Pages/Event'
import Games from './Pages/Event/Game'
import Team from './Pages/Team'
import Register from './Pages/Register'
import Contact from './Pages/Contact'
import FourOFour from './Pages/FourOFour'
import Render from './Pages/Render'
import SignIn from './Pages/Admin'
import Dashboard from './Pages/Admin/Dashboard'
import AdminRegister from './Pages/Admin/Register'
import EventQuery from './Pages/Admin/Event'
import { useJwt } from "react-jwt";

const App = () => {
  const token = localStorage.getItem("accessToken");
  const { isExpired } = useJwt(token);

  if (!token && isExpired) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/skin" element={<Skin />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/:id" element={<Games />} />
          <Route path="/team" element={<Team />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<SignIn />} />
          <Route path="*" element={<FourOFour />} status={404} />
        </Routes>
        <Footer />
      </>
    )
  }

  return (
    <>
      <AdminNav />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/skin" element={<Skin />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/:id" element={<Games />} />
          <Route path="/team" element={<Team />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/render" element={<Render />} />
          <Route path="/admin" element={<SignIn />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/event" element={<EventQuery />} />
          <Route path="*" element={<FourOFour />} status={404} />
        </Routes>
      <Footer />
    </>
  )
}

export default App