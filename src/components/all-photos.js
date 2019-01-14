import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { QueryListPictures } from "../graphql";

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Storage } from 'aws-amplify';

class AllPhotos extends Component {

    async handleDownload({ visibility: level, file }) {
        try {
            const { bucket, region, key } = file;
            const [, , keyWithoutPrefix] = /([^/]+\/){2}(.*)$/.exec(key) || key;

            const url = await Storage.get(keyWithoutPrefix, { bucket, region, level });

            window.open(url);
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>PhotoId</TableCell>
                        <TableCell>Friendly name</TableCell>
                        <TableCell>Visibility</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Created at</TableCell>
                        <TableCell>Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.photos && this.props.photos.items && [].concat(this.props.photos.items).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(photo => (
                        <TableRow key={photo.id}>
                            <TableCell>{photo.file && photo.id}</TableCell>
                            <TableCell>{photo.name}</TableCell>
                            <TableCell>{photo.visibility}</TableCell>
                            <TableCell>{photo.owner}</TableCell>
                            <TableCell>{photo.file && photo.createdAt}</TableCell>
                            <TableCell>
                                {photo.file ? <Button onClick={this.handleDownload.bind(this, photo)}>Download</Button> : <div>loading</div>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}

export default graphql(
    QueryListPictures,
    {
        options: {
            fetchPolicy: 'cache-and-network',
        },
        props: ({ data: { listPictures: photos } }) => ({
            photos,
        })
    }
)(AllPhotos);
