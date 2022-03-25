import React from 'react'
import { NavLink } from 'react-router-dom';
import MiniGameList from './../../config/minigame'
import './Minigame.css'

const Event = () => {
    const minigameList = MiniGameList.map(games => {
        return (
            <div key={games.name}>
                <NavLink className='MinigameLink' to={`/event/${games.link}`}>
                    <div className="MinigameCard">
                        <h3 className="MinigameName">{games.name}</h3>
                        <img className="MinigameImg" src={`/images/games/${games.img}`} alt={games.name} />
                    </div>
                </NavLink>
            </div>
        )   
    })

    return (
        <div className='MiniGamePage'>
            <h1 className="MiniGameTitle">Mini Game</h1>
            <div className="MiniGame">
                {minigameList}
            </div>
        </div>
    )
}

export default Event