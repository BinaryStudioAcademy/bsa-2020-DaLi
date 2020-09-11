import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { useStyles } from './styles';
import MoveCollectionBody from './modals/MoveCollectionBody';

import {
  closeModal,
  addCollection,
  moveToCollection,
  setFormData,
  updateCollection,
} from '../../containers/AnalyticsContainer/actions';
import AddCollectionBody from './modals/AddCollectionBody';

const CollectionModal = ({
  isOpen,
  modal,
  formData,
  setFormData,
  closeModal,
  addCollection,
  collections,
  visualizationToMove,
  dashboardToMove,
  moveToCollection,
  currentCollection,
  updateCollection,
}) => {
  const classes = useStyles();

  if (modal.type === 'Add collection') {
    return (
      <Modal className={classes.modal} open={isOpen || false} onClose={closeModal}>
        <>
          <AddCollectionBody
            closeModal={closeModal}
            formData={formData}
            editableCollection={modal.collection}
            setFormData={setFormData}
            addCollection={addCollection}
            updateCollection={updateCollection}
          />
        </>
      </Modal>
    );
  }

  if (modal.type === 'Move collection') {
    return (
      <Modal className={classes.modal} open={isOpen || true} onClose={closeModal} style={{ minHeight: 300 }}>
        <>
          <MoveCollectionBody
            closeModal={closeModal}
            collections={collections}
            dashboardToMove={dashboardToMove}
            visualizationToMove={visualizationToMove}
            moveToCollection={moveToCollection}
            currentCollection={currentCollection}
          />
        </>
      </Modal>
    );
  }

  return null;
};

CollectionModal.propTypes = {
  isOpen: PropTypes.bool,
  modal: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  closeModal: PropTypes.func,
  addCollection: PropTypes.func,
  collections: PropTypes.array,
  visualizationToMove: PropTypes.object,
  dashboardToMove: PropTypes.object,
  moveToCollection: PropTypes.func,
  currentCollection: PropTypes.object,
  updateCollection: PropTypes.func,
};

const mapStateToProps = ({ analytics }) => {
  return {
    isOpen: analytics.modal.open,
    modal: analytics.modal,
    formData: analytics.formData,
    collections: analytics.collections,
    visualizationToMove: analytics.modal.visualization,
    dashboardToMove: analytics.modal.dashboard,
    currentCollection: analytics.currentCollection,
  };
};

const mapDispatchToProps = { closeModal, addCollection, moveToCollection, setFormData, updateCollection };

export default connect(mapStateToProps, mapDispatchToProps)(CollectionModal);
