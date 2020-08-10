/* eslint-disable */
import React, {useState} from 'react';
import { ViewVisualizationContainer } from '../../containers';

const ViewVisualizationPage = (props) => {
  return <ViewVisualizationContainer id={props.match.params.id} />;
};

export default ViewVisualizationPage;
