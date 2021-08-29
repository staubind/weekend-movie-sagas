import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


// nothing shows up for this????
function MovieDetail() {
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
        <h1>SFASDFASDFASDF</h1>     
        <h1>{movie.title}</h1>
        <img src={movie.poster} />
        <ul>
            {genres.map(genre => {
            console.log('this genre is: ', genre)
            return (<li>{genre}</li>);
            })}
        </ul>
        <p>{movie.description}</p>
        </>
    );
};

export default MovieDetail;