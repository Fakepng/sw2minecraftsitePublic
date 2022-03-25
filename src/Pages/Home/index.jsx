import React from 'react'
import PlayersList from './../../components/PlayersList'
import './Home.css'

const Home = () => {
  return (
    <>
      <div className="Home">
        <h1>Satriwitthaya 2</h1>
        <h1>Virtual World</h1>
      </div>
      <div className="homeContent">
        <h2>SW2 Virtual คืออะไร</h2>
        <p>&emsp;&emsp;SW2 Virtual คือโลกเสมือนที่จำลองโรงเรียนสตรีวิทยา ๒ ในพระราชูปถัมภ์ฯ ไว้ในเกม Minecraft ด้วยขนาด 1:1 เมื่อเทียบกับขนาดจริง</p>
        <div className='serverip'>
          <p className='Version'>Version:</p><p className='VersionNo'>1.18.1&uArr;</p>
          <p className='java'>Java IP:</p><p className='javaip'>sw2.fakepng.com</p>
          <p className='bedrock'>Bedrock IP:</p><p className='bedrockip'>bedrock.fakepng.com</p>
          <p className='bedrockport'>Bedrock Port:</p><p className='bedrockPortno'>Ask contact@fakepng.com</p>
        </div>
        <PlayersList />
      </div>
    </>
  )
}

export default Home