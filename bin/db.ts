#!/usr/bin/env node
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DynamoDBStack } from "../lib/db-stack";

dotenv.config();
const app = new cdk.App();
new DynamoDBStack(app, `LLM-Experiment-DB`, {
  env: {
    account: process.env.CDK_ACCOUNT,
    region: process.env.CDK_REGION,
  },
});
