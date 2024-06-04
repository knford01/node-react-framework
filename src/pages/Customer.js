import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from '../pages/NotFound_404';
import { baseUrl } from '../shared';

export default function Customer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState();
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

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
                }
                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer);
            })
    }, [id]);

    const error = 'Customer with id ' + id + ' was not found';

    return (
        <>
            {notFound ? <NotFound error={error} /> : null}
            {customer ? (
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                </div>
            ) : null}
            <Link to='/customers'>Return to Customers</Link>
        </>
    )
}

