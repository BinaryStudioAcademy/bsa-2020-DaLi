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

const AnalyticsTabsPanel = ({ value, index, data, deleteVisualization, deleteDashboard, openModal, collectionId }) => {
  const history = useHistory();

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

  const handleMoveVisualization = (visualization, event) => {
    openModal({ visualization, type: 'Move collection' });
    event.stopPropagation();
  };
  const handleMoveDashboard = (dashboard, event) => {
    openModal({ dashboard, type: 'Move collection' });
    event.stopPropagation();
  };

  const handleClickOnDashboardItem = (id) => {
    history.push(`/dashboards/${id}`);
  };

  const onVisualizationsClick = (id) => {
    history.push({
      pathname: `/visualizations/${id}`,
      data,
    });
  };

  return (
    <Typography component="div" hidden={value !== index}>
      {data.length === 0 ? (
        <div style={{ width: '100%', textAlign: 'center', position: 'relative' }}>
          <Typography variant="h4">YOU DON’T HAVE ITEMS TO DISPLAY</Typography>
        </div>
      ) : (
        <Grid>
          {data.map((item, dataIndex) => {
            return (
              <Paper
                key={dataIndex}
                // style={{ margin: 'auto', height: '100%', justifyContent: 'center' }}
                variant="outlined"
                className="paper-collection-outlined"
                onClick={() => {
                  if (item.type) {
                    onVisualizationsClick(item.id, item.tableId);
                  } else {
                    handleClickOnDashboardItem(item.id);
                  }
                }}
              >
                {!item.type ? (
                  <>
                    <div className="paper-collection-icon">{chooseIcon(item.type)}</div>
                    {/* eslint-disable-next-line */}
                    <div className="paper-collection-text">
                      <Typography variant="h3">{item.name}</Typography>
                    </div>
                    <div className="paper-collection-btns">
                      {item.description.length ? (
                        <Tooltip title={item.description} placement="left">
                          <InfoIcon id={`analytics-dashboard-${item.id}-info`} />
                        </Tooltip>
                      ) : null}
                      <MoveToInboxIcon
                        onClick={(e) => handleMoveDashboard(item, e)}
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
                    <div className="paper-collection-text">
                      <Typography variant="h3">{item.name}</Typography>
                    </div>
                    <div className="paper-collection-btns">
                      {item.description.length ? (
                        <Tooltip title={item.description} placement="left">
                          <InfoIcon id={`analytics-visualization-${item.id}-info`} />
                        </Tooltip>
                      ) : null}
                      <MoveToInboxIcon
                        onClick={(e) => handleMoveVisualization(item, e)}
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
      )}
    </Typography>
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
