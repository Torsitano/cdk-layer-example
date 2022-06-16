import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3'
import { AssumeRoleCommand, AssumeRoleCommandOutput, Credentials, STSClient } from '@aws-sdk/client-sts'
import { AdaptiveRetryStrategy } from '@aws-sdk/middleware-retry'

interface ClientParams {
    region: string,
    credentials?: {
        accessKeyId: string,
        secretAccessKey: string,
        sessionToken: string
    },
    retryStrategy?: any
}

/**
 * 
 * @param region 
 * @param clientType 
 * @param sessionCredentials 
 * @returns 
 */
function setupClient<Type>(region: string, clientType: {new(params: ClientParams): Type}, sessionCredentials?: Credentials): Type {

    const MAXIMUM_RETRY_DELAY = 30 * 1000

    const delayDecider = (delayBase: number, attempts: number) =>
    Math.floor(Math.min(MAXIMUM_RETRY_DELAY, 2 ** attempts * delayBase))
    
    if (sessionCredentials) {
        return new clientType({
            region: region,
            credentials: {
                accessKeyId: sessionCredentials.AccessKeyId!,
                secretAccessKey: sessionCredentials.SecretAccessKey!,
                sessionToken: sessionCredentials.SessionToken!
            },
            retryStrategy: new AdaptiveRetryStrategy(() => Promise.resolve(10), {delayDecider})
        })
    }
    else {
        return new clientType({
            region: region,
            retryStrategy: new AdaptiveRetryStrategy(() => Promise.resolve(10), {delayDecider})
        })
    }
}


export class S3Example {
    client: S3Client

    constructor( region: string, sessionCredentials?: Credentials ) {
        this.client = setupClient(region, S3Client ,sessionCredentials)
    }

    async getAllBucketNames(): Promise<string[]> {
        const bucketNames: string[] = []
        const buckets = ( await this.client.send( new ListBucketsCommand({}) ) ).Buckets

        if (!buckets) {
            return []
        }

        for ( let bucket of buckets ) {
            bucketNames.push(bucket.Name!)
        }

        return bucketNames
    }
}


export class StsExample {
    client: STSClient

    constructor( region: string, sessionCredentials?: Credentials ) {
        this.client = setupClient(region, STSClient ,sessionCredentials)
    }

    async getSessionCredentials( roleName: string, awsAccount: string, sessionName: string): Promise<Credentials> {
        const assumeRoleCommand = new AssumeRoleCommand({
            RoleArn: `arn:aws:iam::${awsAccount}:role/${roleName}`,
            RoleSessionName: sessionName
        })

        const session: AssumeRoleCommandOutput = await this.client.send(assumeRoleCommand)

        if (session.Credentials) {
            return session.Credentials
        } else {
            throw new Error('Error getting credentials')
        }
    }
}