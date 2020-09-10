import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const AnalyticsTabsPanel = ({ data, deleteVisualization, deleteDashboard, openModal, collectionId }) => {
  const history = useHistory();

  const onVisualizationsClick = (id) => {
    history.push({
      pathname: `/visualizations/${id}`,
      data,
    });
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

  const handleMoveVisualization = (visualization) => {
    openModal({ visualization, type: 'Move collection' });
  };
  const handleMoveDashboard = (dashboard) => {
    openModal({ dashboard, type: 'Move collection' });
  };

  const handleClickOnDashboardItem = (id) => {
    history.push(`/dashboards/${id}`);
  };

  return (
    <>
      <Grid>
        {data.map((item, dataIndex) => {
          return (
            <Paper key={dataIndex} variant="outlined" className="paper-collection-outlined">
              {!item.type ? (
                <>
                  <div className="paper-collection-icon">{chooseIcon(item.type)}</div>
                  {/* eslint-disable-next-line */}
                  <div className="paper-collection-text" onClick={() => handleClickOnDashboardItem(item.id)}>
                    <Typography variant="h3">{item.name}</Typography>
                  </div>
                  <div className="paper-collection-btns">
                    {item.description.length ? (
                      <Tooltip title={item.description} placement="left">
                        <InfoIcon id={`analytics-dashboard-${item.id}-info`} />
                      </Tooltip>
                    ) : null}
                    <MoveToInboxIcon
                      onClick={() => handleMoveDashboard(item)}
                      id={`analytics-dashboard-${item.id}-moveToCollections`}
                    />
                    <DeleteIcon
                      id={`analytics-dashboard-${item.id}-delete`}
                      onClick={deleteDashboard({ id: item.id, collectionId })}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="paper-collection-icon">{chooseIcon(item.type)}</div>
                  {/* eslint-disable-next-line */}
                  <div className="paper-collection-text" onClick={() => onVisualizationsClick(item.id, item.tableId)}>
                    <Typography variant="h3">{item.name}</Typography>
                  </div>
                  <div className="paper-collection-btns">
                    {item.description.length ? (
                      <Tooltip title={item.description} placement="left">
                        <InfoIcon id={`analytics-visualization-${item.id}-info`} />
                      </Tooltip>
                    ) : null}
                    <MoveToInboxIcon
                      onClick={() => handleMoveVisualization(item)}
                      id={`analytics-visualization-${item.id}-moveToCollections`}
                    />
                    <DeleteIcon
                      id={`analytics-visualization-${item.id}-delete`}
                      onClick={deleteVisualization({ id: item.id, collectionId })}
                    />
                  </div>
                </>
              )}
            </Paper>
          );
        })}
      </Grid>
    </>
  );
};

AnalyticsTabsPanel.propTypes = {
  data: PropTypes.array,
  deleteVisualization: PropTypes.func,
  deleteDashboard: PropTypes.func,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  openModal: PropTypes.func,
  collectionId: PropTypes.string,
};

export default AnalyticsTabsPanel;
