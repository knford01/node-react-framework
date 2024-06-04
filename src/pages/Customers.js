import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared';
import AddCustomer from '../components/AddCustomer';

function Customers() {
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        // console.log('Fetching Customers...');
        const url = baseUrl + 'api/customers/';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setCustomers(data.customers);
            })
    }, []);

    function newCustomer(name, contact) {
        const data = { name: name, contact: contact }
        const url = baseUrl + 'api/customers/';
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json();
            })
            .then((data) => {
                // console.log(data);
                // setCustomers(data.customers);
                toggleShow();
                setCustomers([...customers, data.customer]);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
            Here are our customers:
            {customers ?
                customers.map((customer) => {
                    return <div key={customer.id}><Link to={"/customers/" + customer.id}><button className='m-2 bg-purple-400 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded'>{customer.name}</button></Link></div>;
                })
                : null
            }
            <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
        </>
    )
}

export default Customers;