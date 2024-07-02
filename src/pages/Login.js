//In this component, you'll design the layout and include form fields for username/email and password.
import { useState, useEffect, useContext } from 'react';
import { baseUrl } from '../shared';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../App';

export default function Login() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate('/employees')
        }
    }, [navigate, loggedIn]);

    function handleLogin(e) {
        e.preventDefault();

        const url = baseUrl + 'api/token/';
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: username, password: password }) })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to obtain token');
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                // console.log(data);
                if (data !== undefined) {
                    localStorage.setItem('access', data.access)
                    localStorage.setItem('refresh', data.refresh)
                    setError(undefined);
                    setLoggedIn(true);
                    // console.log(localStorage);
                    // console.log(loggedIn);

                    if (location?.state?.previousURL === null || location?.state?.previousURL === undefined) {
                        navigate('/employees')
                    } else {
                        navigate(location.state.previousURL)
                    }
                } else {
                    setError('Login response undefined');
                }
            })
            .catch((e) => {
                // console.log(e);
                setError(e.message);
            })
    }

    return (
        <div className="centered-div">
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form className="m-2 w-full max-w-sm" onSubmit={handleLogin}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                        <label>Username:</label>
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
                        <label>Password:</label>
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
                <button type="submit" className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 mx-4 rounded">Login</button>
                <Link className="m-2 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" to='/register'>Register</Link>
            </form >
        </div >
    );
}