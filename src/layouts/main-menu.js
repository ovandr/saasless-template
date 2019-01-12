import React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';

import { withStyles } from '@material-ui/core/styles';

import { NavLink } from '../components/nav-link';

const styles = theme => ({
    link: {
        textDecoration: 'none',
    },
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


export default withStyles(styles)(({ classes }) => {
    return <React.Fragment>
        <Divider />
        <List dense>
            <NavLink exact to={`/`}>{({ active }) => (
                <ListItem button selected={active}>
                    <DenseListItemIcon>
                        <HomeIcon />
                    </DenseListItemIcon>
                    <ListItemText primary="Page1" />
                </ListItem>
            )}
            </NavLink>
            <ListSubheader>Your Active Services</ListSubheader>
            <NavLink exact to={`/page2`}>{({ active }) => (
                <ListItem button selected={active}>
                    <DenseListItemIcon>
                        <PeopleIcon />
                    </DenseListItemIcon>
                    <ListItemText primary="Page2" />
                </ListItem>
            )}
            </NavLink>
        </List>
        <Divider />
    </React.Fragment>;
});
