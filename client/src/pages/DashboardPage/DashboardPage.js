/* eslint-disable */
import React from 'react';
import { DashboardContainer } from '../../containers';

const DashboardPage = (props) => {
  return <DashboardContainer id={props.match.params.id} />;
};

export default DashboardPage;
