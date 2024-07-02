//In this component, you'll design the layout and include form fields for username/email and password.
import { useState, useEffect, useContext } from 'react';
import { baseUrl } from '../shared';
import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../App';

export default function Register() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            setLoggedIn(true)
            navigate('/employees')
        }
    }, [navigate, loggedIn, setLoggedIn]);

    function handleLogin(e) {
        e.preventDefault();

        const url = baseUrl + 'api/register';
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, username: username, password: password }) })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to obtain token');
                } else {
                    navigate('/login')
                }
            })
            .catch((e) => {
                // console.log(e);
                setError(e.message);
            })
    }

    return (
        <div className="centered-div">
            <h2>Register New User</h2>
            {error && <p>{error}</p>}
            <form className="m-2 w-full max-w-sm" onSubmit={handleLogin}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="md:w-3/4">
                        <input
                            className="p-1"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                        <label htmlFor="username">Username:</label>
                    </div>
                    <div className="md:w-3/4">
                        <input
                            className="p-1"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="md:w-3/4">
                        <input
                            className="p-1"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 mx-4 rounded">Register</button>
                <Link className="m-2 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" to='/login'>← Return to Login</Link>
            </form >
        </div >
    );
}