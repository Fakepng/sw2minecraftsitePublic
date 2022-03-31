import React, { useState } from 'react'
import axios from 'axios';
import config from '../../../config/config.json'
import minigame from '../../../config/minigame.json'
import './Event.css'

const EventQuery = () => {
    const [eventQuery, setEventQuery] = useState([]);
    const [eventQueryLoading, setEventQueryLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [filter, setFilter] = useState({ activity: 'all' });
    const [sortBy, setSortBy] = useState('date');
    const [sort, setSort] = useState('asc');
    const [search, setSearch] = useState('');
    const [hideCheck, setHideCheck] = useState(false);

    const handleQuery = () => {
        setEventQueryLoading(true);
        setEventQuery([]);
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

    const handleSortBy = (event) => {
        setSortBy(event.target.value);
    }

    const handleSort = (event) => {
        if (sort === 'asc') {
            setEventQuery(eventQuery.sortBy(sortBy));
        } else {
            setEventQuery(eventQuery.sortBy(sortBy).reverse());
        }
    }

    const handleCheck = async (event) => {
        const _id = event.target.name;
        const checked = event.target.checked;
        await axios.put(`${config.API}/user/check`, { _id, checked }).then((response) => {
            // handleQuery();
        })
    }

    const minigameList = minigame.map(game => {
        return <option key={game.link} value={game.link}>{game.name}</option>
    })

    const queryList = eventQuery.map(query => {
        if (filter.activity !== 'all') {
            if (filter.activity !== query.activity) return null;
        }

        if (search) {
            if (!(query.studentId.toLowerCase().includes(search.toLowerCase()) ||
                query.nameTH.toLowerCase().includes(search.toLowerCase()) ||
                query.nameEN.toLowerCase().includes(search.toLowerCase()) ||
                query.email.toLowerCase().includes(search.toLowerCase()) ||
                query.classroom.toLowerCase().includes(search.toLowerCase()) ||
                query.tel.toLowerCase().includes(search.toLowerCase()) ||
                query.username.toLowerCase().includes(search.toLowerCase()) ||
                query.activity.toLowerCase().includes(search.toLowerCase()))) return null;
        }
        if (hideCheck) {
            if (query.checked) return null;
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
                    <input type='checkbox' name={query._id} onChange={handleCheck} defaultChecked={query.checked} />
                </td>
            </tr>
        )
    })

    // eslint-disable-next-line
    Array.prototype.sortBy = function sortBy(p) {
        return this.slice(0).sort(function (a, b) {
            return (a[p].toLowerCase() > b[p].toLowerCase()) ? 1 : (a[p].toLowerCase() < b[p].toLowerCase()) ? -1 : 0;
        });
    }

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
                    <select name="sortBy" value={sortBy} onChange={handleSortBy}>
                        <option value="date">Time</option>
                        <option value="studentId">Student ID</option>
                        <option value="nameTH">Name TH</option>
                        <option value="nameEN">Name EN</option>
                        <option value="email">email</option>
                        <option value="classroom">Classroom</option>
                        <option value="tel">Tel</option>
                        <option value="username">Username</option>
                        <option value="activity">Activity</option>
                    </select>
                    {sort === 'desc' ? <button onClick={() => setSort('asc')}>Desc</button> : <button onClick={() => setSort('desc')}>Asc</button>}
                    <button onClick={() => handleSort()}>Sort</button>
                    {hideCheck ? <button onClick={() => setHideCheck(false)}>Show Check</button> : <button onClick={() => setHideCheck(true)}>Hide Check</button>}
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={search || ""}
                        onChange={(e) => setSearch(e.target.value)}
                    />
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