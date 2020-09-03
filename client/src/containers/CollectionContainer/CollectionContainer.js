import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import AnalyticsTabs from '../../components/AnalyticsTabs/AnalyticsTabs';
import CollectionModal from '../../components/CollectionModal/CollectionModal';
import {
  getCollection,
  openModal,
  closeModal,
  moveToCollection,
  deleteVisualization,
  deleteDashboard,
  resetNotification,
  deleteCollection,
} from '../AnalyticsContainer/actions';

const CollectionContainer = ({
  message,
  deleteVisualization,
  deleteDashboard,
  visualizations,
  dashboards,
  isLoading,
  status,
  resetNotification,
  openModal,
  closeModal,
  getCollection,
  currentCollection,
  moveToCollection,
  deleteCollection,
}) => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getCollection(id);
  }, [getCollection, id]);

  const hideNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    resetNotification();
  };

  const handleDeleteCollection = () => {
    deleteCollection(currentCollection.id);
    history.push('/');
  };

  return (
    <div style={{ padding: '10px 40px 0 40px' }}>
      {!isLoading && (
        <>
          <div className={classes.headerContainer}>
            <div className={classes.titleContainer}>
              <Link to="/" className={classes.link}>
                Our analytics
              </Link>
              <h1 className={classes.title}>{currentCollection.name || 'Collection not found'}</h1>
            </div>
            <EditIcon
              className={classes.icon}
              onClick={() => openModal({ collection: currentCollection, type: 'Add collection' })}
            />
            <DeleteIcon className={classes.icon} onClick={handleDeleteCollection} />
          </div>
          <AnalyticsTabs
            visualizations={visualizations}
            dashboards={dashboards}
            deleteVisualization={deleteVisualization}
            deleteDashboard={deleteDashboard}
            isLoading={isLoading}
            openModal={openModal}
            closeModal={closeModal}
            moveToCollection={moveToCollection}
            collectionId={currentCollection.id}
          />
        </>
      )}
      <CollectionModal />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!message}
        autoHideDuration={2000}
        transitionDuration={0}
        onClose={hideNotification}
      >
        <Alert elevation={6} variant="filled" severity={status} onClose={hideNotification}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

CollectionContainer.propTypes = {
  visualizations: PropTypes.array,
  dashboards: PropTypes.array,
  isLoading: PropTypes.bool,
  getAnalytics: PropTypes.func,
  deleteVisualization: PropTypes.func,
  deleteDashboard: PropTypes.func,
  message: PropTypes.string,
  status: PropTypes.string,
  resetNotification: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  getCollection: PropTypes.func,
  currentCollection: PropTypes.object,
  moveToCollection: PropTypes.func,
  deleteCollection: PropTypes.func,
};

const mapStateToProps = ({ analytics }) => ({
  visualizations: analytics.visualizations,
  dashboards: analytics.dashboards,
  collections: analytics.collections,
  currentCollection: analytics.currentCollection,
  isLoading: analytics.isLoading,
  error: analytics.error,
  message: analytics.message,
  status: analytics.status,
});

const mapDispatchToProps = {
  getCollection,
  openModal,
  closeModal,
  moveToCollection,
  deleteVisualization,
  deleteDashboard,
  resetNotification,
  deleteCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer);
