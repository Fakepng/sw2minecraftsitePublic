import React, { useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aesjs from 'aes-js'
import config from '../../config/config.json'

const Admin = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const key = config.AES_KEY;
        const passwordBytes = aesjs.utils.utf8.toBytes(password);
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        const encryptedBytes = aesCtr.encrypt(passwordBytes);
        const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        
        axios.post(`${config.API}/admin/login`, { user, password: encryptedHex }).then((response) => {
            setLoading(false);
            localStorage.setItem('accessToken', response.data.token);
            alert(`Welcome ${response.data.user}`);
            navigate('/admin/dashboard');
        })
    }

    const handleLogout = () => {
        setLoading(false);
        localStorage.removeItem('accessToken');
        alert('Logout success');
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="register">
                <label>Username:
                    <input
                        type="text"
                        name="username"
                        value={user || ""}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </label>
                <label>Password:
                    <input
                        type="password"
                        name="password"
                        value={password || ""}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                { loading ? <input type="submit" className="disable" disable="true" /> : <input type="submit" /> }
                <button onClick={handleLogout}>Logout</button>
            </form>
        </>
    )
}

export default Admin