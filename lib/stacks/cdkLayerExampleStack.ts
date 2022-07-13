import { Stack, StackProps } from 'aws-cdk-lib'
import { Architecture, Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'


export class CdkLayerExampleStack extends Stack {
    constructor ( scope: Construct, id: string, props?: StackProps ) {
        super( scope, id, props )

        new LayerVersion( this, 'LayerExample', {
            layerVersionName: 'TsCdkLayerExample',
            compatibleRuntimes: [
                Runtime.NODEJS_16_X
            ],
            code: Code.fromAsset( './dist/layer' ),
            compatibleArchitectures: [
                Architecture.X86_64
            ]
        } )
    }
}