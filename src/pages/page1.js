import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export class Page1 extends Component {
    render() {
        return (
            <Card>
                <CardHeader title="Page1 Title" />
                <CardContent>
                    Page1 Content
                </CardContent>
                <CardActions>
                    <Button>Page1 Button</Button>
                </CardActions>
            </Card>
        )
    }
}
