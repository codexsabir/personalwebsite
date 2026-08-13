/** Single source of truth for everything the site says about me. */

export const profile = {
  name: "Sabir Ud Din",
  tagline: "An engineer who thinks in systems.",
  location: "Islamabad, Pakistan",
  email: "codexsabir@gmail.com",
  phone: "+92 301 9866811",
  linkedin: "https://www.linkedin.com/in/c0dexs4bir/",
  github: "https://github.com/codexsabir",
  summary:
    "Four years of professional engineering, three of them shipping AI features that run in production — not demos. I build backend services, retrieval pipelines, and agent workflows that take over multi-step manual work. Most of what I've built I owned end to end, from architecture to deployment, working straight with clients and product teams.",
} as const;

/** The mental models page — how I think. */
export const models = [
  {
    id: "01",
    title: "The system is the product",
    principle: "A feature is a shape the system takes, not a thing you bolt on.",
    body: "Before I write code I map what already exists: where data enters, who owns it, what breaks when it's late. Half the requests I get are answered by moving a boundary rather than adding a screen. The other half get much cheaper once the boundary is right.",
  },
  {
    id: "02",
    title: "Find the constraint first",
    principle: "Every system has exactly one bottleneck that matters right now.",
    body: "Optimising anything else is decoration. I look for the step that everything queues behind — a manual approval, a synchronous call, a person copying rows between tabs — and I fix that one. The rest usually stops being a problem on its own.",
  },
  {
    id: "03",
    title: "Design for the day it breaks",
    principle: "Software is judged on its worst hour, not its best.",
    body: "The interesting question is never whether the happy path works. It's what happens when the model returns nonsense, the webhook fires twice, or the API is down for nine minutes. I decide those answers deliberately — retries, idempotency, fallbacks — instead of finding out in production.",
  },
  {
    id: "04",
    title: "Make the invisible visible",
    principle: "You cannot fix what you cannot see.",
    body: "AI systems fail quietly, which is what makes them dangerous. Logging, tracing, and confidence scores go in from day one, so that when something drifts there is a number that moves — and an answer to why it moved.",
  },
  {
    id: "05",
    title: "Automate the third time",
    principle: "Do it once. Do it twice. Automate the third.",
    body: "Manual work is a loan with interest. When I see the same steps a third time, that's the signal to move them into a pipeline. Most of the automation I've shipped started as somebody's tedious afternoon that nobody thought to question.",
  },
  {
    id: "06",
    title: "Boring on purpose",
    principle: "Clever code is a bill someone pays later.",
    body: "I choose the dull, well-understood option unless the problem genuinely demands otherwise. Boring systems are the ones that survive handover, onboarding, and the engineer who inherits them at 2am — and that engineer is often me, six months later.",
  },
] as const;

