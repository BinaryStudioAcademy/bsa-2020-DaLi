import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {
  getAnalytics,
  deleteVisualization,
  deleteDashboard,
  openModal,
  closeModal,
  resetNotification,
  moveToCollection,
} from './actions';
import AnalyticsTabs from '../../components/AnalyticsTabs/AnalyticsTabs';
import CollectionList from '../../components/CollectionList/CollectionList';
import CollectionModal from '../../components/CollectionModal/CollectionModal';

const AnalyticsTabsContainer = ({
  message,
  getAnalytics,
  deleteVisualization,
  deleteDashboard,
  visualizations,
  dashboards,
  isLoading,
  status,
  collections,
  resetNotification,
  openModal,
  closeModal,
  moveToCollection,
  currentCollection,
}) => {
  useEffect(() => {
    getAnalytics();
  }, [getAnalytics]);

  const hideNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    resetNotification();
  };

  return (
    <div style={{ padding: '0 40px' }}>
      <h1>Our analytics</h1>
      <Grid container justify="space-between">
        <Grid item md={4} xs={12}>
          <CollectionList openModal={openModal} collections={collections} />
        </Grid>
        <Grid item md={8} xs={12}>
          <AnalyticsTabs
            visualizations={visualizations}
            dashboards={dashboards}
            deleteVisualization={deleteVisualization}
            deleteDashboard={deleteDashboard}
            isLoading={isLoading}
            closeModal={closeModal}
            openModal={openModal}
            moveToCollection={moveToCollection}
            collectionId={currentCollection.id}
          />
        </Grid>
      </Grid>
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

AnalyticsTabsContainer.propTypes = {
  visualizations: PropTypes.array,
  dashboards: PropTypes.array,
  isLoading: PropTypes.bool,
  getAnalytics: PropTypes.func,
  deleteVisualization: PropTypes.func,
  deleteDashboard: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
  collections: PropTypes.array,
  resetNotification: PropTypes.func,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  moveToCollection: PropTypes.func,
  currentCollection: PropTypes.object,
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
  getAnalytics,
  deleteVisualization,
  deleteDashboard,
  openModal,
  closeModal,
  resetNotification,
  moveToCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsTabsContainer);
