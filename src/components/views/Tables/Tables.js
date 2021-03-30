
import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';
import { tables } from '../../../data/tablesData';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';





const Tables = () => {

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (

    <div className={styles.component}>
      <h2>Tables View</h2>
      <Link to={`${process.env.PUBLIC_URL}/tables/booking/new`}> New Booking </Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/booking/456`}> Booking ID </Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/events/new`}> New Event </Link>
      <Link to={`${process.env.PUBLIC_URL}/tables/events/789`}> Event ID </Link>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">Hours</TableCell>
              <TableCell align="center">Table 1</TableCell>
              <TableCell align="center">Table 2</TableCell>
              <TableCell align="center">Table 3</TableCell>
              <TableCell align="center">Table 4</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map((tables) => (
              <TableRow key={tables.id} >
                <TableCell align="center" component="th" scope="row">
                  {tables.hours}
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
};

export default Tables;
