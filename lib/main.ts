#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkTemplateStack } from './stacks/cdkTemplateStack';

const app = new cdk.App();
new CdkTemplateStack(app, 'CdkTemplateStack', {

    
});