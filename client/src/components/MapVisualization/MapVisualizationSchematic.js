import React, { useRef, useEffect } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import d3Tip from 'd3-tip';
import PropTypes from 'prop-types';
import useResizeObserver from './useResizeObserver';
import './styles.css';

const MapVisualizationSchematic = ({ schematicMap, data, radius, settings }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator().fitSize([width, height], schematicMap).precision(5);

    svg
      .append('g')
      .selectAll('path')
      .data(schematicMap.features)
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

    if (settings.latitude && settings.longitude) {
      const markers = data.map((marker) => {
        return {
          name: marker[settings.name],
          long: marker[settings.longitude],
          lat: marker[settings.latitude],
        };
      });
      svg
        .selectAll('myCircles')
        .data(markers)
        .enter()
        .append('circle')
        .attr('cx', (d) => {
          return projection([d.long, d.lat])[0];
        })
        .attr('cy', (d) => {
          return projection([d.long, d.lat])[1];
        })
        .attr('r', radius)
        .attr('class', 'circle')
        .style('fill', settings.color)
        .attr('stroke', settings.color)
        .attr('stroke-width', 3)
        .attr('fill-opacity', 0.4)
        .attr('white-space', 'pre-line')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
    }
  });

  return (
    <div ref={wrapperRef} style={{ height: '100%' }}>
      <svg className="map-visualization-svg" ref={svgRef} />
    </div>
  );
};

MapVisualizationSchematic.propTypes = {
  schematicMap: PropTypes.object,
  data: PropTypes.array,
  radius: PropTypes.number,
  settings: PropTypes.object,
};

export default MapVisualizationSchematic;
