import React, { useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aesjs from 'aes-js'
import config from '../../../config/config.json'
import '../Admin.css'

const Admin = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
        }

        const key = config.AES_KEY;
        const passwordBytes = aesjs.utils.utf8.toBytes(password);
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        const encryptedBytes = aesCtr.encrypt(passwordBytes);
        const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

        axios.post(`${config.API}/admin/register`, { user, password: encryptedHex }).then((response) => {
            setLoading(false);
            alert(`Welcome ${response.data.user}`);
            navigate('/admin/dashboard');
        })
    }

    return (
        <>  
            <form onSubmit={handleSubmit} className="register">
            <p className="adminRegisterTitle" >Register New Admin User</p>
                <label>Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={user || ""}
                        className="adminUser"
                        onChange={(e) => setUser(e.target.value)}
                    />
                <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={password || ""}
                        className="adminPass"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <label>Confirm Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={confirmPassword || ""}
                        className="adminPass"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                { loading ? <input type="submit" className="disable adminSub" disable="true" /> : <input className="adminSub" type="submit" /> }
            </form>
        </>
    )
}

export default Admin