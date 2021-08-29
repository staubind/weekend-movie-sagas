import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function MovieDetail() {
    const genres = useSelector(store => store.genres);
    const id = useParams();
    const movie = useSelector(store => store.movies[id]); // but how to use particular one??
    
    useEffect(() => {
        console.log('id in movie detail is: ', id);
        console.log('movie in movie detail is: ', movie);
        console.log('genres in movie detail is: ', genres)
    }, [])

    return (
        <>
        <h1>{movie}</h1>
        <ul>
            {genres.map(genre => {
            console.log('this genre is: ', genre)
            return (<li>{genre}</li>);
            })}
        </ul>
        </>
    );
};

export default MovieDetail;