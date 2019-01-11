import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export class Page2 extends Component {
    render() {
        return (
            <Card>
                <CardHeader title="Page2 Title" />
                <CardContent>
                    Page2 Content
                </CardContent>
                <CardActions>
                    <Button>Page2 Button</Button>
                </CardActions>
            </Card>
        )
    }
}
