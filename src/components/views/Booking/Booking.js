import React from 'react';
import styles from './Booking.scss';
import PropTypes from 'prop-types';

const Booking = ({ id }) => (
  <div className={styles.component}>
    <h2>BOOKING</h2>
    {id}
  </div>
);

Booking.propTypes = {
  id: PropTypes.string,
};

export default Booking;
