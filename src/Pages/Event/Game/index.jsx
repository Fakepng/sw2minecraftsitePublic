import React from 'react'
import { useParams } from 'react-router-dom'
import './Game.css'

const Game = () => {
    const { id } = useParams()

    return (
        <div className='GamePage'>
            <h1 className="GameTitle">{id}</h1>
        </div>
    )
}

export default Game