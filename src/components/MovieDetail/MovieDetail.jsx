import {useSelector} from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

// nothing shows up for this????
function MovieDetail() {
    const history = useHistory();
    const genres = useSelector(store => store.genres);
    const index = Number(useParams().id) - 1; // - 1
    const movie = useSelector(store => store.movies[index]); // but how to use particular one??
    
    useEffect(() => {
        console.log('id in movie detail is: ', index);
        console.log('movie in movie detail is: ', movie);
        console.log('genres in movie detail is: ', genres);
    }, [])

    return (
        <>
        <button onClick={() => history.push('/')}>Back to List</button>
        <h1>{movie.title}</h1>
        <img src={movie.poster} />
        <ul>
            {genres.map(genre => <li>{genre}</li>)}
        </ul>
        <p>{movie.description}</p>
        </>
    );
};

export default MovieDetail;