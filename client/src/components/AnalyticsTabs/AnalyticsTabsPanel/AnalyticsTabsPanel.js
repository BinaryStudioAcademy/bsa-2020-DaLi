import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import { useStyles } from './styles';

const AnalyticsTabsPanel = ({ value, index, data, deleteItem }) => {
  const classes = useStyles();

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
      default: {
        return <DashboardIcon className={classes.icon} />;
      }
    }
  };

  return (
    <Typography component="div" hidden={value !== index}>
      <Box className={classes.root}>
        {data.map((item) => {
          return (
            <div className={classes.itemContainer} key={item.name}>
              {!item.type ? (
                <>
                  <Link to={`/dashboards/${item.id}`} className={classes.item}>
                    {chooseIcon(item.type)}
                    <span>{item.name}</span>
                  </Link>
                  <Tooltip title={item.description} placement="left" className={classes.description}>
                    <InfoIcon />
                  </Tooltip>
                  <DeleteIcon className={classes.menuIcon} id={item.id} />
                </>
              ) : (
                <>
                  <Link to={`/visualizations/${item.id}`} className={classes.item}>
                    {chooseIcon(item.type)}
                    <span>{item.name}</span>
                  </Link>
                  <DeleteIcon className={classes.menuIcon} id={item.id} onClick={deleteItem(item.id)} />
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
  deleteItem: PropTypes.func,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default AnalyticsTabsPanel;
