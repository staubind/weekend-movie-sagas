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
    // const movie = movies.filter(element => element.id===id)[0]
    
    useEffect(() => {
        console.log('id in movie detail is: ', id);
        console.log('movie in movie detail is: ', movie);
        console.log('genres in movie detail is: ', genres);
    }, [])

    return (
        <>
        <Button onClick={() => history.push('/')}>Back to List</Button>
        <h1>{movie.title}</h1>
        <img src={movie.poster} />
        <ul>
            {genres.map((genre, i) => <li key={i}>{genre}</li>)}
        </ul>
        <p>{movie.description}</p>
        </>
    );
};

export default MovieDetail;