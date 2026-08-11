// The services taxonomy: four lifecycle stages, each holding its own list of
// services. This used to live inside app/page.tsx, which is a client
// component, so nothing rendered on the server could reach it. It sits here
// now because the stage pages under /services/[stage] and the sitemap both
// need it at build time, and there should be exactly one definition of what
// Decra offers.

export type ServiceDef = {
  id: string;
  label: string;
  body: string;
  items: string[];
  opening: string;
};

export type ServiceGroup = {
  id: string;
  label: string;
  description: string;
  services: ServiceDef[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  // ===================================================================
  // 01 — ENGINEER
  // ===================================================================
  {
    id: "engineer",
    label: "Design & Engineer",
    description:
      "Designing the software, data, AI, infrastructure, and connected systems that make technology products work.",
    services: [
      {
        id: "system-design-architecture",
        label: "System Design & Architecture",
        body: "Designing secure, reliable, maintainable, and scalable systems from application components through infrastructure.",
        items: [
          "System architecture", "Application architecture", "Software architecture",
          "Component architecture", "Modular monolith architecture", "Microservices architecture",
          "Distributed systems", "Event-driven architecture", "Multi-tenant architecture",
          "Service boundaries", "System dependencies", "Architecture modernization",
          "Architecture migration", "Architecture documentation",
        ],
        opening: "Hi, I need help with system design, software architecture, component design, distributed systems, service architecture, modernization, or architecture documentation.",
      },
      {
        id: "web-application-engineering",
        label: "Web & Application Engineering",
        body: "Assessing and designing the application layer across frontend, backend, APIs, services, and user-facing systems.",
        items: [
          "Frontend architecture", "Backend architecture", "Web application architecture",
          "Application structure", "Server-side architecture", "Client-server architecture",
          "Authentication flows", "Authorization architecture", "Session management",
          "State management", "Background processing", "Caching", "Error handling",
          "Application resilience",
        ],
        opening: "Hi, I need help with web application architecture, frontend or backend systems, server-side design, authentication, authorization, state management, or application resilience.",
      },
      {
        id: "data-architecture",
        label: "Data & Database Architecture",
        body: "Designing how systems store, relate, process, protect, move, and retrieve data.",
        items: [
          "Database architecture", "Data modelling", "Relational data modelling",
          "NoSQL architecture", "Schema design", "Entity relationship modelling",
          "Indexing strategy", "Query architecture", "Data integrity", "Data migration",
          "Data pipelines", "Data lifecycle", "Data retention", "Backup & recovery",
          "Data storage strategy",
        ],
        opening: "Hi, I need help with database or data architecture, schema design, data modelling, migration, data pipelines, storage, retention, or database performance.",
      },
      {
        id: "api-integration-engineering",
        label: "API & Integration Engineering",
        body: "Designing and evaluating the interfaces and integrations through which systems communicate.",
        items: [
          "REST API design", "API architecture", "API specifications", "OpenAPI documentation",
          "OAuth & authentication flows", "Webhooks", "Event-driven integrations",
          "Third-party API integration", "API versioning", "Rate limiting",
          "Retry & failure handling", "Idempotency", "Integration monitoring",
          "Integration dependency analysis",
        ],
        opening: "Hi, I need help with API design, integrations, OAuth, webhooks, third-party services, API documentation, reliability, or integration architecture.",
      },
      {
        id: "cloud-infrastructure",
        label: "Cloud, Infrastructure & Deployment",
        body: "Designing the infrastructure and deployment systems required to run technology reliably in production.",
        items: [
          "Cloud architecture", "Hosting architecture", "Server architecture",
          "Development environments", "Staging environments", "Production environments",
          "CI/CD architecture", "Containerization", "Deployment architecture", "DNS & networking",
          "Secrets management", "Infrastructure configuration", "Monitoring", "Logging",
          "Disaster recovery",
        ],
        opening: "Hi, I need help with cloud, servers, hosting, deployment, CI/CD, environments, networking, infrastructure, monitoring, or disaster recovery.",
      },
      {
        id: "ai-systems-engineering",
        label: "AI & Intelligent Systems",
        body: "Designing AI-enabled systems around models, data, prompts, retrieval, automation, evaluation, and human oversight.",
        items: [
          "AI system architecture", "LLM application architecture", "RAG architecture",
          "Document intelligence", "AI workflows", "Prompt architecture", "Prompt engineering",
          "Context engineering", "Tool-calling systems", "Structured AI outputs",
          "Human-in-the-loop systems", "AI evaluation", "Model selection", "Model integration",
          "AI monitoring", "AI fallback systems",
        ],
        opening: "Hi, I need help with AI architecture, LLM systems, RAG, document intelligence, prompt or context engineering, AI workflows, evaluation, or human-in-the-loop design.",
      },
      {
        id: "algorithms-decision-systems",
        label: "Algorithms & Decision Systems",
        body: "Designing computational logic, automated decision systems, rules engines, and optimization processes.",
        items: [
          "Algorithm design", "Algorithm analysis", "Decision systems", "Rules engines",
          "Scoring systems", "Ranking systems", "Recommendation systems", "Matching systems",
          "Classification systems", "Optimization problems", "Computational complexity",
          "Decision logic", "Algorithmic edge cases", "Human override mechanisms",
        ],
        opening: "Hi, I need help designing or evaluating an algorithm, decision system, rules engine, scoring or ranking system, recommendation system, matching system, or optimization process.",
      },
      {
        id: "iot-robotics-connected-systems",
        label: "IoT, Robotics & Connected Systems",
        body: "Designing and assessing systems that connect software, devices, sensors, networks, and physical-world processes.",
        items: [
          "IoT architecture", "Device-to-cloud architecture", "Edge computing", "Sensor systems",
          "Device communication", "Telemetry systems", "Control systems",
          "Robotics software architecture", "Cyber-physical systems", "Firmware-to-cloud workflows",
          "Device lifecycle management", "Connected-device security", "Failure-state analysis",
          "Safe-state design",
        ],
        opening: "Hi, I need help with IoT, connected systems, edge computing, robotics architecture, device-to-cloud systems, sensors, control systems, or cyber-physical systems.",
      },
    ],
  },

  // ===================================================================
  // 02 — TEST
  // ===================================================================
  {
    id: "test",
    label: "Test, Challenge & Assure",
    description:
      "Examining whether systems actually work, identifying failure conditions, and challenging products before those failures reach users.",
    services: [
      {
        id: "product-testing",
        label: "Product & Functional Testing",
        body: "Testing whether products behave as intended across normal, exceptional, and real-world user scenarios.",
        items: [
          "Functional testing", "Feature testing", "User-flow testing", "Workflow testing",
          "Acceptance testing", "Regression testing", "Scenario testing", "Edge-case testing",
          "Negative testing", "Boundary testing", "Error-state testing", "Cross-feature testing",
        ],
        opening: "Hi, I need help testing a product, feature, workflow, user flow, or system for functional correctness, edge cases, regressions, or failure conditions.",
      },
      {
        id: "web-site-application-testing",
        label: "Web, Site & Application Testing",
        body: "Evaluating websites and web applications across functionality, structure, performance, compatibility, and resilience.",
        items: [
          "Website testing", "Web application testing", "HTML validation", "CSS & UI testing",
          "JavaScript behavior testing", "Browser compatibility", "Responsive testing",
          "Form testing", "Navigation testing", "Link & route testing", "Accessibility checks",
          "Console-error analysis", "Client-side error analysis", "Application behavior testing",
        ],
        opening: "Hi, I need help testing a website or web application, including HTML, frontend behavior, browser compatibility, responsive behavior, forms, navigation, accessibility, or application errors.",
      },
      {
        id: "api-server-testing",
        label: "API, Server & Infrastructure Testing",
        body: "Testing the technical interfaces and infrastructure that support applications in real operating conditions.",
        items: [
          "API endpoint testing", "Request & response testing", "Authentication testing",
          "Authorization testing", "HTTP behavior testing", "Status-code analysis",
          "Header analysis", "API error handling", "Rate-limit testing", "Timeout testing",
          "Server configuration review", "Server availability testing", "Deployment verification",
          "Environment testing", "Service dependency testing",
        ],
        opening: "Hi, I need help testing APIs, HTTP behavior, authentication, authorization, server responses, infrastructure configuration, deployment environments, or service dependencies.",
      },
      {
        id: "performance-scalability-testing",
        label: "Performance & Scalability Testing",
        body: "Determining how systems behave under realistic and increasing workloads.",
        items: [
          "Performance testing", "Load testing", "Stress testing", "Capacity analysis",
          "Response-time analysis", "Database performance", "API performance",
          "Concurrency testing", "Resource-utilization analysis", "Scalability assessment",
          "Bottleneck identification", "Caching assessment", "Queue & background-job analysis",
        ],
        opening: "Hi, I need help with performance, load, stress, concurrency, capacity, scalability, response-time, database, API, or system bottleneck testing.",
      },
      {
        id: "failure-resilience-testing",
        label: "Failure & Resilience Testing",
        body: "Challenging systems against failures, dependency outages, inconsistent states, and unexpected operating conditions.",
        items: [
          "Failure-mode analysis", "Dependency failure testing", "Timeout scenarios",
          "Retry behavior", "Duplicate-event testing", "Concurrency failures",
          "Partial-failure analysis", "Recovery testing", "Backup restoration testing",
          "Disaster-recovery testing", "Graceful degradation", "Fallback mechanisms",
          "Safe-state analysis",
        ],
        opening: "Hi, I need help testing how a system behaves when APIs, databases, services, networks, jobs, or other dependencies fail or behave unexpectedly.",
      },
      {
        id: "adversarial-product-testing",
        label: "Adversarial & Abuse Testing",
        body: "Thinking like an attacker, manipulator, or unusual user to identify weaknesses in product logic and system behavior.",
        items: [
          "Abuse-case analysis", "Adversarial user flows", "Logic manipulation",
          "Permission abuse scenarios", "Input manipulation", "Workflow bypass analysis",
          "State manipulation", "Duplicate-action testing", "Privilege-boundary testing",
          "AI adversarial testing", "Prompt-injection analysis", "System misuse scenarios",
        ],
        opening: "Hi, I need help challenging a product for abuse cases, workflow manipulation, permission weaknesses, adversarial inputs, AI misuse, or system-logic vulnerabilities.",
      },
      {
        id: "ai-evaluation-testing",
        label: "AI Evaluation & Testing",
        body: "Testing AI systems for accuracy, reliability, consistency, safety, failure modes, and appropriate human escalation.",
        items: [
          "Model evaluation", "Prompt evaluation", "Output evaluation", "Hallucination testing",
          "Grounding evaluation", "RAG evaluation", "Adversarial prompting",
          "Prompt-injection testing", "Consistency testing", "Edge-case evaluation",
          "Bias & fairness assessment", "Confidence & escalation logic", "Human-review thresholds",
          "AI regression testing",
        ],
        opening: "Hi, I need help evaluating an AI system, model, prompt workflow, RAG system, hallucination behavior, adversarial inputs, consistency, or human-escalation logic.",
      },
      {
        id: "security-assurance",
        label: "Security Testing & Assurance",
        body: "Assessing security controls and system boundaries to identify weaknesses and strengthen the product's security posture.",
        items: [
          "Security architecture review", "Authentication review", "Authorization review",
          "Access-control analysis", "Session-security review", "Secrets-management review",
          "Data-exposure analysis", "API security review", "Security configuration review",
          "Threat modelling", "Trust-boundary analysis", "Security control assessment",
        ],
        opening: "Hi, I need help assessing application security, authentication, authorization, access controls, API security, trust boundaries, security configuration, or threat models.",
      },
      {
        id: "technology-risk-assurance",
        label: "Technology Risk & Assurance",
        body: "Bringing technical, operational, legal, privacy, security, and regulatory findings together into an actionable risk assessment.",
        items: [
          "Technology risk assessments", "Product risk assessments", "Architecture assessments",
          "Technology audits", "Privacy impact assessments", "AI impact assessments",
          "Operational resilience", "Security & resilience reviews", "Launch readiness",
          "Production readiness", "Remediation planning", "Risk registers",
        ],
        opening: "Hi, I need help with technology risk, product or architecture assessments, technology audits, privacy or AI impact assessments, resilience, production readiness, or launch readiness.",
      },
    ],
  },

  // ===================================================================
  // 03 — GOVERN
  // ===================================================================
  {
    id: "govern",
    label: "Govern, Protect & Regulate",
    description:
      "Embedding privacy, safety, security, responsible AI, governance, and legal controls into technology throughout its lifecycle.",
    services: [
      {
        id: "technology-governance",
        label: "Technology Governance & Standards",
        body: "Establishing governance structures, standards, controls, and accountability mechanisms for technology products and organizations.",
        items: [
          "Technology governance", "Digital governance", "AI governance", "Data governance",
          "Governance frameworks", "Technology standards", "Internal controls",
          "Technology policies", "AI policies", "Data policies", "Technology risk frameworks",
          "ISO readiness", "ISO implementation support",
        ],
        opening: "Hi, I need help with technology governance, AI or data governance, internal policies, technology standards, governance frameworks, controls, or ISO readiness.",
      },
      {
        id: "privacy-data-protection",
        label: "Privacy & Data Protection",
        body: "Designing and assessing systems so that personal and sensitive data is handled appropriately throughout its lifecycle.",
        items: [
          "Privacy by Design", "Data protection", "Data mapping", "Data-flow analysis",
          "Data inventories", "Data minimization", "Purpose limitation", "Retention frameworks",
          "Data subject rights", "Privacy impact assessments", "Data processing assessments",
          "Cross-border data considerations", "Data protection controls",
        ],
        opening: "Hi, I need help with privacy, data protection, data mapping, Privacy by Design, data flows, retention, impact assessments, or data protection controls.",
      },
      {
        id: "responsible-ai",
        label: "Responsible AI & AI Governance",
        body: "Connecting AI engineering, evaluation, governance, safety, transparency, and accountability throughout the AI lifecycle.",
        items: [
          "Responsible AI frameworks", "AI governance", "AI risk assessments",
          "AI impact assessments", "AI lifecycle governance", "AI documentation",
          "Human oversight", "AI transparency", "AI accountability", "AI safeguards",
          "AI incident management", "Model governance", "AI vendor assessment",
        ],
        opening: "Hi, I need help with responsible AI, AI governance, AI risk or impact assessments, human oversight, AI safeguards, model governance, or AI documentation.",
      },
      {
        id: "product-safety",
        label: "Product Safety & Safety by Design",
        body: "Identifying and controlling foreseeable risks arising from the way products, automated systems, and connected technologies behave.",
        items: [
          "Safety by Design", "Product safety analysis", "Failure-mode analysis",
          "Safety requirements", "Safe-state design", "Human override", "Escalation mechanisms",
          "Risk controls", "Safety documentation", "Connected-system safety",
          "AI safety considerations",
        ],
        opening: "Hi, I need help with product safety, Safety by Design, failure-mode analysis, safe-state design, human override, escalation, or safety controls.",
      },
      {
        id: "cybersecurity-governance",
        label: "Security Governance",
        body: "Establishing organizational and technical controls for managing cybersecurity risk across technology systems.",
        items: [
          "Security governance", "Security policies", "Access-control governance",
          "Identity governance", "Security standards", "Security controls",
          "Incident-response frameworks", "Vendor security assessment", "Security risk management",
          "Security documentation", "Security readiness",
        ],
        opening: "Hi, I need help with security governance, security policies, access governance, security controls, incident response, vendor security, or security readiness.",
      },
    ],
  },

  // ===================================================================
  // 04 — TRANSACT
  // ===================================================================
  {
    id: "transact",
    label: "Protect, Commercialize & Transact",
    description:
      "Protecting technology assets and structuring the legal, commercial, investment, and strategic relationships around them.",
    services: [
      {
        id: "technology-ip",
        label: "Technology & Intellectual Property",
        body: "Structuring ownership, licensing, protection, and commercialization of software, AI, data, and digital innovation.",
        items: [
          "Technology IP strategy", "Software ownership", "Software licensing",
          "Open-source governance", "Open-source compliance", "AI & data ownership",
          "Developer & contractor IP", "Technology commercialization", "IP portfolio strategy",
          "IP risk assessment",
        ],
        opening: "Hi, I need help with technology IP, software ownership, licensing, open-source governance or compliance, AI or data ownership, developer IP, or technology commercialization.",
      },
      {
        id: "technology-transactions",
        label: "Technology Transactions",
        body: "Structuring the agreements and commercial relationships that enable technology development, deployment, integration, and commercialization.",
        items: [
          "SaaS agreements", "Platform agreements", "Software licensing",
          "Technology procurement", "Vendor agreements", "Technology services agreements",
          "Data processing agreements", "API & integration agreements", "Cloud agreements",
          "AI vendor agreements", "Commercial partnerships", "Technology commercialization",
        ],
        opening: "Hi, I need help with a technology transaction, SaaS or platform agreement, software licensing, technology procurement, vendor agreements, data processing agreements, API integrations, or commercial partnerships.",
      },
      {
        id: "technology-due-diligence",
        label: "Technology Due Diligence",
        body: "Examining technology products, systems, code, infrastructure, AI, intellectual property, and risks before investment, acquisition, or strategic decisions.",
        items: [
          "Technical due diligence", "Product due diligence", "Architecture due diligence",
          "Codebase assessment", "Technology-stack assessment", "Infrastructure assessment",
          "AI due diligence", "IP due diligence", "Cybersecurity assessment",
          "Technical debt assessment", "Scalability assessment", "Technology audits",
          "Investment readiness", "Acquisition readiness",
        ],
        opening: "Hi, I need help with technical or product due diligence, architecture or codebase assessment, AI or IP due diligence, infrastructure assessment, technology audits, or investment and acquisition readiness.",
      },
    ],
  },
];
