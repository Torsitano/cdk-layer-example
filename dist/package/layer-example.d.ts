import { S3Client } from '@aws-sdk/client-s3';
import { Credentials, STSClient } from '@aws-sdk/client-sts';
export declare class S3Example {
    client: S3Client;
    constructor(region: string, sessionCredentials?: Credentials);
    getAllBucketNames(): Promise<string[]>;
}
export declare class StsExample {
    client: STSClient;
    constructor(region: string, sessionCredentials?: Credentials);
    getSessionCredentials(roleName: string, awsAccount: string, sessionName: string): Promise<Credentials>;
}
