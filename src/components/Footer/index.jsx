import React from 'react'
import './Footer.css'
import dayjs from 'dayjs'

const Footer = () => {
  let year = dayjs().format('YYYY')

  return (
    <div className="Footer">
      <p>Created by <a href="https://fakepng.com">นายกฤษณ์ เกษมเทวินทร์</a></p>
      <p>Copyright &copy; {year} SW2 Virtual World</p>
      <p>Educational Purpose</p>
    </div>
  )
}

export default Footer