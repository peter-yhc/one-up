import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import world from 'world-atlas/world/110m';
import worldData from 'world-atlas/world/110m.tsv';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import './atlas.css';

const styles = makeStyles({
  title: {
    color: 'green',
  },
});

const height = 900;
const width = 1400;

const countryCodes = {};
d3.tsv(worldData).then((data) => {
  data.forEach((d) => {
    countryCodes[d.iso_n3] = {
      formalName: d.formal_en,
      commonName: d.brk_name,
    };
  });
});

function Atlas() {
  const classes = styles();

  const [selectedCountry, setCountry] = useState('');
  const countries = topojson.feature(world, world.objects.countries).features;

  useEffect(() => {
    const svg = d3.select('#atlas')
      .attr('height', height)
      .attr('width', width);

    const projection = d3.geoMercator()
      .translate([width / 2, height / 5 * 3])
      .scale(170);
    const path = d3.geoPath().projection(projection);

    svg.selectAll('.country')
      .data(countries)
      .enter().append('path')
      .attr('class', 'country')
      .attr('d', path)
      .on('mouseover', (d, i, nodes) => {
        d3.select(nodes[i]).classed('selected', true);
        setCountry(countryCodes[d.id].commonName);
      })
      .on('mouseout', (d, i, nodes) => {
        d3.select(nodes[i]).classed('selected', false);
      });
  });

  return (
    <React.Fragment>
      <span className={classes.title}>Movie</span>
      <div id="map">
        <svg id="atlas" />
      </div>
      <p>Selected: <span>{selectedCountry}</span></p>
    </React.Fragment>
  );
}

export default Atlas;
