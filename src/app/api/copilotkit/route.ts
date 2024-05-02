import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/backend";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const copilotKit = new CopilotRuntime({});
  const openaiModel = process.env["OPENAI_MODEL"];

  return copilotKit.response(req, new OpenAIAdapter({ model: openaiModel }));
}
