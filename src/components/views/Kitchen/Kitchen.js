import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Kitchen.module.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import BallotIcon from '@material-ui/icons/Ballot';
import DeleteIcon from '@material-ui/icons/Delete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const kitchenLists = [
  {
    id: 'On-Site',
    table: 'Table 3',
    name: 'DINER',
    option: ['Tomato Sup', 'Beef with Onions', 'Tea', 'Salad'],
    amount: 2,
    price: '25',
    orderTime: 'Order Time: 12:32',
  },
  {
    id: 'Takeaway',
    table: '',
    name: 'PIZZA',
    option: ['chicken', 'tomato', 'garlick', 'mushrooms'],
    amount: 1,
    orderTime: 'Order Time: 12:41',
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
}));


const Kitchen = () => {
  const classes = useStyles();
  const [dense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (

    <div className={styles.component}>
      <FormGroup row margin="normal" >
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Show details"
        />
      </FormGroup>
      <div className={classes.demo}>
        <List dense={dense}>
          {kitchenLists.map((orders) => (
            <ListItem key={orders.id}>
              <ListItemAvatar>
                <Avatar>
                  <BallotIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={orders.id + orders.table + ': ' + orders.name + ' ' + orders.orderTime}
                secondary={secondary ? orders.name + ': [' + orders.option.join(', ') + '] Amount: ' + orders.amount : null}
              />
              <ListItemSecondaryAction edge="end" aria-label="details">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedB"
                      color="secondary"
                    />
                  }
                  label="Realized"
                />
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Kitchen;
