import React, { useRef, useEffect, useState } from 'react';
import { select, json, entries, min, max, scaleLinear } from 'd3';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Marker from './Marker';
import data from './GeoChart.world.geo.json';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const MapVisualizationGoogleComp = () => {
  const google = window.google;
  const stores = [
    { lat: 47.49855629475769, lng: -122.14184416996333 },
    { latitude: 47.359423, longitude: -122.021071 },
    { latitude: 47.2052192687988, longitude: -121.988426208496 },
    { latitude: 47.6307081, longitude: -122.1434325 },
    { latitude: 47.3084488, longitude: -122.2140121 },
    { latitude: 47.5524695, longitude: -122.0425407 },
  ];

  const displayMarkers = () => {
    return stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => console.log('You clicked me!')}
        />
      );
    });
  };

  const overlay = new google.maps.OverlayView();

  // Add the container when the overlay is added to the map.
  overlay.onAdd = function () {
    const layer = select(this.getPanes().overlayLayer).append('div').attr('class', 'stations');

    // Draw each marker as a separate SVG element.
    // We could use a single SVG, but what size would it have?
    overlay.draw = function () {
      const projection = this.getProjection(),
        padding = 10;

      const marker = layer
        .selectAll('svg')
        .data(entries(data))
        .each(transform) // update existing markers
        .enter()
        .append('svg')
        .each(transform)
        .attr('class', 'marker');

      // Add a circle.
      marker.append('circle').attr('r', 4.5).attr('cx', padding).attr('cy', padding);

      // Add a label.
      marker
        .append('text')
        .attr('x', padding + 7)
        .attr('y', padding)
        .attr('dy', '.31em')
        .text(function (d) {
          return d.key;
        });

      function transform(d) {
        d = new google.maps.LatLng(d.value[1], d.value[0]);
        d = projection.fromLatLngToDivPixel(d);
        return select(this)
          .style('left', d.x - padding + 'px')
          .style('top', d.y - padding + 'px');
      }
    };
  };

  // Bind our overlay to the map…
  overlay.setMap(google.maps)
  overlay.setMap(Map);

  return (
    <Map google={google} zoom={8} style={mapStyles} initialCenter={{ lat: 47.444, lng: -122.176 }}>
      {displayMarkers()}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDDqI4sXO6zvU1PZJyZoUTV6DISqOUYclg',
})(MapVisualizationGoogleComp);
