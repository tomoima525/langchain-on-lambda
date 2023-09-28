import { BufferMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "langchain/stores/message/dynamodb";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { getSecret } from "./secretManager";

type Props = {
  id: string;
  message: string;
};

export const handler = async ({ id, message }: Props): Promise<any> => {
  const memory = new BufferMemory({
    chatHistory: new DynamoDBChatMessageHistory({
      tableName: process.env.TABLE_NAME as string,
      partitionKey: "id",
      sessionId: id,
      config: {
        region: "us-west-2",
      },
    }),
  });

  const openAIApiKey = await getSecret("OPEN_API_KEY");
  const model = new ChatOpenAI({ openAIApiKey });
  const chain = new ConversationChain({ llm: model, memory });
  const res = await chain.call({ input: message });
  console.log("prompt: " + message);
  console.log("response: " + res.response);
  return {
    res,
  };
};
