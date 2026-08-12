/**
 * The assistant's knowledge base.
 *
 * This runs entirely in the browser against a fixed set of answers — there is
 * no model behind it. That is a deliberate trade: every answer here is one I
 * would actually give, so it can't drift, hallucinate a project I never built,
 * or quote a rate I never agreed to. Matching is keyword scoring, not
 * generation.
 */

export type Intent = {
  id: string;
  /** Shown as a starter chip when set. */
  suggestion?: string;
  /**
   * Decisive terms, scored well above ordinary keywords. Length is a poor
   * proxy for how much a word tells you: "ai" is short but pins the topic
   * exactly, while "experience" is long and says almost nothing on its own.
   */
  strong?: string[];
  keywords: string[];
  answer: string;
};

export const intents: Intent[] = [
  {
    id: "who",
    suggestion: "Who am I talking to?",
    strong: ["who are you", "who is sabir", "introduce", "yourself"],
    keywords: ["about you", "about sabir", "who", "bio"],
    answer:
      "Sabir Ud Din — a software engineer based in Islamabad, four years in, three of them building AI features that run in production. Backend is my centre of gravity: Python and Node services, retrieval pipelines, agent workflows, and the automation that removes manual steps around them. Most of what I've built I owned from architecture through to deployment.",
  },
  {
    id: "hire",
    suggestion: "Are you available for work?",
    strong: ["available", "availability", "hire", "hiring", "freelance", "work together", "recruit"],
    keywords: ["contract", "job", "open to", "opportunity"],
    answer:
      "Yes — open to selective work. The best fit is anything where an AI or backend system has to genuinely hold up in production, or where a business is drowning in manual steps that should be a pipeline. Email codexsabir@gmail.com with roughly what you're trying to solve and I'll tell you honestly whether I'm the right person.",
  },
  {
    id: "ai",
    suggestion: "What's your AI experience?",
    strong: [
      "ai",
      "llm",
      "gpt",
      "openai",
      "claude",
      "anthropic",
      "rag",
      "agent",
      "agents",
      "langchain",
      "langgraph",
      "machine learning",
    ],
    keywords: ["retrieval", "embedding", "embeddings", "vector", "semantic search", "prompt"],
    answer:
      "Three years of it, in production rather than in notebooks. Retrieval-augmented pipelines on vector databases (Pinecone, Chroma) with semantic search; autonomous agents built on LangGraph and LangChain that run multi-step operational work on their own; LLM integrations across OpenAI, Anthropic Claude, and open-source models. The part people underrate is everything around the model — evaluation, guardrails, retries, observability. That's what decides whether it survives real users.",
  },
  {
    id: "backend",
    suggestion: "What's your backend stack?",
    strong: ["backend", "back end", "fastapi", "nestjs", "nodejs", "microservice", "websocket"],
    keywords: ["api", "python", "node", "express", "server", "rest", "auth", "rbac"],
    answer:
      "Python (FastAPI) and Node.js (NestJS, Express) are home. REST API design, microservices, WebSockets for real-time, authentication and role-based access control. I've built real-time chat systems, e-learning backends, and the API layer behind production AI systems — plus the query tuning and schema work underneath them.",
  },
  {
    id: "data",
    strong: ["database", "postgres", "postgresql", "mongo", "mongodb", "mysql", "supabase", "sql"],
    keywords: ["db", "pinecone", "chroma", "schema", "query"],
    answer:
      "PostgreSQL, MongoDB, MySQL, and Supabase for application data; Pinecone and Chroma for vector search. I do the schema design and the query tuning myself — most of the performance problems I've been handed turned out to be a data model question wearing a performance costume.",
  },
  {
    id: "frontend",
    strong: ["frontend", "front end", "react", "nextjs", "next.js", "typescript", "tailwind"],
    keywords: ["ui", "css", "design"],
    answer:
      "React, Next.js, and TypeScript. I'm a backend engineer first, but I build the frontend too — which mostly makes me better at designing APIs that are pleasant to consume. At Brandora a reusable component architecture and tighter state management cut our frontend build time by about 30%. This site is Next.js.",
  },
  {
    id: "automation",
    strong: ["automation", "automate", "n8n", "zapier", "make.com", "webhook", "whatsapp"],
    keywords: ["workflow", "integration", "crm", "payment", "third party"],
    answer:
      "This is a lot of what I do. n8n, Make, and Zapier where they fit, custom orchestration where they don't — wired into WhatsApp, CRMs, payment providers, and whatever else the business already runs on. My rule is simple: the third time someone does a task by hand, it should have been a pipeline.",
  },
  {
    id: "experience",
    suggestion: "Where have you worked?",
    strong: ["work history", "career", "companies", "employer", "brandora", "moosa", "uzair", "bit and bytes"],
    keywords: ["experience", "worked", "background", "years", "how long", "senior"],
    answer:
      "Currently Senior Software Engineer at Bit and Bytes LLC in Lahore. Before that, three years at Brandora in Islamabad — first as a Full Stack Developer, then leading AI workflow automation. Alongside that I built moosa.tv end to end for Moosa Edu in Riyadh, and I started out doing backend work at Uzair Technology in Kohat. Four years professional in total.",
  },
  {
    id: "projects",
    suggestion: "What have you built?",
    strong: ["project", "projects", "portfolio", "case study", "legaldoc", "mediflow", "edututor", "bridgerex", "shamay", "moosa.tv"],
    keywords: ["built", "build", "shipped", "examples"],
    answer:
      "A few worth naming: LegalDoc AI extracts contract clauses and flags risk at 91% precision, cutting review from days to hours. EduTutor AI answers coursework questions at 89% accuracy and lifted exam scores 18% across 800 students, while cutting instructor grading from 15 hours a week to 6. MediFlow AI is a WhatsApp patient-intake agent with FHIR integration and LangGraph triage flows. Bridgerex is a microservices platform for cross-department operations. There's a full breakdown on the projects page.",
  },
  {
    id: "process",
    suggestion: "How do you approach a problem?",
    strong: ["process", "approach", "methodology", "how do you work", "how you work", "think", "thinking"],
    keywords: ["solve", "problem", "method"],
    answer:
      "Outcome first — \"build me a dashboard\" is never the goal, some decision getting faster is. Then I map the system on one page; if I can't draw it, I don't understand it yet. Then the thinnest slice that proves the risky part with real data, the boring well-instrumented version, measurement before optimisation, and I stay on it in production. The How I work page walks through all six steps.",
  },
  {
    id: "why",
    suggestion: "Why you and not someone else?",
    strong: ["why you", "why should", "unique", "differentiator", "stand out"],
    keywords: ["different", "better", "special", "strength", "value"],
    answer:
      "Three honest reasons. One, my AI work has survived contact with real users — with the evaluation and observability that keeps it honest, not a demo that impresses once. Two, I own things end to end, so nothing gets thrown over a wall between architecture and on-call. Three, I've been client-facing for most of my career, so I'll push back when the request and the actual goal don't match. The Why me page has the specifics.",
  },
  {
    id: "contact",
    suggestion: "How do I get in touch?",
    strong: ["contact", "email", "get in touch", "phone", "linkedin", "github"],
    keywords: ["reach", "talk", "call", "message", "connect"],
    answer:
      "Email is best: codexsabir@gmail.com. Phone is +92 301 9866811. I'm on LinkedIn at /in/c0dexs4bir and GitHub at /codexsabir. If you're writing, a couple of lines about the actual problem gets a far more useful reply than a general enquiry.",
  },
  {
    id: "location",
    strong: ["location", "where are you", "remote", "timezone", "time zone", "relocate", "onsite", "islamabad"],
    keywords: ["based", "country", "pakistan"],
    answer:
      "Based in Islamabad, Pakistan (PKT, UTC+5). I've worked remote with teams in Saudi Arabia and hybrid and on-site in Pakistan, so I'm comfortable either way. Overlap with Europe is easy, and US mornings work with some planning.",
  },
  {
    id: "rate",
    strong: ["rate", "rates", "price", "pricing", "salary", "budget", "how much", "charge"],
    keywords: ["cost", "fee", "expensive"],
    answer:
      "It depends on scope, length, and how much ownership sits with me — so I'd rather not quote a number that turns out to be wrong for your situation. Tell me what you're trying to build at codexsabir@gmail.com and I'll come back with something specific.",
  },
  {
    id: "education",
    strong: ["education", "degree", "university", "college", "kohat"],
    keywords: ["study", "studied", "school", "cs"],
    answer:
      "BS in Computer Science from Kohat University of Science and Technology, 2022 to 2026 — done alongside working, which is why the professional experience and the degree overlap.",
  },
  {
    id: "cloud",
    strong: ["cloud", "aws", "devops", "deploy", "deployment", "docker", "nginx", "github actions", "infra"],
    keywords: ["ci", "cd"],
    answer:
      "AWS (EC2, S3), NGINX, and CI/CD through GitHub Actions. I deploy and operate what I build rather than handing it off — most of what I know about designing durable systems came from being the one woken up by them.",
  },
  {
    id: "languages",
    keywords: ["language", "languages", "speak", "english", "urdu", "arabic"],
    answer: "English, Urdu, and Arabic.",
  },
  {
    id: "stack",
    suggestion: "What's in your toolkit?",
    strong: ["stack", "skills", "technologies", "toolkit", "expertise"],
    keywords: ["tech", "tools", "know"],
    answer:
      "Short version — AI: RAG, agents, LangGraph, LangChain, embeddings, semantic search. Backend: Python/FastAPI, Node.js, NestJS, Express, microservices, WebSockets. Data: PostgreSQL, MongoDB, MySQL, Supabase, Pinecone, Chroma. Automation: n8n, Make, Zapier. Cloud: AWS, NGINX, CI/CD. Frontend: React, Next.js, TypeScript.",
  },
  {
    id: "site",
    keywords: ["this site", "this website", "built this", "portfolio site", "how was this made", "chat bot", "chatbot", "are you an ai", "are you a bot"],
    answer:
      "I'm a small scripted assistant, not a language model — I match your question against a set of answers Sabir wrote, so I can't invent anything. The site itself is Next.js, TypeScript, Tailwind, and Framer Motion. If I miss what you're asking, email codexsabir@gmail.com and you'll get the real thing.",
  },
  {
    id: "greeting",
    keywords: ["hi", "hey", "hello", "yo", "salam", "assalam", "good morning", "good evening", "sup"],
    answer:
      "Hello. Ask me about Sabir's experience, the AI systems he's shipped, how he works, or how to get in touch — whatever's useful.",
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "cheers", "appreciate", "great", "awesome", "cool", "nice"],
    answer: "Anytime. If you want to take it further, codexsabir@gmail.com goes straight to Sabir.",
  },
];

