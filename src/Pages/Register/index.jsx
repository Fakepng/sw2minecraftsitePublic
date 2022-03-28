import React, { useState } from 'react'
import axios from 'axios'
import config from '../../config/config.json'
import './Register.css'

const Register = () => {
    const [register, setRegister] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRegister(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!studentIdValidation()) return alert('Student ID is not valid');
        if (!emailValidation()) return alert('Please enter a valid email');
        if (!classroomValidation()) return alert('Please enter a valid classroom');
        if (!telValidation()) return alert('Please enter a valid phone number');
        setLoading(true);
        axios.post(`${config.API}/user/register`, register).then((response) => {
            setLoading(false);
            alert(response.data.message);
        })
    }

    function studentIdValidation() {
        const studentId = register.studentId;
        const studentIdRegEx = /^[0-9]{5}$/g;
        return studentIdRegEx.test(studentId);
    }

    function emailValidation() {
        const email = register.email;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; /* eslint-disable-line */
        return emailRegex.test(String(email).toLowerCase());
    }

    function classroomValidation() {
        const classroom = register.classroom;
        const classroomRegex = /^[1-6][01][0-9]$|^[1-6][/]([01]|[01][0-9])$/g; /* eslint-disable-line */
        return classroomRegex.test(String(classroom).toLowerCase());
    }

    function telValidation() {
        const tel = register.tel;
        const telRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g; /* eslint-disable-line */
        return telRegex.test(String(tel).toLowerCase());
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit} className="register">
                <label>Student ID:
                    <input
                        type="text"
                        name="studentId"
                        value={register.studentId || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>ชื่อ นามสกุล:
                    <input
                        type="text"
                        name="nameTH"
                        value={register.nameTH || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Name Surname:
                    <input
                        type="text"
                        name="nameEN"
                        value={register.nameEN || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Email:
                    <input
                        type="text"
                        name="email"
                        value={register.email || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Class:
                    <input
                        type="text"
                        name="classroom"
                        value={register.classroom || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Tel:
                    <input
                        type="text"
                        name="tel"
                        value={register.tel || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Username:
                    <input
                        type="text"
                        name="username"
                        value={register.username || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Activity:
                    <select name="activity" value={register.activity} onChange={handleChange}>
                        <option value="-">Select an Activity</option>
                        <option value="classroomBuild">Classroom Build</option>
                    </select>
                </label>
                <div>
                    { loading ? <input type="submit" className="disable" disable="true" /> : <input type="submit" /> }
                    <input onClick={() => setRegister({})} type="reset" value="Clear" />
                </div>
            </form>
        </div>

    )
}

export default Register