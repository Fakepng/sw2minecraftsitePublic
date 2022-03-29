import React, { useState } from 'react'
import axios from 'axios';
import config from '../../../config/config.json'
import minigame from '../../../config/minigame.json'
import './Event.css'

const EventQuery = () => {
    const [eventQuery, setEventQuery] = useState([]);
    const [eventQueryLoading, setEventQueryLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [filter, setFilter] = useState({activity: 'all'});
    const [sortBy, setSortBy] = useState('low-high');

    const handleQuery = () => {
        setEventQueryLoading(true);
        axios.get(`${config.API}/user/query`).then((response) => {
            setEventQueryLoading(false);
            setEventQuery(response.data);
        })
    }

    const handleDelete = (event) => {
        setDeleting(true);
        axios.delete(`${config.API}/user/query/${event}`).then((response) => {
            setDeleting(false);
            handleQuery();
        })
    }

    const handleFilter = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFilter(values => ({ ...values, [name]: value }))
    }

    const handleSort = (event) => {
        setSortBy(event.target.value)
        // if (event.target.value === 'low-high') {
        //     setEventQuery(eventQuery.sort((a, b) => a.price - b.price))
        // }
        console.log(event.target.value)
    }

    const handleCheck = (event) => {
        console.log(event)
    }

    const minigameList = minigame.map(game => {
        return <option key={game.link} value={game.link}>{game.name}</option>
    })

    const queryList = eventQuery.map(query => {
        if (filter.activity !== 'all' ) {
            if (filter.activity !== query.activity) return null;
        }

        return (
            <tr className="query" key={query._id}>
                <td>{query.studentId}</td>
                <td>{query.nameTH}</td>
                <td>{query.nameEN}</td>
                <td>{query.email}</td>
                <td>{query.classroom}</td>
                <td>{query.tel}</td>
                <td>{query.username}</td>
                <td>{query.activity}</td>
                <td>
                    {deleting ? <button>Deleting</button> : <button onClick={() => handleDelete(query._id)}>Delete</button>}
                    <input type='checkbox' onChange={() => handleCheck()} checked={query.checked} />
                </td>
            </tr>
        )
    })

    return (
        <div className="eventQuery">
            <p className="eventQueryTitle">Event Query</p>
            <div className="queryFunc" >
                <button className="queryBtn" onClick={() => handleQuery()}>Query</button>
                <div className="queryManage">
                    <select name="activity" value={filter.activity} onChange={handleFilter}>
                        <option value="all">All</option>
                        {minigameList}
                    </select>
                    <select name="sortBy" value={sortBy} onChange={handleSort}>
                        <option value="low-high">Low - High</option>
                        <option value="high-low">High - Low</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name TH</th>
                        <th>Name EN</th>
                        <th>Email</th>
                        <th>Classroom</th>
                        <th>Tel</th>
                        <th>Username</th>
                        <th>Activity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {eventQueryLoading ? <tr><td>Loading...</td></tr> : queryList}
                </tbody>
            </table>
        </div>
    )
}

export default EventQuery