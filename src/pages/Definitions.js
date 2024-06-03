import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from '../components/NotFound_404'
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition() {
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    const [word, setWord] = useState([]);

    let { search } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // const url = "https://httpstat.us/501";
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search
        fetch(url)
            .then((response) => {
                console.log(response.status);
                if (response.status === 404) {
                    setNotFound(true);
                } else if (response.status === 401) {
                    navigate('/Login');
                } else if (response.status === 500) {
                    setError(true);
                }

                if (!response.ok) {
                    setError(true);
                    throw new Error("Something went wrong");
                }

                return response.json();
            })
            .then((data) => {
                if (data[0] !== undefined) {
                    setWord(data[0].meanings);
                    // console.log(data);
                    // console.log(data[0].meanings);
                    // console.log(data[0].meanings[0].definitions[0]['definition']);
                } else {
                    setNotFound(true);
                }
            })
            .catch((e) => {
                console.log(e.message);
            })
    }, []);

    if (notFound === true) {
        return (
            <>
                <NotFound />
                <Link to='/dictionary'>Try a new search</Link>
            </>
        )
    }

    return (
        <>
            {word ? (
                <>
                    <h1>Here is the definition: </h1>
                    {word.map((meaning) => {
                        return (
                            <p key={uuidv4()}>
                                {meaning['partOfSpeech']}: {meaning.definitions[0]['definition']}
                            </p>
                        );
                    })}
                    <p>Search again:</p>
                    <DefinitionSearch />
                </>
            ) : null}
        </>
    );
}