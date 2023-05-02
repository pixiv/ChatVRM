import { Configuration, OpenAIApi } from "openai";
import { Message } from "../messages/messages";

export async function getChatResponse(messages: Message[], apiKey: string) {
  if (!apiKey) {
    throw new Error("Invalid API Key");
  }

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  // ブラウザからAPIを叩くときに発生するエラーを無くすworkaround
  // https://github.com/openai/openai-node/issues/6#issuecomment-1492814621
  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);

  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  const [aiRes] = data.choices;
  const message = aiRes.message?.content || "エラーが発生しました";

  return { message: message };
}

export async function getChatResponseStream(
  messages: Message[],
  apiKey: string
) {
  if (!apiKey) {
    throw new Error("Invalid API Key");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
      stream: true,
      max_tokens: 200,
    }),
  });

  return readChatResponseStream(res);
}

export async function getAzureChatResponseStream(
  messages: Message[],
  apiKey: string,
  resourceName: string,
  deploymentName: string
) {
  if (!apiKey) {
    throw new Error("Invalid API Key");
  }
  if (!resourceName) {
    throw new Error("Invalid Resource Name");
  }
  if (!deploymentName) {
    throw new Error("Invalid Deployment Name");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "api-key": apiKey,
  };

  const apiVersion = "2023-03-15-preview";
  const res = await fetch(`https://${resourceName}.openai.azure.com/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`, {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      messages: messages,
      stream: true,
      max_tokens: 200,
    }),
  });

  return readChatResponseStream(res);
}

async function readChatResponseStream(
  res: Response
): Promise<ReadableStream> {
  const reader = res.body?.getReader();
  if (res.status !== 200 || !reader) {
    throw new Error("Something went wrong");
  }

  const stream = new ReadableStream({
    async start(controller: ReadableStreamDefaultController) {
      const decoder = new TextDecoder("utf-8");
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const data = decoder.decode(value);
          const chunks = data
            .split("data:")
            .filter((val) => !!val && val.trim() !== "[DONE]");
          for (const chunk of chunks) {
            const json = JSON.parse(chunk);
            const messagePiece = json.choices[0].delta.content;
            if (!!messagePiece) {
              controller.enqueue(messagePiece);
            }
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        reader.releaseLock();
        controller.close();
      }
    },
  });

  return stream;
}
