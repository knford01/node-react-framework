import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { LoginContext } from '../App';
import { baseUrl } from '../shared';

import User from "../components/User";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";

export default function Users() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [tempUser, setTempUser] = useState();
    const [show, setShow] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        // console.log('Fetching Users...');
        const url = baseUrl + 'api/users/';
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
            .then((response) => {
                if (response.status === 401) {
                    setLoggedIn(false);
                    navigate('/login', {
                        state: {
                            previousURL: location.pathname
                        }
                    });
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data !== undefined) {
                    setUsers(data.users);
                    // console.log(data);
                }
            })
    }, [navigate, location, setLoggedIn]);

    function updateUser(id, newFName, newLName, newEmail, newImage) {
        const url = baseUrl + 'api/users/' + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify(tempUser)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update user');
                } else if (response.status === 401) {
                    setLoggedIn(false);
                    navigate('/login', {
                        state: {
                            previousURL: location.pathname
                        }
                    });
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setUser(data.user);
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
                // setError(e.message);
            })
    }

    function addUser(id, newFName, newLName, newEmail, newImage) {
        const data = { first_name: newFName, last_name: newLName, email: newEmail, image: newImage }
        const url = baseUrl + 'api/users/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                // console.log(data);
                // setUsers(data.users);
                toggleShow();
                setUsers([...users, data.user]);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div className="">
            <div className="flex flex-wrap justify-center my-2">
                {users.map((user) => {
                    const editUser = (
                        <EditUser
                            id={user.id}
                            fname={user.first_name}
                            lname={user.last_name}
                            email={user.email}
                            image={user.image}
                            updateUser={updateUser}
                        />
                    );
                    return (
                        <User
                            key={user.id}
                            id={user.id}
                            name={user.first_name + ' ' + user.last_name}
                            email={user.email}
                            image={user.image}
                            editUser={editUser}
                        />
                    );
                })}
            </div>
            <AddUser addUser={addUser} />
        </div >
    );
}
