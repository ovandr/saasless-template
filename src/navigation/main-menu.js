import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import navigation from './navigation';
import CollapseNavItem from './collapse-item';
import NavItem from './nav-item';

export default class MainMenu extends Component {

  renderList(items) {
    return items.map((item) => this.renderItem(item));
  }

  renderItem(item) {
    return (
      item.header ? this.renderHeader(item) :
        item.children ? this.renderCollapse(item) :
          item.divider ? <Divider /> :
            this.renderSimpleItem(item)
    );
  }

  renderHeader(item) {
    return (<ListSubheader>{item.header}</ListSubheader>)
  }

  renderCollapse(item) {
    return (
      <CollapseNavItem {...item}>
        <List disablePadding>
          {this.renderList(item.children)}
        </List>
      </CollapseNavItem>
    );
  }

  renderSimpleItem(item) {
    return (<NavItem {...item}></NavItem>)
  }

  render() {
    return (
      <List disablePadding>
        {this.renderList(navigation)}
      </List>
    )
  }
}
