import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import './MovieList.css'
import {useHistory} from 'react-router-dom';
import MediaCard from '../MediaCard/MediaCard';
// imports for grid
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// styles for the grid layout
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const classes = useStyles()
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <h3>Don't see what you want? <Button variant="contained" onClick={() => history.push('/add')}>Add it!</Button></h3>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {/* displays the movie cards */}
                        {movies.map(movie => (
                            <Grid key={movie.id} item>
                                <MediaCard movie={movie} className={classes.paper} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </main>

    );
}

export default MovieList;