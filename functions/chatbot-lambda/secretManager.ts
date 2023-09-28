import {
  SecretsManagerClient,
  GetSecretValueCommandInput,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secretManager = new SecretsManagerClient({ region: "us-west-2" });

export const getSecret = async (SecretId: string): Promise<string> => {
  const params: GetSecretValueCommandInput = {
    SecretId,
  };

  const command = new GetSecretValueCommand(params);
  const data = await secretManager.send(command);
  // Decrypts secret using the associated KMS key.
  // Depending on whether the secret is a string or binary, one of these fields will be populated.
  if (data.SecretString) {
    const json = JSON.parse(data.SecretString);
    return json.PK;
  } else {
    throw new Error("No String");
  }
};
