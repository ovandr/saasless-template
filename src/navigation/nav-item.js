import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
    marginRight: 0
  },
  active: {
    backgroundColor: theme.palette.action.selected
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class NavItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      <ListItem
        button
        component={NavLink}
        exact
        to={this.props.path}
        activeClassName={classes.active}
        className={{
          [classes.nested]: this.props.isNested
        }}
      >
        <ListItemIcon className={classes.icon}>
          <Icon>{this.props.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={this.props.name} />
      </ListItem>
    )
  }
}

export default withStyles(styles)(NavItem);
