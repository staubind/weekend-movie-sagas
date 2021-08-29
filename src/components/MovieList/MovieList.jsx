import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import {Link} from 'react-router-dom';
import MediaCard from '../MediaCard/MediaCard';



function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <h3>Don't see what you want? <Link to="/add">Add it!</Link></h3>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <MediaCard key={movie.id} movie={movie}  />
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;