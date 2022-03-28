import React, { useState } from 'react'
import axios from 'axios';
import config from '../../../config/config.json'
import './Event.css'

const EventQuery = () => {
    const [eventQuery, setEventQuery] = useState([]);
    const [eventQueryLoading, setEventQueryLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

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

    const queryList = eventQuery.map(query => {
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
                    { deleting ? <button>Deleting</button> : <button onClick={() => handleDelete(query._id)}>Delete</button> }
                </td>
            </tr>
        )
    })

    return (
        <div className="eventQuery">
            <button onClick={() => handleQuery()}>Query</button>
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
                    </tr>
                </thead>
                <tbody>
                    { eventQueryLoading ? <tr><td>Loading...</td></tr> : queryList }
                </tbody>
            </table>
        </div>
    )
}

export default EventQuery