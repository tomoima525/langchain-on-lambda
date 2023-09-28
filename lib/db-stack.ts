import { aws_dynamodb as ddb, CfnOutput } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class DynamoDBStack extends cdk.Stack {
  public readonly table: ddb.Table;
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.table = new ddb.Table(this, "LangChain", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "table", {
      value: this.table.tableArn,
    });
  }
}
