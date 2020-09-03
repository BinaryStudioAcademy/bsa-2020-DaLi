import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useHistory } from 'react-router-dom';
import { dbTableAPIService } from '../../../services/api/dbTableAPI.service';

const AnalyticsTabsPanel = ({ value, index, data, deleteVisualization, deleteDashboard }) => {
  const history = useHistory();

  const onVisualizationsClick = (id, tableId) => {
    dbTableAPIService.getTable(tableId).then((data) =>
      history.push({
        pathname: `/visualizations/${id}`,
        data,
      })
    );
  };

  const chooseIcon = (type) => {
    switch (type) {
      case 'LINE_CHART': {
        return <TimelineOutlinedIcon />;
      }
      case 'BAR_CHART': {
        return <EqualizerOutlinedIcon />;
      }
      case 'TABLE': {
        return <TableChartOutlinedIcon />;
      }
      case 'MAP': {
        return <MapOutlinedIcon />;
      }
      default: {
        return <DashboardIcon />;
      }
    }
  };

  return (
    <Typography component="div" hidden={value !== index}>
      <Box>
        {data.map((item, dataIndex) => {
          return (
            <div key={dataIndex}>
              {!item.type ? (
                <>
                  <Link to={`/dashboards/${item.id}`}>
                    {chooseIcon(item.type)}
                    <span>{item.name}</span>
                  </Link>
                  {item.description.length ? (
                    <Tooltip title={item.description} placement="left">
                      <InfoIcon />
                    </Tooltip>
                  ) : null}
                  <DeleteIcon id={item.id} onClick={deleteDashboard(item.id)} />
                </>
              ) : (
                <>
                  <div onClick={() => onVisualizationsClick(item.id, item.tableId)} aria-hidden="true">
                    {chooseIcon(item.type)}
                    <span>{item.name}</span>
                  </div>
                  <DeleteIcon id={item.id} onClick={deleteVisualization(item.id)} />
                </>
              )}
            </div>
          );
        })}
      </Box>
    </Typography>
  );
};

AnalyticsTabsPanel.propTypes = {
  data: PropTypes.array,
  deleteVisualization: PropTypes.func,
  deleteDashboard: PropTypes.func,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default AnalyticsTabsPanel;
