import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
// note that this was adapted from material-ui.com/components/cards

// sets up styling
const useStyles = makeStyles({
  root: {
    width: 160,
  },
  media: {
    height: 240,
  },
});

// card that we'll actually use in Movie List
export default function MediaCard({movie}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Card variant="outlined" className={classes.root} onClick={() => {
        dispatch({
            type: 'FETCH_MOVIE',
            payload: movie
        })
        history.push(`/details/${movie.id}`)
    }
}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={movie.poster}
          title={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="p" component="p">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* {movie.description} */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}