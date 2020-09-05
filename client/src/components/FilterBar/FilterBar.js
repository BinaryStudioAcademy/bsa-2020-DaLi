import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FilterFieldsList from './FilterFieldsList';

import useStyles from './styles';
import DateFilterForm from './FilterForms/DateFilterForm';

const chooseFilterForm = (type, props) => {
  switch (type) {
    // case 'number': {
    //   return <Filter1Icon />;
    // }
    // case 'string': {
    //   return <TextFieldsIcon />;
    // }
    case 'date': {
      return <DateFilterForm {...props} />;
    }
    default:
      return null;
  }
};

const FilterBar = ({ currentVisualization, closeSidebar, updateVisualization }) => {
  const classes = useStyles();
  const { schema, datasetSettings } = currentVisualization;

  const [displayFiltersList, setDisplayFiltersList] = useState(true);
  const [FilterForm, setFilterForm] = useState(null);
  const [activeFilter, setActiveFilter] = useState({});

  const openFiltersList = () => setDisplayFiltersList(true);

  const chooseFilterHandler = (name, type) => {
    const filterCandidate = datasetSettings.find((s) => s.columnName === name);
    let filter = null;

    if (!filterCandidate) {
      filter = { isNew: true, columnName: name, columnType: type };
    } else {
      filter = { ...filterCandidate, isNew: false };
    }
    setActiveFilter(filter);
    setFilterForm(chooseFilterForm(type, { filter, openFiltersList, setActiveFilter }));
    setDisplayFiltersList(false);
  };

  const setNewFilters = () => {
    let newDatasetSettings = [];
    if (activeFilter.isNew) {
      delete activeFilter.isNew;
      newDatasetSettings = [...datasetSettings, activeFilter];
    } else {
      delete activeFilter.isNew;
      const index = datasetSettings.indexOf(({ columnName }) => columnName === activeFilter.columnName);
      newDatasetSettings[index] = activeFilter;
    }
    updateVisualization(null, newDatasetSettings);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {displayFiltersList ? (
        <FilterFieldsList
          schema={schema}
          activeFilterName={activeFilter.columnName || ''}
          chooseFilterHandler={chooseFilterHandler}
        />
      ) : (
        FilterForm
      )}
      {!FilterForm ? (
        <div className={classes.btnWrapper}>
          <Button className={classes.btn} onClick={closeSidebar}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className={classes.btnWrapper}>
          <Button className={classes.btn} onClick={setNewFilters}>
            {activeFilter.isNew ? 'Apply filter' : 'Update filter'}
          </Button>
        </div>
      )}
    </div>
  );
};

FilterBar.propTypes = {
  currentVisualization: PropTypes.object,
  closeSidebar: PropTypes.func,
  updateVisualization: PropTypes.func,
};

export default FilterBar;
