import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from '../pages/NotFound_404';
import { baseUrl } from '../shared';

export default function Customer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [notFound, setNotFound] = useState(false);
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        // console.log('customer', customer);
        // console.log('temp customer', tempCustomer);
        compareObjects();
    })

    //This is where you will initally get the customer information\\
    useEffect(() => {
        const url = baseUrl + 'api/customers/' + id;

        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    //Two was to handle this error\\
                    //redirect to a 404 page (New URL)\\
                    // navigate('/404');
                    //render 404 componenet\\
                    setNotFound(true);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data !== undefined) {
                    setCustomer(data.customer);
                    setTempCustomer(data.customer);
                } else {
                    setNotFound(true);
                }
            })
    }, [id]);

    function updateCustomer() {
        const url = baseUrl + 'api/customers/' + id;
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tempCustomer) })
            .then((response) => { if (!response.ok) throw new Error('Failed to update customer'); return response.json(); })
            .then((data) => { setChanged(false); setCustomer(data.customer); setError(undefined); console.log(data); })
            .catch((e) => {
                // console.log(e);
                setError(e.message);
            })
    }

    function compareObjects() {
        if (JSON.stringify(customer) === JSON.stringify(tempCustomer)) {
            setChanged(false);
        }
    }

    const error_msg = 'Customer with id ' + id + ' was not found';
    return (
        <>
            {notFound ? <NotFound error={error_msg} /> : null}
            {customer ? (
                <div>
                    {/* ID: <input className="m-2 block px-2" type="text" value={tempCustomer.id} /> */}
                    Name: <input className="m-2 block px-2" type="text" value={tempCustomer.name} onChange={(e) => { setChanged(true); setTempCustomer({ ...tempCustomer, name: e.target.value }) }} />
                    Contact: <input className="m-2 block px-2" type="text" value={tempCustomer.contact} onChange={(e) => { setChanged(true); setTempCustomer({ ...tempCustomer, contact: e.target.value }) }} />
                    {changed ?
                        <>
                            <button className="mx-2" onClick={() => { setTempCustomer({ ...customer }); setChanged(false) }}>
                                Cancel
                            </button>
                            <button className="mx-2" onClick={updateCustomer}>
                                Save
                            </button></>
                        : null
                    }

                    <button onClick={(e) => {
                        const url = baseUrl + 'api/customers/' + id;

                        fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error('Something went wrong');
                                }
                                navigate('/customers');
                            })
                            .catch((e) => {
                                setError(e.message);
                                // console.log(e);
                            })
                    }}>Delete</button >
                </div>
            ) : null}

            {error ? <p>{error}</p> : null}

            <br />

            <Link to='/customers'>Return to Customers</Link>
        </>
    )
}

