import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { dbTableAPIService } from '../../services/api/dbTableAPI.service';

import './styles.css';
import chooseIcon from '../../helpers/chooseIcon';

// eslint-disable-next-line
const AddVisualizationToDashboardModal = ({ closeModal, addVisualization, isVisible, visualizations }) => {
  const [visibleVisualizations, setVisibleVisualizations] = useState(visualizations);

  useEffect(() => {
    setVisibleVisualizations(visualizations);
  }, [visualizations]);

  const addNewVisualization = (id, tableId) => () => {
    const { config, datasetSettings } = visualizations.find((vis) => vis.id === id);
    dbTableAPIService.getTableData(tableId, { settings: datasetSettings, config }).then((data) => {
      addVisualization(id, data);
      closeModal();
    });
  };

  const searchVisualizations = (value) => {
    const filteredVisualizations = visualizations.filter((visualization) => visualization.name.includes(value.search));
    setVisibleVisualizations(filteredVisualizations);
  };

  return (
    <Dialog open={isVisible || false} maxWidth="sm" fullWidth>
      <DialogTitle>
        Pick a visualization to add
        <IconButton
          aria-label="close"
          size="small"
          style={{ position: 'absolute', top: 20, right: 24 }}
          onClick={closeModal}
        >
          <CloseIcon style={{ fontSize: 18, color: '#c6cfd4' }} />
        </IconButton>
      </DialogTitle>

      <Formik initialValues={{ search: '' }} onSubmit={(values) => searchVisualizations(values)}>
        {/* eslint-disable-next-line */}
        {(props) => <SearchVisualizationForm {...props} />}
      </Formik>
      {visibleVisualizations && (
        <div className="visualizationToDashboardModalFooter">
          {visibleVisualizations.map((visualization) => {
            return (
              <button
                key={visualization.id}
                type="button"
                onClick={addNewVisualization(visualization.id, visualization.tableId)}
              >
                {chooseIcon(visualization.type, { color: 'inherit', fontSize: 25 })}
                {visualization.name}
              </button>
            );
          })}
        </div>
      )}
    </Dialog>
  );
};

const SearchVisualizationForm = ({ handleSubmit }) => (
  <Form className="visualizationToDashboardModalForm" onSubmit={handleSubmit}>
    <DialogContent className="MyFieldContainer">
      <div className="search-field">
        <Field name="search" as="input" placeholder="Search..." />
        <SearchIcon style={{ color: '#c6cfd4', cursor: 'pointer' }} onClick={handleSubmit} />
      </div>
    </DialogContent>
  </Form>
);

AddVisualizationToDashboardModal.propTypes = {
  closeModal: PropTypes.func,
  saveVisualization: PropTypes.func,
  search: PropTypes.func,
  isVisible: PropTypes.bool,
  visualizations: PropTypes.array,
};

SearchVisualizationForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default AddVisualizationToDashboardModal;
