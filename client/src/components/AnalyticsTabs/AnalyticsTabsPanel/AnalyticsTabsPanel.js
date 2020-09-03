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
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import { Link, useHistory } from 'react-router-dom';
import { dbTableAPIService } from '../../../services/api/dbTableAPI.service';

import { useStyles } from './styles';

const AnalyticsTabsPanel = ({ value, index, data, deleteVisualization, deleteDashboard, openModal, collectionId }) => {
  const classes = useStyles();
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
        return <TimelineOutlinedIcon className={classes.icon} />;
      }
      case 'BAR_CHART': {
        return <EqualizerOutlinedIcon className={classes.icon} />;
      }
      case 'TABLE': {
        return <TableChartOutlinedIcon className={classes.icon} />;
      }
      case 'MAP': {
        return <MapOutlinedIcon className={classes.icon} />;
      }
      default: {
        return <DashboardIcon className={classes.icon} />;
      }
    }
  };

  const handleMoveVisualization = (visualization) => {
    openModal({ visualization, type: 'Move collection' });
  };
  const handleMoveDashboard = (dashboard) => {
    openModal({ dashboard, type: 'Move collection' });
  };

  return (
    <Typography component="div" hidden={value !== index}>
      <Box className={classes.root}>
        {data.map((item, dataIndex) => {
          return (
            <div className={classes.itemContainer} key={dataIndex}>
              {!item.type ? (
                <>
                  <Link to={`/dashboards/${item.id}`} className={classes.item}>
                    {chooseIcon(item.type)}
                    <span id={`analytics-${item.id}-name`}>{item.name}</span>
                  </Link>
                  {item.description.length ? (
                    <Tooltip title={item.description} placement="left" className={classes.description}>
                      <InfoIcon id={`analytics-${item.id}-info`} />
                    </Tooltip>
                  ) : null}
                  <MoveToInboxIcon className={classes.moveIcon} onClick={() => handleMoveDashboard(item)} />
                  <DeleteIcon
                    className={classes.menuIcon}
                    id={`analytics-${item.id}-delete`}
                    onClick={deleteDashboard({ id: item.id, collectionId })}
                  />
                </>
              ) : (
                <>
                  <div
                    className={classes.item}
                    onClick={() => onVisualizationsClick(item.id, item.tableId)}
                    aria-hidden="true"
                  >
                    {chooseIcon(item.type)}
                    <span>{item.name}</span>
                  </div>
                  <MoveToInboxIcon className={classes.moveIcon} onClick={() => handleMoveVisualization(item)} />
                  <DeleteIcon
                    className={classes.menuIcon}
                    id={item.id}
                    onClick={deleteVisualization({ id: item.id, collectionId })}
                  />
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
  openModal: PropTypes.func,
  collectionId: PropTypes.string,
};

export default AnalyticsTabsPanel;
