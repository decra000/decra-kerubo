// The services taxonomy: four categories, each presented differently because
// they are doing different jobs. One is a catalogue of work, one is an
// arrangement rather than a list, one is scoped by sector, and one is not a
// commercial offering at all. `kind` is what the pages branch on.
//
// This lives outside app/page.tsx, which is a client component, because the
// category pages and the sitemap both need it on the server.

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
  kind: "catalogue" | "engagement" | "policy";
  services: ServiceDef[];
  /** catalogue: sub-headings, so a twenty-item list stays readable */
  sections?: { title: string; blurb: string; serviceIds: string[] }[];
  /** catalogue: the sectors this work is scoped to */
  sectors?: string[];
  /** engagement: which other categories the retainer reaches into */
  covers?: { categoryId: string; note: string }[];
  /** engagement: how the arrangement actually works */
  howItWorks?: { title: string; body: string }[];
  /** policy: the opening line behind "Ask for an opinion" */
  opinionOpening?: string;
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  // ===================================================================
  // 01 — TECHNICAL DEVELOPMENT, STRUCTURING & AUDIT
  // ===================================================================
  {
    id: "technical-development",
    label: "Technical Development, Structuring & Audit",
    description:
      "Building the product, and proving it holds. Company and product structuring, the engineering itself, and the testing and audit work that shows what was built behaves the way it was specified to.",
    kind: "catalogue",
    sections: [
      {
        title: "Structure & Build",
        blurb: "Standing up the company and the system, and deciding what gets built in what order.",
        serviceIds: ["product-strategy-roadmap", "startup-structuring-incorporation", "system-design-architecture", "web-application-engineering", "data-architecture", "api-integration-engineering", "cloud-infrastructure", "ai-systems-engineering", "algorithms-decision-systems", "iot-robotics-connected-systems"],
      },
      {
        title: "Test & Challenge",
        blurb: "Establishing what the product actually does under load, under failure, and under attack.",
        serviceIds: ["product-testing", "web-site-application-testing", "api-server-testing", "performance-scalability-testing", "failure-resilience-testing", "adversarial-product-testing", "ai-evaluation-testing", "security-assurance"],
      },
      {
        title: "Audit & Assure",
        blurb: "The formal view, for a board, an acquirer, or an investor.",
        serviceIds: ["technology-risk-assurance", "technology-due-diligence"],
      },
    ],
    services: [
      {
        id: "product-strategy-roadmap",
        label: "Product Strategy & Roadmap",
        body: "Deciding what gets built and in what order, with the technical and legal consequences of each choice visible before it is made rather than after.",
        items: [
          "Product strategy", "Product architecture reviews", "Feature & roadmap advisory",
          "Product lifecycle planning", "Go-to-market readiness", "Launch sequencing",
          "Build vs buy decisions", "Technical trade-off analysis",
        ],
        opening: "Hi, I need help with product strategy, architecture reviews, feature and roadmap advisory, product lifecycle planning, or go-to-market readiness.",
      },
      {
        id: "startup-structuring-incorporation",
        label: "Startup Structuring & Incorporation",
        body: "Standing the company up properly: incorporation, ownership, and the founding documents the product and its investors will later be read against.",
        items: [
          "Company incorporation", "Corporate structuring", "Founder & co-founder agreements",
          "Equity, vesting & cap table setup", "Shareholder agreements",
          "Foreign branch registration", "Regulatory registrations", "Investment readiness",
        ],
        opening: "Hi, I need help with company incorporation, corporate structuring, founder or co-founder agreements, equity and cap table setup, or investment readiness.",
      },
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


  // ===================================================================
  // 02 — PRODUCT LEGAL REVIEW & COMMERCIALIZATION
  // ===================================================================
  {
    id: "product-legal-commercialization",
    label: "Legal Review, Audit & Commercialization",
    description:
      "The product read as a legal object: what it promises the people using it, whether that holds up against the law it is actually subject to, who owns what inside it, and the agreements it reaches the market on.",
    kind: "catalogue",
    sections: [
      {
        title: "Review & Audit",
        blurb: "Examining a product already built, or about to ship, against what it claims and what the law requires, written up as findings to act on.",
        serviceIds: ["product-legal-review", "data-protection-audit", "ai-compliance-audit", "consumer-terms-audit", "licensing-compliance-audit", "regulatory-gap-analysis"],
      },
      {
        title: "Ownership & Commercialization",
        blurb: "Who owns what inside the product, and the agreements it is taken to market on.",
        serviceIds: ["technology-ip", "technology-transactions"],
      },
    ],
    services: [
      {
        id: "product-legal-review",
        label: "Product Legal Review",
        body: "Reading a product that is already built, or about to ship, for the exposure it carries: what it promises users, what it collects, and what it is answerable for.",
        items: [
          "Terms of service", "Privacy policies", "User agreements",
          "Liability & disclaimers", "Consumer protection", "Third-party & API terms",
          "Integration risk", "Launch legal readiness", "Regulatory gap review",
        ],
        opening: "Hi, I need a legal review of my product, terms of service, privacy policy, user agreements, liability, third-party or API terms, or launch readiness.",
      },
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
        id: "data-protection-audit",
        label: "Data Protection & Privacy Audit",
        body: "Examining what a product collects, why, where it goes, and whether any of that matches what users were told and what the law allows.",
        items: [
          "Data mapping & inventory", "Lawful basis review", "Consent mechanics",
          "Retention & deletion", "Cross-border transfers", "Processor & vendor terms",
          "Data subject request handling", "Breach notification readiness", "ODPC registration review",
        ],
        opening: "Hi, I'd like a data protection and privacy audit of my product, data mapping, lawful basis, consent, retention, cross-border transfers, or breach readiness.",
      },
      {
        id: "ai-compliance-audit",
        label: "AI & Automated Decision Audit",
        body: "Examining where a product decides something about a person automatically, what that decision rests on, and what can be shown to a regulator asking about it.",
        items: [
          "Automated decision inventory", "Training data provenance", "Model documentation",
          "Human oversight & escalation", "Explainability & notice", "Bias & disparate impact review",
          "AI vendor & model terms", "Evaluation evidence",
        ],
        opening: "Hi, I'd like an AI and automated decision audit, decision inventory, training data provenance, model documentation, human oversight, explainability, or bias review.",
      },
      {
        id: "consumer-terms-audit",
        label: "Consumer, Terms & Disclosure Audit",
        body: "Checking that what the interface promises, what the terms say, and what the product actually does are the same three things.",
        items: [
          "Terms & policy accuracy", "Pricing & billing disclosure", "Cancellation & refund flows",
          "Dark pattern review", "Marketing claim substantiation", "Accessibility obligations",
          "Age & eligibility gating",
        ],
        opening: "Hi, I'd like a consumer, terms and disclosure audit of my product, terms accuracy, pricing and billing disclosure, cancellation flows, dark patterns, or marketing claims.",
      },
      {
        id: "licensing-compliance-audit",
        label: "Licensing & Open-Source Compliance Audit",
        body: "Establishing what third-party code and data a product depends on, and whether the terms it was taken under permit what is being done with it.",
        items: [
          "Dependency & licence inventory", "Copyleft exposure", "Attribution & notice obligations",
          "SaaS & distribution triggers", "Model & dataset licences", "Contributor & contractor IP chain",
          "Remediation plan",
        ],
        opening: "Hi, I'd like a licensing and open-source compliance audit, dependency and licence inventory, copyleft exposure, attribution obligations, model or dataset licences, or IP chain.",
      },
      {
        id: "regulatory-gap-analysis",
        label: "Regulatory Gap Analysis",
        body: "Setting the product against the regimes that actually reach it, sector by sector and market by market, and ranking what is missing by what it would cost to be caught.",
        items: [
          "Applicable regime mapping", "Sector-specific obligations", "Market entry requirements",
          "Licensing & registration gaps", "Enforcement exposure ranking", "Remediation roadmap",
          "Board & investor reporting",
        ],
        opening: "Hi, I'd like a regulatory gap analysis for my product, which regimes apply, sector obligations, market entry requirements, licensing gaps, and a remediation roadmap.",
      },
    ],
  },

  // ===================================================================
  // 03 — INDUSTRY COMPLIANCE
  // ===================================================================
  {
    id: "industry-compliance",
    label: "Industry Compliance",
    description:
      "Meeting the rules a product is actually judged against: governance and standards, data protection, responsible AI, product safety, and security, read against the sector the product operates in.",
    kind: "catalogue",
    sectors: [
      "Fintech & payments", "Health & digital health", "Education technology",
      "E-commerce, logistics & mobility", "Agritech", "Public sector & govtech",
      "AI products & platforms",
    ],
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
  // 04 — EMBEDDED PRODUCT COUNSEL  (an arrangement, not a list)
  // ===================================================================
  {
    id: "embedded-product-counsel",
    label: "Embedded Product Counsel",
    description:
      "Ongoing counsel from inside the product team rather than from outside it, reaching across the technical work, the legal work, and the compliance obligations at once, for as long as the engagement runs.",
    kind: "engagement",
    covers: [
      { categoryId: "technical-development", note: "Architecture, engineering, testing and audit decisions reviewed as they are made, not after they ship." },
      { categoryId: "product-legal-commercialization", note: "Review, audit, ownership and commercial agreements handled as the product changes, rather than redrafted or discovered at the end." },
      { categoryId: "industry-compliance", note: "Governance, data protection, responsible AI, safety and security obligations held continuously rather than revisited at audit time." },
    ],
    howItWorks: [
      { title: "Retained, not per-matter", body: "A monthly retainer rather than a fee per question, so the thing you would hesitate to open a matter for is the thing you raise first." },
      { title: "Inside the build", body: "In the specs, the standups and the pull request discussions, where a decision is still cheap to change." },
      { title: "One person, both halves", body: "The same person reads the architecture and the agreement, so nothing is lost translating between your engineers and outside counsel." },
      { title: "Scoped to a stage", body: "Engagements run for a defined stretch of the product, a build, a launch, a raise, and are reviewed at the end of it." },
    ],
    services: [],
  },

  // ===================================================================
  // 05 — TECH POLICY CONTRIBUTION  (not a commercial offering)
  // ===================================================================
  {
    id: "tech-policy",
    label: "Tech Policy Contribution",
    description:
      "Written and published work on how technology should be governed in Africa, and an open door for an opinion on a question you are working through.",
    kind: "policy",
    opinionOpening:
      "Hi, I'd like Decra's opinion on a technology policy or regulatory question I'm working through.",
    services: [],
  },
];
