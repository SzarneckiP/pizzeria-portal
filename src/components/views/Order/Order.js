import React from 'react';
import styles from './Order.scss';
import PropTypes from 'prop-types';

const Order = (props) => (
  < div className={styles.component} >
    <h2>Order </h2>
    { props.match.params.id}
  </div >
);

Order.propTypes = {
  match: PropTypes.object,
};

export default Order;
