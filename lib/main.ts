#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkLayerExampleStack} from './stacks/cdkLayerExampleStack';

const app = new cdk.App();
new CdkLayerExampleStack(app, 'CdkLayerExampleStack', {

    
});