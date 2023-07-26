import '../css/myStyle.css';
import React, { useState } from 'react';
import { useAuth } from '../authcontext';

const Login = () => {
    const [password, setPassword] = useState('');
    const { setLoggedIn, setToken } = useAuth();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Send login credentials to the backend
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                // Handle login error
                throw new Error('Login failed');
            }

            const data = await response.json();

            setToken(data.token);
            setLoggedIn(true);

            /*
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            */

            // Redirect or show a success message
            console.log('Login successful!');
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
        }
    };

    return (
        <label>
            <form onSubmit={handleLogin}>
                <input type="password" value={password} onChange={handlePasswordChange} placeholder='Password' />
                <input type="submit" value="Login" />
            </form>
        </label>
    );
};

export default Login;