import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function useFetch(url, { method, headers, body } = {}) {
    const [data, setData] = useState();
    const [errorStatus, setErrorStatus] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    function request() {
        fetch(url, {
            method: method,
            headers: headers,
            body: body,
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                if (!response.ok) {
                    throw response.status;
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((e) => {
                setErrorStatus(e);
            });
    }

    //This function allows user to add new data to DB\\
    function appendData(newData) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newData),
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }

                if (!response.ok) {
                    throw response.status;
                }

                return response.json();
            })
            .then((d) => {
                //Grab object being added to the array\\
                const submitted = Object.values(d)[0];

                //Duplicate exists state as new object in memory and push the new object onto that state then replace existing state with new object\\
                const newState = { ...data };
                Object.values(newState)[0].push(submitted);

                //new object, it's seen as a state change\\
                setData(newState);
            })
            .catch((e) => {
                console.log(e);
                setErrorStatus(e);
            });
    }

    //Add the ability to delete and update for practice\\

    return { request, appendData, data, errorStatus };
}