export const fallbackAnswer =
  "I don't have a written answer for that one — I only cover what Sabir has actually put on record, so I'd rather say so than guess. Try asking about his experience, AI and backend work, projects, process, or how to reach him. For anything else, codexsabir@gmail.com is the fastest route.";

/** Chips offered before the visitor types anything. */
export const starters = intents.filter((intent) => intent.suggestion);

const normalise = (text: string) => ` ${text.toLowerCase().replace(/[^a-z0-9\s.]/g, " ").replace(/\s+/g, " ").trim()} `;

const STRONG_WEIGHT = 14;
const MIN_SCORE = 3;

/**
 * Single words must match whole, so "ai" doesn't fire inside "email" and "cd"
 * doesn't fire inside "cdn". Multi-word phrases match as substrings.
 */
function contains(haystack: string, term: string): boolean {
  const needle = term.toLowerCase();
  return needle.includes(" ") ? haystack.includes(needle) : haystack.includes(` ${needle} `);
}

/**
 * Scores each intent by the terms the query contains. Strong terms carry a
 * flat high weight and ordinary keywords score by length — otherwise a long,
 * vague word like "experience" beats a short, decisive one like "ai", and
 * "what's your AI experience?" gets answered with a job history.
 */
export function matchIntent(query: string): { answer: string; intent?: Intent } {
  const haystack = normalise(query);
  if (haystack.trim().length === 0) return { answer: fallbackAnswer };

  let best: Intent | undefined;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const term of intent.strong ?? []) {
      if (contains(haystack, term)) score += STRONG_WEIGHT;
    }
    for (const keyword of intent.keywords) {
      if (contains(haystack, keyword)) score += Math.max(keyword.length, MIN_SCORE);
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  if (!best || bestScore < MIN_SCORE) return { answer: fallbackAnswer };
  return { answer: best.answer, intent: best };
}
