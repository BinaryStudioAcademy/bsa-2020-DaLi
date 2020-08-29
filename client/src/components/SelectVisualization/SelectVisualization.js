import React, { useState, useEffect } from 'react';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { dbTableAPIService } from '../../services/api/dbTableAPI.service';

import './styles.css';

const iconStyles = {
  fontSize: 200,
};

const myVisualizations = [
  { id: 1, name: 'Line Chart', icon: <TimelineOutlinedIcon style={iconStyles} />, type: 'line-chart' },
  { id: 2, name: 'Bar Chart', icon: <EqualizerOutlinedIcon style={iconStyles} />, type: 'bar-chart' },
  { id: 3, name: 'Table', icon: <TableChartOutlinedIcon style={iconStyles} />, type: 'table' },
  { id: 4, name: 'Map', icon: <MapOutlinedIcon style={iconStyles} />, type: 'map' },
];

const SelectVisualization = ({ tableId }) => {
  const [data, setData] = useState(null);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    dbTableAPIService.getTable(tableId).then((data) => setData(data));
    dbTableAPIService.getTableSchema(tableId).then((schema) => setSchema(schema));
  }, [tableId]);

  return data && schema ? (
    <div className="select-visualization-container">
      {myVisualizations.map((item) => {
        return (
          <NavLink
            to={{
              pathname: `/select-visualization/${item.type}`,
              schema,
              data,
              tableId,
            }}
            key={item.id}
            className="visualization-container"
          >
            {item.icon}
            <h2>{item.name}</h2>
          </NavLink>
        );
      })}
    </div>
  ) : (
    <div style={{ position: 'relative' }}>
      <CircularProgress size={40} left={-20} top={10} style={{ marginLeft: '50%' }} />
    </div>
  );
};

SelectVisualization.propTypes = {
  tableId: PropTypes.string,
};

export default SelectVisualization;
