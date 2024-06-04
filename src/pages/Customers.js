import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { baseUrl } from '../shared';

function Customers() {
    const [customers, setCustomers] = useState();
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
    return (
        <>
            Here are our customers:
            {customers ?
                customers.map((customer) => {
                    return <p key={uuidv4()}><Link to={"/customers/" + customer.id}>{customer.name}</Link></p>;
                })
                : null}
        </>
    )
}

export default Customers;