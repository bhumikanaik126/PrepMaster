import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginComponent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.status === 404) {
                setMessage("User not found, redirecting to sign up...");
                setTimeout(() => {
                    navigate('/users/signup');
                }, 1500); // Redirect after 1.5 seconds

            } else if (response.ok) {
                setMessage(data.message);
                // Add logic for successful login, e.g., saving tokens, redirecting, etc.
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className='bg-sky-200 space-y-4 p-5 rounded-md shadow-md m-10 w-72'>
            <p className='font-semibold text-lg text-center'>Login Page</p>

            <div>
                <p>Username</p>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className='border rounded-md shadow-md w-full p-2'
                />
            </div>
            <div>
                <p>Email</p>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className='border rounded-md shadow-md w-full p-2'
                />
            </div>
            <div>
                <p>Password</p>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className='border rounded-md shadow-md w-full p-2'
                />
            </div>
            <button
                onClick={handleSubmit}
                className='bg-blue-600 px-4 py-2 rounded-md shadow-md text-white w-full'
            >
                Login
            </button>
            {message && <p className='text-center text-red-600'>{message}</p>}
            <div className='text-center mt-4'>
                <span className='text-sm text-gray-600'>Don't have an account? </span>
                <span
                    onClick={() => navigate("/users/signup")}
                    className='text-blue-600 cursor-pointer'
                >
                    Sign up here
                </span>
            </div>
        </div>
    );
}
