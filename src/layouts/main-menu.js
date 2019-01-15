import React, { Component } from 'react';

import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ImageIcon from '@material-ui/icons/Image';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

import { withStyles } from '@material-ui/core/styles';

import { NavLink } from '../components/nav-link';

const styles = theme => ({
    link: {
        textDecoration: 'none',
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
});

const denseIconStyles = theme => ({
    icon: {
        marginRight: 0
    }
});

const DenseListItemIcon = withStyles(denseIconStyles)(
    ({ classes, ...props }) => (
        <ListItemIcon
            {...props}
            className={classes.icon}
        ></ListItemIcon>)
);

class MainMenu extends Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Divider />
                <List dense>
                    <NavLink exact to={`/images`}>{({ active }) => (
                        <ListItem button selected={active}>
                            <DenseListItemIcon>
                                <ImageIcon />
                            </DenseListItemIcon>
                            <ListItemText primary="Upload Images" />
                        </ListItem>
                    )}
                    </NavLink>
                    <ListSubheader>Your Active Services</ListSubheader>
                    <NavLink exact to={`/page2`}>{({ active }) => (
                        <ListItem button selected={active}>
                            <DenseListItemIcon>
                                <PeopleIcon />
                            </DenseListItemIcon>
                            <ListItemText primary="Nested" />
                        </ListItem>
                    )}
                    </NavLink>
                    <ListItem button onClick={this.handleClick}>
                        <DenseListItemIcon>
                            <PersonIcon />
                        </DenseListItemIcon>
                        <ListItemText primary="User" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding dense>
                            <NavLink exact to={`/profile`}>{({ active }) => (
                                <ListItem button className={classes.nested} selected={active}>
                                    <DenseListItemIcon>
                                        <PersonIcon />
                                    </DenseListItemIcon>
                                    <ListItemText primary="Info" />
                                </ListItem>
                            )}
                            </NavLink>
                        </List>
                    </Collapse>
                </List>
                <Divider />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(MainMenu);
