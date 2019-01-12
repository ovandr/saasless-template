import React from 'react';
import { Route, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    link: {
        textDecoration: 'none',
    },
});

export const NavLink = withStyles(styles)(({ to, children, classes, ...rest }) => (
    <Link to={to} className={classes.link}>
        <Route path={to} children={({ match }) => children({ active: !!match })} {...rest} />
    </Link>
));
