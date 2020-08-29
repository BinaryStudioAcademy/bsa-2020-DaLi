import React from 'react';
import PropTypes from 'prop-types';

const Marker = ({ name, lng, lat, color, showTip, hideTip, locationNameForInfo }) => {
  return (
    <div
      className="circle"
      style={{ borderColor: color }}
      onMouseEnter={() => showTip(name)}
      onMouseLeave={() => hideTip()}
    >
      {locationNameForInfo === name ? (
        <div className="google-tip">
          {name}
          <br />
          long: {lng}
          <br />
          lat: {lat}
        </div>
      ) : null}
    </div>
  );
};

Marker.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  showTip: PropTypes.func,
  hideTip: PropTypes.func,
  locationNameForInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default Marker;
