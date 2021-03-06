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
  const [scale, setScale] = useState(170);
  const [atlasSize, setAtlasSize] = useState({ width: 1400, height: 900 });
  const countries = topojson.feature(world, world.objects.countries).features;

  useEffect(() => {
    console.log('use effect');
    const svg = d3.select('#atlas')
      .attr('height', atlasSize.height)
      .attr('width', atlasSize.width);

    const projection = d3.geoMercator()
      .translate([atlasSize.width / 2, atlasSize.height / 5 * 3])
      .scale(scale);
    const path = d3.geoPath().projection(projection);

    let g;
    if (document.querySelectorAll('svg g').length < 1) {
      g = svg.append('g');
    } else {
      g = d3.select('svg g');
    }

    g.selectAll('.country')
      .data(countries)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)
      .on('mouseover', (d, i, nodes) => {
        d3.select(nodes[i]).classed('selected', true);
        if (countryCodes[d.id]) {
          setCountry(countryCodes[d.id].commonName);
        }
      })
      .on('mouseout', (d, i, nodes) => {
        d3.select(nodes[i]).classed('selected', false);
      })
      .on('click', () => {
        g.remove();
        setScale(80);
        setAtlasSize({ width: 1050, height: 675 });
      });
  });

  return (
    <React.Fragment>
      <span className={classes.title}>Movie</span>
      <div id="map">
        <svg id="atlas" />
      </div>
      <p>Selected: <span>{selectedCountry}</span></p>
      <p>scale: <span>{scale}</span></p>
    </React.Fragment>
  );
}

export default Atlas;