/** The process page — how I actually work a problem. */
export const process = [
  {
    step: "01",
    title: "Start with the outcome, not the request",
    detail:
      "\"Build me a dashboard\" is never the goal. The goal is a decision someone needs to make faster. I ask what changes once this exists, and who is worse off if it doesn't. That question alone kills a lot of unnecessary work.",
    signal: "What business number moves?",
  },
  {
    step: "02",
    title: "Map the system on one page",
    detail:
      "Data sources, boundaries, owners, failure points. If I can't draw it on one page, I don't understand it yet — and building before that point is how you get an architecture nobody can explain later.",
    signal: "Can I draw it?",
  },
  {
    step: "03",
    title: "Cut the thinnest slice that proves it",
    detail:
      "One real path, end to end, with real data. Not a mock. It answers the risky question early — usually whether the model, the integration, or the assumption actually holds — while changing course is still cheap.",
    signal: "What could kill this?",
  },
  {
    step: "04",
    title: "Build the boring version",
    detail:
      "The straightforward implementation, well tested, properly instrumented, shipped. Speed comes from not having to rewrite it, and most systems never need the clever version at all.",
    signal: "Would a stranger understand it?",
  },
  {
    step: "05",
    title: "Instrument, then optimise",
    detail:
      "Measure before tuning. I've watched a lot of engineering effort go into the second-slowest thing. Numbers first, opinions second — including my own.",
    signal: "Where does the time actually go?",
  },
  {
    step: "06",
    title: "Own it in production",
    detail:
      "Shipping isn't handing something over. I watch it under real load, fix what surfaces, and keep it running. Everything I know about building durable systems I learned from operating the ones I built.",
    signal: "Does it hold at 3am?",
  },
] as const;

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Bit and Bytes LLC",
    period: "Jul 2026 — Present",
    place: "Lahore, Pakistan · On-site",
    points: [
      "Design, build, and maintain backend services and business applications.",
      "Build automation that removes manual steps from internal workflows.",
      "Take features from concept to production with product, QA, and client-facing teams.",
      "Work on performance, security, and maintainability of existing applications.",
      "Take part in system design and architecture decisions, and review other engineers' code.",
      "Debug complex production issues and keep releases reliable.",
    ],
    stack: ["Node.js", "Python", "System design", "Automation"],
  },
  {
    role: "AI Full Stack Developer",
    company: "Brandora",
    period: "Feb 2025 — Jun 2026",
    place: "Islamabad, Pakistan · Hybrid",
    points: [
      "Architected AI workflow automation systems with n8n, Python, and LLM integrations.",
      "Designed retrieval-augmented generation pipelines on vector databases with semantic search for accurate, context-aware answers.",
      "Built autonomous agents that run multi-step operational workflows on their own.",
      "Developed the backend APIs and automation infrastructure behind production AI systems.",
      "Integrated WhatsApp, CRM, payment, and other third-party APIs into those workflows.",
      "Cut repeated manual operations work by moving it onto AI-driven orchestration.",
    ],
    stack: ["Python", "n8n", "LangGraph", "Vector DBs", "RAG"],
  },
  {
    role: "Full Stack Developer",
    company: "Brandora",
    period: "Jun 2023 — Feb 2025",
    place: "Islamabad, Pakistan · Hybrid",
    points: [
      "Led AI integration and full-stack work on SaaS products across several industries.",
      "Architected scalable backend services in Node.js and FastAPI for AI-powered applications.",
      "Cut frontend development time by 30% with a reusable component architecture and tighter state management.",
      "Built real-time chat and communication features on WebSockets.",
      "Managed PostgreSQL and MongoDB databases, including query tuning and performance work.",
      "Worked directly with clients to turn business requirements into workable systems, and led API design and code reviews across teams.",
    ],
    stack: ["Node.js", "FastAPI", "WebSockets", "PostgreSQL", "MongoDB"],
  },
  {
    role: "Full Stack Developer",
    company: "Moosa Edu",
    period: "Sep 2024 — Aug 2025",
    place: "Riyadh, Saudi Arabia · Remote",
    points: [
      "Designed and built the moosa.tv e-learning platform from the ground up.",
      "Built the Next.js frontend with SEO and page performance in mind.",
      "Developed Node.js APIs for content management and user systems.",
      "Implemented authentication, role-based access control, and admin dashboards.",
      "Shipped a production platform supporting video streaming and paid courses.",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "AWS"],
  },
  {
    role: "Backend Developer",
    company: "Uzair Technology",
    period: "Jan 2023 — Jun 2023",
    place: "Kohat, Pakistan · On-site",
    points: [
      "Built REST APIs and database models in Node.js.",
      "Worked on authentication, middleware, and server-side logic.",
      "Practiced data structures and algorithms daily in C++.",
    ],
    stack: ["Node.js", "Express.js", "C++"],
  },
] as const;

/**
 * A headline figure for a project. A numeric `value` counts up on screen;
 * a string one is a phrase that shouldn't be animated ("days → hours").
 */
export type Metric = {
  value: number | string;
  suffix?: string;
  label: string;
};

