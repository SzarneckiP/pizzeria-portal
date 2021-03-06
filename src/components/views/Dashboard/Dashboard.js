import React from 'react';
import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import BallotIcon from '@material-ui/icons/Ballot';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailsIcon from '@material-ui/icons/Details';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const lists = [
  {
    id: 'Reservation',
    table: 'Table-1',
    time: '11:30',
    duration: '1h',
    people: '2',
    details: '',
  },
  {
    id: 'Event',
    table: 'Table-2',
    time: '18:00',
    duration: '4h',
    people: '4',
    details: 'Birthday',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  basePadding: {
    padding: '20px 0',
  },
  formGroup: {
    marginTop: '80px',
  },
}));




const Dashboard = (props) => {
  const classes = useStyles();
  const [dense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={styles.component}>
      <Typography variant='h2'>Dashboard View</Typography>
      <Grid>
        <Grid className={classes.basePadding}>
          <Typography variant="h6" className={classes.title}>
            Today&apos;s Orders
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Orders in Restaurant</TableCell>
                <TableCell align="center">Takeaway Orders</TableCell>
                <TableCell align="center">Table Reservation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              <TableCell align="center">7</TableCell>
              <TableCell align="center">4</TableCell>
              <TableCell align="center">3</TableCell>
            </TableBody>
          </Table>
        </Grid>
        <FormGroup className={classes.formGroup} row margin="normal" >
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={(event) => setSecondary(event.target.checked)}
              />
            }
            label="Enable details"
          />
        </FormGroup>
        <Grid >
          <Typography variant="h6" className={classes.title}>
            Reservations and Events
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {lists.map((lists) => (
                <ListItem key={lists.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <BallotIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={lists.id + ' ' + lists.details + ' ' + lists.table}
                    secondary={secondary ? lists.time + ' Duration: ' + lists.duration + ' People: ' + lists.people : null}
                  />
                  <ListItemSecondaryAction edge="end" aria-label="details">
                    <IconButton component={Link} to={'/tables'}>
                      <DetailsIcon color='primary' />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon color='primary' />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div >
  );
};

export default Dashboard;
