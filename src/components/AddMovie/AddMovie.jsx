import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
function AddMovie() {
    const dispatch = useDispatch();
    const allGenres = useSelector(store => store.allGenres);

    // probably could clean up the two state vars into one, but it's easier to read, I think as it is
    const [movie, setMovie] = useState({title: '', description: '', poster: '', });
    const [movieGenres, setMovieGenres] = useState([]);

    // maybe useState to capture the array of genres??
    // how collect info from a select/option html eleement
        // add when one is selected
        // remove from array when deselected

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_GENRES'
        });
    },[])

    const addMovie = (event) => {
        event.preventDefault();
        console.log('object to be sent to db: ', {...movie, genres: movieGenres})
        dispatch({
            type: 'ADD_MOVIE',
            payload: {...movie, genres: movieGenres}
        })
    };

    const handleSelector = (event) => {
        let options = []; 
        // grab the string values of our genres from the selector
        for (let option of event.target.selectedOptions) {
            options.push(option.value)
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
            <form onSubmit={(event) => addMovie(event)}>
                <input value={movie.title} onChange={(event) => handleInput(event, 'title')} placeholder="Movie Title" type="text" />
                <input value={movie.poster} onChange={(event) => handleInput(event, 'poster')} placeholder="Movie Poster URL" type="text" />
                <input value={movie.description} onChange={(event) => handleInput(event, 'description')} placeholder="Movie Description" type="textarea" />
                {/* genre selection menu */}
                <label for="genres">Genres:</label>
                <select onChange={(event) => handleSelector(event)} name="genres" multiple>
                    {allGenres.map(genre => <option>{genre.name}</option>)}
                </select>

                <button type="submit">Add Movie</button>
            </form>
        </>
    );
};

export default AddMovie;