export type Project = {
  name: string;
  kind: string;
  problem: string;
  solution: string;
  metrics: Metric[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "LegalDoc AI",
    kind: "Contract review",
    problem: "Lawyers spent days reading contracts to find the same handful of risky clauses.",
    solution:
      "Clause extraction and risk flagging, scored against custom playbooks so each firm's definition of \"risky\" is the one applied.",
    metrics: [
      { value: 91, suffix: "%", label: "clause precision" },
      { value: "days → hours", label: "review time" },
    ],
    stack: ["Python", "LLM extraction", "Vector search"],
  },
  {
    name: "MediFlow AI",
    kind: "Patient intake agent",
    problem: "Front desk staff were doing phone triage and appointment booking by hand, all day.",
    solution:
      "A WhatsApp triage agent with FHIR integration — LangGraph flows for symptom assessment and routing, Pinecone-backed medical retrieval, automated booking and reminders.",
    metrics: [
      { value: "FHIR", label: "records integration" },
      { value: "24/7", label: "intake coverage" },
    ],
    stack: ["LangGraph", "Pinecone", "WhatsApp API", "FHIR"],
  },
  {
    name: "EduTutor AI",
    kind: "RAG tutor",
    problem: "Instructors drowned in repeat questions and grading, and students waited days for help.",
    solution:
      "A retrieval-grounded tutor answering coursework questions from real course material, plus LLM-assisted grading and generated study plans.",
    metrics: [
      { value: 89, suffix: "%", label: "answer accuracy" },
      { value: 18, suffix: "%", label: "exam score lift" },
      { value: 800, label: "students served" },
    ],
    stack: ["RAG", "Vector DB", "Python", "LLM grading"],
  },
  {
    name: "Bridgerex",
    kind: "Enterprise management platform",
    problem: "Departments ran on disconnected tools, and every cross-team process needed a human to relay it.",
    solution:
      "A microservices platform for cross-department operations with automation built into the core rather than bolted on.",
    metrics: [{ value: "Microservices", label: "architecture" }],
    stack: ["Next.js", "NestJS", "PostgreSQL", "WebSockets", "LangChain", "FastAPI", "n8n"],
  },
  {
    name: "Shamay AI",
    kind: "Document extraction",
    problem: "A property firm re-keyed the same fields out of documents into their systems, every day.",
    solution: "Automated document processing with structured extraction feeding straight into their stack.",
    metrics: [{ value: "Zero", label: "manual re-keying" }],
    stack: ["Next.js", "React", "n8n", "Supabase", "OpenAI API"],
  },
];

/** The why-me page. Each is a claim I can defend with something above. */
export const differentiators = [
  {
    title: "AI that survives contact with production",
    claim:
      "Three years of LLM work that real users depend on — retrieval pipelines, agents, extraction — with the evaluation, guardrails, and observability that keeps them honest. Not notebooks. Not demos.",
    proof: "91% clause precision · 89% answer accuracy · 800 students",
  },
  {
    title: "I own it from whiteboard to on-call",
    claim:
      "Architecture, implementation, deployment, and the part afterwards where it has to keep working. Nothing gets thrown over a wall, because there is no wall.",
    proof: "moosa.tv and Bridgerex built and shipped end to end",
  },
  {
    title: "I speak business before I speak stack",
    claim:
      "I've worked directly with clients for most of my career, translating what a business actually needs into something buildable — and pushing back when the request and the goal don't match.",
    proof: "Client-facing across SaaS, legal, healthcare, property, and education",
  },
  {
    title: "Depth on both sides of the API",
    claim:
      "Backend is where I'm strongest — Python, Node, data modelling, real-time. But I build the frontend too, so I design interfaces that are actually pleasant to consume.",
    proof: "30% cut in frontend build time through reusable architecture",
  },
  {
    title: "Automation as a default instinct",
    claim:
      "I notice repeated manual work and treat it as a bug. A good deal of what I've shipped exists because somebody's routine afternoon turned out to be automatable.",
    proof: "n8n, Make, and custom orchestration across WhatsApp, CRM, and payments",
  },
  {
    title: "Fast, without leaving a mess",
    claim:
      "I use AI-assisted tooling heavily and ship quickly — but I read every line, and I optimise for the engineer who inherits it. Speed that creates cleanup isn't speed.",
    proof: "Led API design and code reviews across teams",
  },
] as const;

export const skills = [
  {
    group: "AI & LLM",
    items: [
      "LLM integration (OpenAI, Anthropic Claude, open-source)",
      "RAG pipelines",
      "AI agents",
      "LangGraph",
      "LangChain",
      "Prompt engineering",
      "Embeddings & semantic search",
    ],
  },
  {
    group: "Backend",
    items: [
      "Python (FastAPI)",
      "Node.js",
      "NestJS",
      "Express.js",
      "REST API design",
      "Microservices",
      "WebSockets",
      "Auth & RBAC",
    ],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "Pinecone", "Chroma", "Schema design", "Query tuning"],
  },
  {
    group: "Automation",
    items: ["n8n", "Make", "Zapier", "Webhook orchestration", "WhatsApp / CRM / payment APIs"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (EC2, S3)", "NGINX", "CI/CD", "GitHub Actions"],
  },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
] as const;

export const education = {
  degree: "BS in Computer Science",
  school: "Kohat University of Science and Technology",
  place: "Kohat, Pakistan",
  period: "Jun 2022 — Jun 2026",
} as const;

export const languages = ["English", "Urdu", "Arabic"] as const;
