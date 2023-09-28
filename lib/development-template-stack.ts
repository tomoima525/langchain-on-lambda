import { Aws, Duration, Stack, StackProps, aws_lambda as lambda, aws_dynamodb as dynamodb } from "aws-cdk-lib";
import * as lambda_nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path = require("path");
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import dbjson from "../bin/db.json";

export class DevelopmentTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const tableArn = dbjson["LLM-Experiment-DB"].table;

    const table = dynamodb.Table.fromTableAttributes(this, "Langchain", {
      tableArn,
    });

    const secretManagerPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["secretsmanager:GetSecretValue"],
      resources: [
        `arn:aws:secretsmanager:${Aws.REGION}:${Aws.ACCOUNT_ID}:secret:*`,
      ],
    });

    const chatbotLambda = new lambda_nodejs.NodejsFunction(
      this,
      "chatbot-lambda",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "handler",
        entry: path.join(
          `${__dirname}/../`,
          "functions",
          "chatbot-lambda/index.ts",
        ),
        environment: {
          TABLE_NAME: table.tableName,
        },
        memorySize: 512,
        timeout: Duration.seconds(30),
      },
    );
    table.grantReadWriteData(chatbotLambda);
    chatbotLambda.addToRolePolicy(secretManagerPolicy);
  }
}
