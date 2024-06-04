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
        <div className="p-3">
            {notFound ? <NotFound error={error_msg} /> : null}
            {customer ? (
                <div>
                    {/* ID: <input className="m-2 block px-2" type="text" value={tempCustomer.id} /> */}
                    <form className="w-full max-w-sm" id="customer" onSubmit={updateCustomer}>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label htmlFor='name'>Name:</label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    id="name"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none bg-white focus:border-purple-500"
                                    type="text"
                                    value={tempCustomer.name}
                                    onChange={(e) => { setChanged(true); setTempCustomer({ ...tempCustomer, name: e.target.value }) }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label htmlFor='contact'>Contact:</label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    id="contact"
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none bg-white focus:border-purple-500"
                                    type="text"
                                    value={tempCustomer.contact}
                                    onChange={(e) => { setChanged(true); setTempCustomer({ ...tempCustomer, contact: e.target.value }) }}
                                />
                            </div>
                        </div>
                    </form>

                    <button
                        className="m-2 bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => {
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
                        }}>Delete
                    </button >

                    {changed ?
                        <>
                            <button className="m-2 bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded" onClick={() => { setTempCustomer({ ...customer }); setChanged(false) }}>
                                Cancel
                            </button>
                            <button form="customer" className="m-2 bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                Save
                            </button>
                        </>
                        : null
                    }
                </div>
            ) : null}

            {error ? <p>{error}</p> : null}

            <br />

            <Link className="m-2 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" to='/customers'>← Return to Customers</Link>
        </div>
    )
}

