import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import {Link, useHistory} from 'react-router-dom';
function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            {/* <Link to={`/details/${movie.id}`}> */}
                            <img onClick={() => {
                                dispatch({
                                    type: 'FETCH_MOVIE',
                                    payload: movie
                                })
                                history.push(`/details/${movie.id}`)
                            }} src={movie.poster} alt={movie.title}/>
                            {/* </Link> */}
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;