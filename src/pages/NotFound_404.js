export default function NotFound(props) {
    return (
        <>
            {props.error ? <p>{props.error}</p> : <p>Error: Page Not Found.</p>}
        </>
    );
}