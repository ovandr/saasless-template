import React, { Component } from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import navigation from './navigation';
import CollapseNavItem from './collapse-item';
import NavItem from './nav-item';

export default class MainMenu extends Component {

  renderList(items) {
    return items.map((item, index) => this.renderItem(item, index));
  }

  renderItem(item, index) {
    return (
      item.children ? this.renderCollapse(item, index) :
        item.divider ? <Divider key={index} /> :
          <NavItem key={index} {...item}></NavItem>
    );
  }

  renderCollapse(item, index) {
    return (
      <CollapseNavItem key={index} {...item}>
        <List disablePadding>
          {this.renderNestedList(item.children)}
        </List>
      </CollapseNavItem>
    );
  }

  renderNestedList(items) {
    return items.map((item, index) => <NavItem key={index} {...item} isNested></NavItem>);
  }

  render() {
    return (
      <List disablePadding>
        {this.renderList(navigation)}
      </List>
    )
  }
}
