import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';
import GroupByList from './GroupByList';

const summarizes = [
  { id: 0, name: 'count', operation: 'COUNT', isNeedArgument: false, argument: '' },
  { id: 1, name: 'sum_of', operation: 'SUM', isNeedArgument: true, argument: '' },
  { id: 2, name: 'average_of', operation: 'AVG', isNeedArgument: true, argument: '' },
];

const SummarizeBar = ({ closeSidebar, currentVisualization, updateVisualization }) => {
  const classes = useStyles();
  const [currentSummarize, setCurrentSummarize] = useState(null);
  const [isSelectArgument, setIsSelectArgument] = useState(false);
  const [currentGroupBy, setCurrentGroupBy] = useState({ name: null, type: null, period: null, as: null });
  const [isSummarize, setIsSummarize] = useState(false);
  const [isInitializeSummarize, setIsInitializeSummarize] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isTableVisual = currentVisualization.type === 'TABLE';

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const nullGroupBy = () => {
    setCurrentGroupBy({ name: null, type: null, period: null, as: null });
  };

  const deleteSummarize = (e) => {
    e.stopPropagation();
    setIsSummarize(false);
    nullGroupBy();
    setIsSelectArgument(false);
    setCurrentSummarize(null);
    setIsInitializeSummarize(false);
  };

  const deleteGroupBy = (e) => {
    e.stopPropagation();
    nullGroupBy();
  };

  // initial summarize
  if (currentVisualization.config.isSummarize && isInitializeSummarize && !isSummarize) {
    setIsSummarize(true);
    setCurrentGroupBy(currentVisualization.config.summarize.groupBy);
    const summarizeIndex = summarizes.findIndex(
      (item) => item.name === currentVisualization.config.summarize.select.as
    );
    if (summarizes[summarizeIndex].isNeedArgument) {
      setCurrentSummarize({
        ...summarizes[summarizeIndex],
        argument: currentVisualization.config.summarize.select.column,
      });
    } else {
      setCurrentSummarize(summarizes[summarizeIndex]);
    }
  }

  const updateConfig = () => {
    const newConfig = { ...currentVisualization.config };
    if (isSummarize) {
      const groupByName = currentGroupBy.period
        ? `${currentGroupBy.name}_by_${currentGroupBy.period}`
        : currentGroupBy.name;
      newConfig.isSummarize = true;
      if (isTableVisual) {
        const summarizeColumns = [
          {
            id: currentSummarize.name,
            title: currentSummarize.name,
            type: 'number',
            visible: true,
          },
          {
            id: groupByName,
            title: groupByName,
            type: currentGroupBy.type,
            visible: true,
          },
        ];
        newConfig.summarizeColumns = summarizeColumns;
      } else {
        newConfig.axisData.XAxis.key = groupByName;
        newConfig.axisData.XAxis.label = groupByName;
        newConfig.axisData.YAxis.key = [currentSummarize.name];
        newConfig.axisData.YAxis.label = [currentSummarize.name];
      }
      const summarize = {
        select: {
          operation: currentSummarize.operation,
          column: currentSummarize.isNeedArgument ? currentSummarize.argument : '*',
          as: currentSummarize.name,
        },
        groupBy: {
          name: currentGroupBy.name,
          type: currentGroupBy.type,
          period: currentGroupBy.period,
          as: groupByName,
        },
      };
      newConfig.summarize = summarize;
    } else {
      if (isTableVisual) {
        delete newConfig.summarizeColumns;
      } else {
        newConfig.axisData.XAxis.key = newConfig.axisData.XAxis.availableKeys[0];
        newConfig.axisData.XAxis.label = newConfig.axisData.XAxis.availableKeys[0];
        newConfig.axisData.YAxis.key = [newConfig.axisData.YAxis.availableKeys[0]];
        newConfig.axisData.YAxis.label = [newConfig.axisData.YAxis.availableKeys[0]];
      }
      newConfig.summarize = {
        select: {},
        groupBy: '',
      };
      newConfig.isSummarize = false;
    }
    updateVisualization(newConfig);
    closeSidebar();
  };

  const selectSummarize = (summarize) => () => {
    if (summarize.isNeedArgument) {
      setCurrentSummarize(summarize);
      setIsSelectArgument(true);
    } else {
      setCurrentSummarize(summarize);
      setIsSummarize(true);
      setMenuAnchorEl(null);
    }
  };

  const selectArgument = (name) => () => {
    setCurrentSummarize({ ...currentSummarize, argument: name });
    setIsSummarize(true);
    setIsSelectArgument(false);
    setMenuAnchorEl(null);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
    setIsSelectArgument(false);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div>
        <h3>Summarize by</h3>
        {isSummarize && (
          <>
            <Button
              className={classes.summarizeByButton}
              color="primary"
              variant="outlined"
              fullWidth
              onClick={handleMenuClick}
            >
              {`${currentSummarize.name.replace('_', ' ')} ${currentSummarize.argument.replace('_', ' ')}`}
              <CloseIcon onClick={deleteSummarize} />
            </Button>
          </>
        )}
        {!isSummarize && (
          <>
            <Button color="primary" variant="outlined" fullWidth onClick={handleMenuClick}>
              Add a metric
            </Button>
          </>
        )}
        <Menu id="add-summarize" anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={closeMenu}>
          {!isSelectArgument &&
            summarizes.map((summarize) => (
              <MenuItem key={summarize.id} onClick={selectSummarize(summarize)}>
                {summarize.name.replace('_', ' ')}
              </MenuItem>
            ))}
          {isSelectArgument &&
            currentVisualization.schema
              .filter((column) => column.data_type === 'number')
              .map((column) => {
                return (
                  <MenuItem key={column.column_name} onClick={selectArgument(column.column_name)}>
                    {column.column_name.replace('_', ' ')}
                  </MenuItem>
                );
              })}
        </Menu>
      </div>
      {isSummarize && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <h3>Group by</h3>
          {currentVisualization.schema.map((column) => (
            <GroupByList
              key={column.column_name}
              type={column.data_type}
              name={column.column_name}
              isActive={column.column_name === currentGroupBy.name}
              setCurrentGroupBy={setCurrentGroupBy}
              currentGroupBy={currentGroupBy}
              deleteGroupBy={deleteGroupBy}
            />
          ))}
        </div>
      )}

      <div className={classes.btnWrapper}>
        <Button
          color="primary"
          variant="contained"
          className={classes.summarizeDoneButton}
          disabled={isSummarize && !currentGroupBy.name}
          onClick={updateConfig}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

SummarizeBar.propTypes = {
  currentVisualization: PropTypes.object,
  updateVisualization: PropTypes.func,
  closeSidebar: PropTypes.func,
};

export default SummarizeBar;
