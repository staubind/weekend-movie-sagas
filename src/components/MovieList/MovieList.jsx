import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import {Link} from 'react-router-dom';
import MediaCard from '../MediaCard/MediaCard';
// imports for grid
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <h3>Don't see what you want? <Link to="/add">Add it!</Link></h3>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {movies.map(movie => (
                            <Grid key={movie.id} item>
                                <MediaCard movie={movie} className={classes.paper} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            {/* <section className="movies">
                {movies.map(movie => {
                    return (
                        <MediaCard key={movie.id} movie={movie}  />
                    );
                })}
            </section> */}
        </main>

    );
}

export default MovieList;