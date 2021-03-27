import React from 'react';
import styles from './Booking.scss';
import PropTypes from 'prop-types';

const Booking = (props) => (
  <div className={styles.component}>
    <h2>BOOKING</h2>
    { props.match.params.id}
  </div>
);

Booking.propTypes = {
  match: PropTypes.object,
};

export default Booking;
