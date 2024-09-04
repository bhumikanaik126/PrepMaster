import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignupComponent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Signup successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 1500); // Redirect after 1.5 seconds
            } else {
                setMessage(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className='bg-sky-200 space-y-4 p-5 rounded-md shadow-md m-10 w-72'>
            <p className='font-semibold text-lg text-center'>Sign Up</p>

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
                Sign Up
            </button>
            {message && <p className='text-center text-red-600'>{message}</p>}
            <div className='text-center mt-4'>
                <span className='text-sm text-gray-600'>Already have an account? </span>
                <span
                    onClick={() => navigate("/login")}
                    className='text-blue-600 cursor-pointer'
                >
                    Log in here
                </span>
            </div>
        </div>
    );
}
