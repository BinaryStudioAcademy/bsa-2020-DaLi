/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { InitialTable } from '../../components/index';

class InitialTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, userId: 1, productId: 1, total: 963.84, discount: 1.49, createdAt: '1567655454000', quantity: 33 },
        { id: 2, userId: 2, productId: 2, total: 774.33, discount: 13.21, createdAt: '1589701805000', quantity: 59 },
        { id: 3, userId: 3, productId: 3, total: 171.63, discount: 17.22, createdAt: '1575535794000', quantity: 57 },
        { id: 4, userId: 4, productId: 4, total: 966.46, discount: 9.24, createdAt: '1579608272000', quantity: 58 },
        { id: 5, userId: 5, productId: 5, total: 441.38, discount: 18.97, createdAt: '1596427451000', quantity: 26 },
        { id: 6, userId: 6, productId: 6, total: 534.71, discount: 3.54, createdAt: '1582318825000', quantity: 15 },
        { id: 7, userId: 7, productId: 7, total: 210.39, discount: 3.5, createdAt: '1582663321000', quantity: 10 },
        { id: 8, userId: 8, productId: 8, total: 991.35, discount: 10.7, createdAt: '1569735016000', quantity: 49 },
      ],
    };
  }

  render() {
    const { data } = this.state;
    return <InitialTable data={this.props.data} />;
  }
}

export default InitialTableContainer;
