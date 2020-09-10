import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  GET_COLLECTIONS,
  GET_COLLECTIONS_SUCCESS,
  GET_COLLECTIONS_ERROR,
  DELETE_VISUALIZATION,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
  FETCH_VISUALIZATIONS,
  FETCH_VISUALIZATIONS_SUCCESS,
  FETCH_VISUALIZATIONS_ERROR,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  UPDATE_COLLECTION,
  CLOSE_MODAL,
  ADD_COLLECTION_SUCCESS,
  ADD_COLLECTION_ERROR,
  GET_CURRENT_COLLECTION,
  GET_CURRENT_COLLECTION_ERROR,
  GET_CURRENT_COLLECTION_SUCCESS,
  MOVE_TO_COLLECTION,
  MOVE_TO_COLLECTION_SUCCESS,
  MOVE_TO_COLLECTION_ERROR,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_ERROR,
  UPDATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_ERROR,
  DELETE_DASHBOARD_ERROR,
  DELETE_VISUALIZATION_ERROR,
} from './actionsTypes';
import { visualizationsAPIService } from '../../services/api/visualizationsAPI.service';
import { dashboardsAPIService } from '../../services/api/dashboardsAPI.service';
import { collectionsAPIService } from '../../services/api/collectionsAPI.service';

export function* getAnalytics() {
  try {
    const { collections, defaultCollection } = yield call(collectionsAPIService.getCollections);
    const { dashboards, visualizations, ...collection } = defaultCollection;
    yield put({
      type: GET_COLLECTIONS_SUCCESS,
      payload: {
        visualizations,
        dashboards,
        collections,
        currentCollection: collection,
      },
    });
  } catch (error) {
    yield put({ type: GET_COLLECTIONS_ERROR, payload: error });
  }
}

export function* watchGetAnalyticsSaga() {
  yield takeEvery(GET_COLLECTIONS, getAnalytics);
}

export function* fetchVisualizationsSaga() {
  try {
    const visualizations = yield call(visualizationsAPIService.getVisualizations);
    yield put({ type: FETCH_VISUALIZATIONS_SUCCESS, payload: { visualizations } });
  } catch (error) {
    yield put({ type: FETCH_VISUALIZATIONS_ERROR, payload: error });
  }
}

export function* watchFetchVisualizationsSaga() {
  yield takeEvery(FETCH_VISUALIZATIONS, fetchVisualizationsSaga);
}

export function* deleteVisualizationSaga(payload) {
  try {
    yield call(visualizationsAPIService.deleteVisualization, payload.id);
    if (payload.collectionId) {
      yield put({ type: GET_CURRENT_COLLECTION, id: payload.collectionId });
    } else {
      yield put({ type: GET_COLLECTIONS });
    }
  } catch (error) {
    yield put({ type: DELETE_VISUALIZATION_ERROR, payload: error });
  }
}

export function* watchDeleteVisualizationSaga() {
  yield takeEvery(DELETE_VISUALIZATION, deleteVisualizationSaga);
}

export function* addDashboardSaga(payload) {
  yield call(dashboardsAPIService.createDashboard, payload.newDashboard);
  yield put({ type: GET_COLLECTIONS });
}

export function* watchAddDashboardSaga() {
  yield takeEvery(ADD_DASHBOARD, addDashboardSaga);
}

export function* deleteDashboardSaga(payload) {
  try {
    yield call(dashboardsAPIService.deleteDashboard, payload.id);
    if (payload.collectionId) {
      yield put({ type: GET_CURRENT_COLLECTION, id: payload.collectionId });
    } else {
      yield put({ type: GET_COLLECTIONS });
    }
  } catch (error) {
    yield put({ type: DELETE_DASHBOARD_ERROR, payload: error });
  }
}

export function* watchDeleteDashboardSaga() {
  yield takeEvery(DELETE_DASHBOARD, deleteDashboardSaga);
}

export function* addCollectionSaga({ payload }) {
  try {
    yield call(collectionsAPIService.addCollection, payload);
    yield put({ type: CLOSE_MODAL });
    yield put({ type: ADD_COLLECTION_SUCCESS });
    yield put({ type: GET_COLLECTIONS });
  } catch (error) {
    yield put({ type: ADD_COLLECTION_ERROR, payload: error });
  }
}

export function* watchAddCollectionSaga() {
  yield takeEvery(ADD_COLLECTION, addCollectionSaga);
}

export function* moveToCollectionSaga({ payload }) {
  try {
    let result;
    if (payload.dashboardId) {
      result = yield call(dashboardsAPIService.addToCollection, payload.dashboardId, payload.collection);
    } else {
      result = yield call(visualizationsAPIService.addToCollection, payload.visualizationId, payload.collection);
    }

    yield put({ type: MOVE_TO_COLLECTION_SUCCESS, payload: result.status });
    yield put({ type: CLOSE_MODAL });

    if (payload.collectionId) {
      yield put({ type: GET_CURRENT_COLLECTION, id: payload.collectionId });
    } else {
      yield put({ type: GET_COLLECTIONS });
    }
  } catch (error) {
    yield put({ type: MOVE_TO_COLLECTION_ERROR, payload: error });
    yield put({ type: CLOSE_MODAL });
  }
}

export function* watchMoveToCollectionSaga() {
  yield takeEvery(MOVE_TO_COLLECTION, moveToCollectionSaga);
}

export function* deleteCollectionSaga({ id }) {
  try {
    yield call(collectionsAPIService.deleteCollection, id);
    yield put({ type: DELETE_COLLECTION_SUCCESS });
    yield put({ type: GET_COLLECTIONS });
  } catch (error) {
    yield put({ type: DELETE_COLLECTION_ERROR, payload: error });
  }
}

export function* watchDeleteCollectionSaga() {
  yield takeEvery(DELETE_COLLECTION, deleteCollectionSaga);
}

export function* updateCollectionSaga({ payload }) {
  try {
    yield call(collectionsAPIService.updateCollection, payload.id, payload.data);
    yield put({ type: CLOSE_MODAL });
    yield put({ type: UPDATE_COLLECTION_SUCCESS });
    yield put({ type: GET_CURRENT_COLLECTION, id: payload.id });
  } catch (error) {
    yield put({ type: UPDATE_COLLECTION_ERROR, payload: error });
  }
}

export function* watchUpdateCollectionSaga() {
  yield takeEvery(UPDATE_COLLECTION, updateCollectionSaga);
}

export function* getCollectionSaga(payload) {
  try {
    const { collections } = yield call(collectionsAPIService.getCollections);
    const { dashboards, visualizations, ...collection } = yield call(collectionsAPIService.getCollection, payload.id);
    yield put({
      type: GET_CURRENT_COLLECTION_SUCCESS,
      payload: {
        visualizations,
        dashboards,
        currentCollection: collection,
        collections,
      },
    });
  } catch (error) {
    yield put({ type: GET_CURRENT_COLLECTION_ERROR, payload: error });
  }
}

export function* watchGetCollectionSaga() {
  yield takeEvery(GET_CURRENT_COLLECTION, getCollectionSaga);
}

export default function* analyticsSaga() {
  yield all([
    watchGetAnalyticsSaga(),
    watchDeleteVisualizationSaga(),
    watchAddDashboardSaga(),
    watchDeleteDashboardSaga(),
    watchFetchVisualizationsSaga(),
    watchAddCollectionSaga(),
    watchDeleteCollectionSaga(),
    watchUpdateCollectionSaga(),
    watchGetCollectionSaga(),
    watchMoveToCollectionSaga(),
  ]);
}
