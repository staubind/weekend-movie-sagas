import {useSelector} from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button'

function MovieDetail() {
    const history = useHistory();
    const genres = useSelector(store => store.genres);
    const id = Number(useParams().id); 
    // grab the movie object that has the id we want
    const movie = useSelector(store => (store.movies.filter(element => element.id === id)[0])); 
    
    useEffect(() => {
    }, [])

    return (
        <>
        <Button variant="contained" onClick={() => history.push('/')}>Back to List</Button>
        <h1>{movie.title}</h1>
        <img src={movie.poster} />
        {/* list out the movies details */}
        <ul>
            {genres.map((genre, i) => <li key={i}>{genre}</li>)}
        </ul>
        <p>{movie.description}</p>
        </>
    );
};

export default MovieDetail;