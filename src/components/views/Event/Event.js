import React from 'react';
import styles from './Event.scss';
import PropTypes from 'prop-types';

const Event = (props) => (
  <div className={styles.component}>
    <h2>Event</h2>
    { props.match.params.id}
  </div>
);

Event.propTypes = {
  match: PropTypes.object,
};

export default Event;
