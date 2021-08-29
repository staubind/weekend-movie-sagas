import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function AddMovie() {
    const dispatch = useDispatch();
    const allGenres = useSelector(store => store.allGenres);
    const history = useHistory();
    // probably could clean up the two state vars into one, but it's easier to read, I think as it is
    const [movie, setMovie] = useState({title: '', description: '', poster: '', });
    const [movieGenres, setMovieGenres] = useState([]);

    // maybe useState to capture the array of genres??
    // how collect info from a select/option html element
        // add when one is selected
        // remove from array when deselected

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_GENRES'
        });
    },[])

    const addMovie = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_MOVIE',
            payload: {...movie, genres: movieGenres}
        })
        setMovie({title: '', description: '', poster: '', })
        setMovieGenres([])
    };

    const handleSelector = (event) => {
        let options = []; 
        // for each selected values (option.value)
        for (let option of event.target.selectedOptions) {  
            // find the id associated with it          
            for (let genre of allGenres) {
                if (genre.name === option.value) {
                    options.push(genre.id);
                }
            }
        }
        setMovieGenres(options);
    };

    // handle the other inputs
    const handleInput = (event, attribute) => {
        let newMovie = {...movie};
        newMovie[attribute] = event.target.value;
        setMovie(newMovie)
    }

    return (
        <>
            <button onClick={() => history.push('/')}>Back to List</button>
            <form onSubmit={(event) => addMovie(event)}>
                <input value={movie.title} onChange={(event) => handleInput(event, 'title')} placeholder="Movie Title" type="text" />
                <input value={movie.poster} onChange={(event) => handleInput(event, 'poster')} placeholder="Movie Poster URL" type="text" />
                <input value={movie.description} onChange={(event) => handleInput(event, 'description')} placeholder="Movie Description" type="textarea" />
                {/* genre selection menu */}
                <label htmlFor="genres">Genres:</label>
                <select onChange={(event) => handleSelector(event)} name="genres" multiple>
                    {allGenres.map(genre => <option key={genre.id}>{genre.name}</option>)}
                </select>

                <button type="submit">Add Movie</button>
            </form>
        </>
    );
};

export default AddMovie;