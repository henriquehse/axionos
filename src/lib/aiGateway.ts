/**
 * AxionOS AI Gateway — Multi-Provider Integration Layer
 * Routes prompts to the best available LLM based on task type and cost.
 */

export type AIProvider = "gemini" | "openai" | "groq" | "mistral" | "perplexity" | "cerebras";

export type TaskType =
  | "code_generation"
  | "architecture"
  | "discovery"
  | "research"
  | "repair"
  | "fast_inference"
  | "general";

// Provider routing table — best model per task type
const ROUTING_TABLE: Record<TaskType, AIProvider> = {
  code_generation: "groq",        // Fast + capable for code
  architecture:    "gemini",       // Large context, system design
  discovery:       "perplexity",   // Real-time research
  research:        "perplexity",   // Web-grounded answers
  repair:          "gemini",       // Careful reasoning
  fast_inference:  "cerebras",     // Ultra-fast
  general:         "gemini",       // Default
};

// Model IDs per provider
const MODEL_MAP: Record<AIProvider, string> = {
  gemini:     "gemini-2.0-flash-exp",
  openai:     "gpt-4o-mini",
  groq:       "llama-3.3-70b-versatile",
  mistral:    "mistral-large-latest",
  perplexity: "llama-3.1-sonar-large-128k-online",
  cerebras:   "llama3.1-70b",
};

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model: string;
  tokensUsed?: number;
}

// --- Provider Implementations ---

async function callGemini(messages: AIMessage[]): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = MODEL_MAP.gemini;

  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

  const systemInstruction = messages.find((m) => m.role === "system")?.content;

  const body: Record<string, unknown> = { contents };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );

  if (!res.ok) throw new Error(`Gemini error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return { content, provider: "gemini", model };
}

async function callOpenAI(messages: AIMessage[]): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const model = MODEL_MAP.openai;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature: 0.7 }),
  });

  if (!res.ok) throw new Error(`OpenAI error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    provider: "openai",
    model,
    tokensUsed: data.usage?.total_tokens,
  };
}

async function callGroq(messages: AIMessage[]): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const model = MODEL_MAP.groq;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature: 0.6, max_tokens: 4096 }),
  });

  if (!res.ok) throw new Error(`Groq error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    provider: "groq",
    model,
    tokensUsed: data.usage?.total_tokens,
  };
}

async function callPerplexity(messages: AIMessage[]): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
  const model = MODEL_MAP.perplexity;

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 2048 }),
  });

  if (!res.ok) throw new Error(`Perplexity error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return { content: data.choices[0].message.content, provider: "perplexity", model };
}

async function callCerebras(messages: AIMessage[]): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_CEREBRAS_API_KEY;
  const model = MODEL_MAP.cerebras;

  const res = await fetch("https://api.cerebras.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 2048 }),
  });

  if (!res.ok) throw new Error(`Cerebras error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return { content: data.choices[0].message.content, provider: "cerebras", model };
}

// --- Main Gateway Function ---

export async function callAI(
  messages: AIMessage[],
  taskType: TaskType = "general",
  forceProvider?: AIProvider
): Promise<AIResponse> {
  const provider = forceProvider ?? ROUTING_TABLE[taskType];

  const handlers: Record<AIProvider, () => Promise<AIResponse>> = {
    gemini:     () => callGemini(messages),
    openai:     () => callOpenAI(messages),
    groq:       () => callGroq(messages),
    mistral:    () => callGroq(messages), // Fallback to Groq if Mistral not implemented
    perplexity: () => callPerplexity(messages),
    cerebras:   () => callCerebras(messages),
  };

  try {
    return await handlers[provider]();
  } catch (err) {
    console.warn(`[AI Gateway] ${provider} failed, falling back to Gemini:`, err);
    return await callGemini(messages);
  }
}

// --- Agent Execution Helper ---

export interface AgentConfig {
  name: string;
  systemPrompt: string;
  taskType: TaskType;
}

export async function runAgent(
  agent: AgentConfig,
  userInput: string,
  context?: string
): Promise<AIResponse> {
  const messages: AIMessage[] = [
    { role: "system", content: agent.systemPrompt + (context ? `\n\nContext:\n${context}` : "") },
    { role: "user", content: userInput },
  ];

  console.log(`[AxionOS] Agent "${agent.name}" running via ${ROUTING_TABLE[agent.taskType]}...`);
  return callAI(messages, agent.taskType);
}

// --- Pre-configured Agents (32-stage pipeline) ---

export const AXION_AGENTS = {
  discovery: {
    name: "Discovery Agent",
    taskType: "discovery" as TaskType,
    systemPrompt:
      "You are an expert market analyst and product discovery agent. Analyze ideas for market opportunity, competitive landscape, revenue potential, and technical feasibility. Provide structured JSON output.",
  },
  architect: {
    name: "Architecture Agent",
    taskType: "architecture" as TaskType,
    systemPrompt:
      "You are a senior software architect. Design complete system architectures including database schema, API contracts, component trees, and deployment topology. Output structured technical specifications.",
  },
  engineer: {
    name: "Engineering Agent",
    taskType: "code_generation" as TaskType,
    systemPrompt:
      "You are an elite full-stack engineer. Generate production-ready code following best practices. Output clean, typed, tested code with proper error handling.",
  },
  repair: {
    name: "Repair Agent",
    taskType: "repair" as TaskType,
    systemPrompt:
      "You are a debugging specialist. Analyze error logs, identify root causes, generate targeted patches, and verify fixes. Always explain your reasoning.",
  },
  research: {
    name: "Research Agent",
    taskType: "research" as TaskType,
    systemPrompt:
      "You are a technical research specialist with real-time web access. Find current best practices, benchmark data, and competitive intelligence. Cite sources when possible.",
  },
} as const;
