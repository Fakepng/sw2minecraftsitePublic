import React, { useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import axios from 'axios'
import aesjs from 'aes-js'
import config from '../../../config/config.json'
import '../Admin.css'

const Repass = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
        }

        const key = config.AES_KEY;
        const passwordBytes = aesjs.utils.utf8.toBytes(password);
        const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        const encryptedBytes = aesCtr.encrypt(passwordBytes);
        const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

        const newPasswordBytes = aesjs.utils.utf8.toBytes(newPassword);
        const newEncryptedBytes = aesCtr.encrypt(newPasswordBytes);
        const newEncryptedHex = aesjs.utils.hex.fromBytes(newEncryptedBytes);

        axios.put(`${config.API}/admin/repass`, { user, password: encryptedHex, newPassword: newEncryptedHex}).then((response) => {
            setLoading(false);
            alert(`Password reset successfully`);
            navigate('/admin/dashboard');
        })
    }

    return (
        <>  
            <form onSubmit={handleSubmit} className="register">
            <p className="adminRegisterTitle" >Change Password</p>
                <label>Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={user || ""}
                        className="adminUser"
                        onChange={(e) => setUser(e.target.value)}
                    />
                <label>Old Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={password || ""}
                        className="adminPass"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <label>New Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={newPassword || ""}
                        className="adminPass"
                        onChange={(e) => setNewPassword(e.target.value)}
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

export default Repass