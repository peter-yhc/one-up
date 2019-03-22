import React from 'react';
import { makeStyles } from '@material-ui/styles';
import world from 'world-atlas/world/110m';
import * as d3 from 'd3';

const styles = makeStyles({
  title: {
    color: 'green',
  },
});

const margin = {
  top: 50,
  left: 50,
  right: 50,
  bottom: 50,
};
const height = 400;
const width = 800;

function Movie() {
  const classes = styles();
  console.log('---------');
  console.log(world);

  const svg = d3.select('#map')
    .append("svg")
    .attr("height", 500);
  return (
    <React.Fragment>
      <span className={classes.title}>Movie</span>
      <div id="map" />
      <span>Hi</span>
    </React.Fragment>
  );
}

export default Movie;
