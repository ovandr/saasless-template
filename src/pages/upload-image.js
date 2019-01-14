import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

// Components
import AllPhotos from "../components/all-photos";
import AddPhoto from "../components/add-photo";

import awsconfig from '../aws-exports';
const S3_BUCKET_REGION = awsconfig.aws_user_files_s3_bucket_region
const S3_BUCKET_NAME = awsconfig.aws_user_files_s3_bucket

export class Page1 extends Component {
    render() {
        return (
            <Card>
                <CardHeader title="Upload Photo Page" />
                <CardContent>
                    <AddPhoto options={{ bucket: S3_BUCKET_NAME, region: S3_BUCKET_REGION }} />
                    <AllPhotos />
                </CardContent>
            </Card>
        )
    }
}
