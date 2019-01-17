import React, { Component } from 'react';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class CollapseItem extends Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon style={{ marginRight: 0 }}>
            <Icon>{this.props.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={this.props.name} />
          <ListItemIcon style={{ marginRight: 0 }}>
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {this.props.children}
          </List>
        </Collapse>
      </React.Fragment>
    )
  }
}
