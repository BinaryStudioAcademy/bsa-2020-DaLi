import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FilterFieldsList from './FilterFieldsList';

import useStyles from './styles';
import DateFilterForm from './FilterForms/DateFilterForm';
import StringFilterForm from './FilterForms/StringFilterForm';

const chooseFilterForm = (type, props) => {
  switch (type) {
    case 'date': {
      return <DateFilterForm {...props} />;
    }

    case 'string': {
      return <StringFilterForm {...props} />;
    }

    case 'number':
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
    const filter = filterCandidate
      ? { ...filterCandidate, isNew: false }
      : { isNew: true, columnName: name, columnType: type };
    setActiveFilter(filter);
    setFilterForm(chooseFilterForm(type, { filter, openFiltersList, setActiveFilter }));
    setDisplayFiltersList(false);
  };

  const setNewFilters = () => {
    const { isNew, ...filter } = activeFilter;
    let newDatasetSettings = [...datasetSettings];
    if (!isNew) {
      const index = newDatasetSettings.findIndex(({ columnName }) => columnName === activeFilter.columnName);
      newDatasetSettings.splice(index, 1);
    }
    newDatasetSettings = [...newDatasetSettings, filter];
    updateVisualization(null, newDatasetSettings);
    if (isNew) {
      closeSidebar();
    }
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
