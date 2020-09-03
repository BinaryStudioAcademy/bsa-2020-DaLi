/* eslint-disable */
import React, {useState} from 'react';
import { ViewVisualizationContainer } from '../../containers';

const ViewVisualizationPage = (props) => {
  return <ViewVisualizationContainer visualizationId={props.match.params.id} tableId={props.match.params.tableId} visualizationType={props.match.params.type} />;
};

export default ViewVisualizationPage;
