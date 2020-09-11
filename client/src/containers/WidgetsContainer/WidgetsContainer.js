import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useStyles } from './styles';
import StyledNavLink from '../../theme/StyledNavLink';
import { getDatasets } from '../DataSourcesDatasetsContainer/actions';
import { getAnalytics } from '../AnalyticsContainer/actions';
import { DEFAULT_COLLECTIONS } from '../../constants';

const WidgetsContainer = ({
  getDatasets,
  getAnalytics,
  datasets,
  collections,
  datasetIsLoading,
  collectionsIsLoading,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getDatasets();
    getAnalytics();
  }, [getDatasets, getAnalytics]);

  return (
    <div className="wrapper">
      <Typography style={{ marginTop: 60 }} variant="h1">
        Hello!
      </Typography>
      <div className={classes.title}>
        <Typography style={{ marginRight: 40 }} variant="h2">
          Our analytics
        </Typography>
        <StyledNavLink>
          <NavLink
            activeStyle={{
              opacity: '1',
            }}
            to={{
              pathname: '/analytics',
            }}
          >
            <Typography variant="body2" color="primary">
              Brows all items {'>'}
            </Typography>
          </NavLink>
        </StyledNavLink>
      </div>
      {!collectionsIsLoading &&
        (() => {
          let count = 0;
          return (
            <div className={classes.collectionContainer}>
              {collections.map((collection) => {
                if (collection.name === DEFAULT_COLLECTIONS) return null;
                count++;
                return count < 6 ? (
                  <Paper variant="outlined" square key={collection.id}>
                    <div className="paper-analitics-icon">
                      <CheckBoxOutlineBlankIcon />
                    </div>
                    <div className="paper-analitics-text">
                      <Typography variant="h3" className={classes.collectionName}>
                        {collection.name}
                      </Typography>
                      {collection.description && (
                        <Typography variant="body2" color="textSecondary" className={classes.collectionDescription}>
                          {collection.description}
                        </Typography>
                      )}
                      <StyledNavLink>
                        <NavLink
                          activeStyle={{
                            opacity: '1',
                          }}
                          to={{
                            pathname: `/collections/${collection.id}`,
                          }}
                        >
                          <Typography variant="body2" color="primary">
                            More Details {'>'}
                          </Typography>
                        </NavLink>
                      </StyledNavLink>
                    </div>
                  </Paper>
                ) : null;
              })}
            </div>
          );
        })()}
      <div className={classes.title}>
        <Typography style={{ marginRight: 40 }} variant="h2">
          Our Data
        </Typography>
        <StyledNavLink>
          <NavLink
            activeStyle={{
              opacity: '1',
            }}
            to={{
              pathname: '/data-sources',
            }}
          >
            <Typography variant="body2" color="primary">
              Brows all items {'>'}
            </Typography>
          </NavLink>
        </StyledNavLink>
      </div>
      {!datasetIsLoading &&
        (() => {
          let count = 0;
          return (
            <div className={classes.dataContainer}>
              {datasets.map((database) => {
                count++;
                return count < 5 ? (
                  <NavLink
                    className="database-link"
                    to={{
                      pathname: `/data-sources/${database.id}`,
                    }}
                    key={database.id}
                  >
                    <Paper variant="outlined" square>
                      <div className="paper-data-icon">
                        <FolderOpenOutlinedIcon />
                      </div>
                      <div className="paper-data-text">
                        <Typography variant="h3" className={classes.collectionName}>
                          {database.dbNickname}
                        </Typography>
                      </div>
                    </Paper>
                  </NavLink>
                ) : null;
              })}
            </div>
          );
        })()}
    </div>
  );
};

WidgetsContainer.propTypes = {
  getDatasets: PropTypes.func,
  getAnalytics: PropTypes.func,
  datasets: PropTypes.array,
  collections: PropTypes.array,
  datasetIsLoading: PropTypes.bool,
  collectionsIsLoading: PropTypes.bool,
};

const mapStateToProps = ({ datasets, analytics }) => ({
  datasets: datasets.datasets,
  datasetIsLoading: datasets.isLoading,
  collections: analytics.collections,
  collectionsIsLoading: analytics.isLoading,
});

const mapDispatchToProps = { getDatasets, getAnalytics };

export default connect(mapStateToProps, mapDispatchToProps)(WidgetsContainer);
