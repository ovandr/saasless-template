import React from 'react';
import { Route, Link } from 'react-router-dom';

import { withStyles, WithStyles } from '@material-ui/core/styles';

const styles = {
    link: {
        textDecoration: 'none',
    },
};

interface Props extends WithStyles<typeof styles> {
    to: string;
    children: Function;
}

const link: React.SFC<Props> = ({ to, children, classes, ...rest }) => (
    <Link to={to} className={classes.link}>
        <Route path={to} children={({ match }) => (children as Function)({ active: !!match })} {...rest} />
    </Link>
);

export const NavLink = withStyles(styles)(link);
