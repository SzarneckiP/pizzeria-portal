import React from 'react';
import styles from './Event.scss';
import PropTypes from 'prop-types';

const Event = ({ id }) => (
  <div className={styles.component}>
    <h2>Event</h2>
    {id}
  </div>
);

Event.propTypes = {
  id: PropTypes.string,
};

export default Event;
