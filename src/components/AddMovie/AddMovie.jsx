import {useEffect} from 'react';
import {useDispatch} from 'react-redux'
function AddMovie() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_GENRES'
        });
    },[])

    return (
        <>
            <form onSubmit={}>
                <input placeholder="Movie Title" type="text" />
                <input placeholder="Movie Poster URL" type="text" />
                <input placeholder="Movie Description" type="textarea" />
                {/* genre selection menu */}
                <label for="genres">Choose genres:</label>


                <button type="submit"></button>
            </form>
        </>
    );
};

export default AddMovie;