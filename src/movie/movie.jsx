import React from 'react';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles({
  title: {
    color: 'green',
  },
});


function Movie() {
  const classes = styles();
  return (
    <span className={classes.title}>Movie</span>
  );
}

export default Movie;
