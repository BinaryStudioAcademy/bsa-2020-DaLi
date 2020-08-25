import React, { useRef, useEffect, useState } from 'react';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';
import d3Tip from 'd3-tip';
import useResizeObserver from './useResizeObserver';

const MapVisualizationComp2 = ({ data, property }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    const minProp = min(data.features, (feature) => feature.properties[property]);
    const maxProp = max(data.features, (feature) => feature.properties[property]);
    const colorScale = scaleLinear().domain([minProp, maxProp]).range(['#ccc', 'red']);

    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    // setSelectedCountry('Ukraine');
    // projects geo-coordinates on a 2D plane
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100);

    var markers = [
      // { long: 9.083, lat: 42.149, name: 'Corsica' }, // corsica
      // { long: 2.349, lat: 48.864, name: 'Paris' }, // Paris
      { long: 28.28, lat: 49.14, name: 'Vinnytsia' }, // Vinnytsia
    ];

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);
    data.features = data.features.filter(function (d) {
      return d.properties.name == 'Ukraine';
    });
    // render each country
    svg
      .append('g')
      .selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('fill', '#69b3a2')
      .attr('d', geoPath().projection(projection))
      .style('stroke', '#fff');

    select('.d3-tip').remove();
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(
        (d) =>
          `${d.name}
          long: ${d.long}
          lat: ${d.lat}`
      );
    svg.call(tip).attr('height', '100%').attr('width', '100%');

    svg
      .selectAll('myCircles')
      .data(markers)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return projection([d.long, d.lat])[0];
      })
      .attr('cy', function (d) {
        return projection([d.long, d.lat])[1];
      })
      .attr('r', 5)
      .attr('class', 'circle')
      .style('fill', '#000000')
      .attr('stroke', '#000000')
      .attr('stroke-width', 3)
      .attr('fill-opacity', 0.4)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  });
  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
      <svg className="map-visualization-svg" ref={svgRef}></svg>
    </div>
  );
};

export default MapVisualizationComp2;
