import React from 'react';
import styles from './Waiter.module.scss';
import { Link } from 'react-router-dom';

const Waiter = () => (
  <div className={styles.component}>
    <h2>Waiter View</h2>
    <Link to={`${process.env.PUBLIC_URL}/waiter/order/new`}> NEW Order </Link>
    <Link to={`${process.env.PUBLIC_URL}/waiter/order/123`}> Order ID </Link>
  </div>
);

export default Waiter;
