import React from 'react';
import styles from './Order.scss';
import PropTypes from 'prop-types';

const Order = ({ id }) => (
  <div className={styles.component}>
    <h2>Order </h2>
    {id}
  </div>
);

Order.propTypes = {
  id: PropTypes.string,
};

export default Order;
