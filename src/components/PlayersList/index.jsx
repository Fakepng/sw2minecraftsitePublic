import React, { useState, useEffect } from 'react'
import './PlayersList.css'

const PlayerList = () => {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [reload, setReload] = useState(false);
    const [isError, setError] = useState(false);

    async function getPlayers() {
        const response = await fetch("API");
        const responseJson = await response.json();
        if (responseJson.error) {
            setError(true);
        } else {
            setPlayers(responseJson.players);
        }
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        setReload(false);
        if (!reload) {
            setError(false);
            getPlayers();
        }
    }, [reload]);

    const playersList = players.map(player => {
        return (
            <div className="PlayerCard" key={player}>
                <h3 className="PlayerName">{player}</h3>
                <img className="PlayerImg" src={`https://minotar.net/avatar/${player}/100.png`} alt={player} />
            </div>
        )
    })

    return (
        loading ? <div className="Player">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div> :
            <> {isError ? <div className="Errormessage">
                <h1>Server is offline</h1>
                <button className="reloadbutton" onClick={() => setReload(true)}>Reload</button>
            </div> :
                <>
                    {players.length > 0 ?
                        <>
                            <div>
                                <h1 className="centerandpadding">{players.length} online</h1>
                            </div>
                            <div className="Player">{playersList}</div>
                            <div className="centerandpadding">
                                <button className="reloadbutton" onClick={() => setReload(true)}>Reload</button>
                            </div>
                        </> :
                        <>
                            <div>
                                <h1 className="centerandpadding">No player is online</h1>
                            </div>
                            <div className="centerandpadding">
                                <button className="reloadbutton" onClick={() => setReload(true)}>Reload</button>
                            </div>
                        </>}
                </>}
            </>
    )
}

export default PlayerList