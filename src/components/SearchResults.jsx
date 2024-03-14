const SearchResults = ({results}) => {
    const searchItems = results.map((result) => <li key={result.id}>{result.name}</li>);

    return (
        <>
            <ul>{searchItems}</ul>
        </>
    );
}

export default SearchResults;