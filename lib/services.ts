// Service areas are grouped by the kind of decision and engagement they serve.
// `kind` controls the page structure; the positioning copy explains when each
// area is useful, what it can produce, and where its scope ends.
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
  /** Search title and description should describe this page, not a generic template. */
  searchTitle?: string;
  searchDescription?: string;
  /** The decision this practice area helps a client make, its scope, and its limits. */
  positioning?: {
    decisionPoint: string;
    approach: string;
    outputs: string[];
    boundaries: string;
    faqs: { question: string; answer: string }[];
  };
  arrangementHeading?: string;
  relatedWork?: { label: string; href: string }[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  // ===================================================================
  // 01 — TECHNICAL DEVELOPMENT, STRUCTURING & AUDIT
  // ===================================================================
  {
    id: "technical-development",
    label: "Technical Development, Structuring & Audit",
    description:
      "Technical product development and assurance for teams deciding what to build, how to structure it, and whether it is ready to operate, scale or withstand independent review.",
    kind: "catalogue",
    searchTitle: "AI Systems Engineering & Technology Due Diligence in Kenya",
    searchDescription: "Product engineering, AI systems, architecture, testing and technology due diligence for teams building, investing in or assessing technology in Kenya and across Africa.",
    positioning: {
      decisionPoint: "For founders, product leaders and investors who need a defensible view of what to build, buy, change or trust before committing further time or capital.",
      approach: "Start with the decision and its constraints. Review the product, architecture, operating context and evidence available; then identify the trade-offs, failure modes and next steps that matter to that decision.",
      outputs: ["Architecture and build-versus-buy recommendations", "Risk-ranked technical findings and remediation priorities", "System designs, prototypes or engineering deliverables agreed in scope"],
      boundaries: "The scope defines systems reviewed, access, testing depth, environments and deliverables. A review is time- and evidence-bound; it is not a guarantee that a system is secure, compliant or free of defects.",
      faqs: [
        { question: "When should we commission a technical product or architecture review?", answer: "Before a major build, migration, launch, procurement or investment decision—when a clear view of the system and its constraints can still change the decision." },
        { question: "Does a technical audit include penetration testing?", answer: "Only if the engagement specifically includes it. The proposal defines the systems, methods, access and test boundaries; a code or architecture review is not the same as an authorized penetration test." },
        { question: "What does technology due diligence cover?", answer: "The agreed review may examine architecture, code, infrastructure, data, AI, security and technical operating risks. The findings are prioritized for the transaction or investment question, rather than presented as a generic checklist." },
      ],
    },
    sections: [
      {
        title: "Structure & Build",
        blurb: "Set the product direction, organizational foundations and technical architecture before committing to a build path.",
        serviceIds: ["product-strategy-roadmap", "startup-structuring-incorporation", "system-design-architecture", "web-application-engineering", "data-architecture", "api-integration-engineering", "cloud-infrastructure", "ai-systems-engineering", "algorithms-decision-systems", "iot-robotics-connected-systems"],
      },
      {
        title: "Test & Challenge",
        blurb: "Evaluate product behavior under representative workloads, failure conditions and adversarial use.",
        serviceIds: ["product-testing", "web-site-application-testing", "api-server-testing", "performance-scalability-testing", "failure-resilience-testing", "adversarial-product-testing", "ai-evaluation-testing", "security-assurance"],
      },
      {
        title: "Audit & Assure",
        blurb: "Independent technical findings to inform governance, investment, procurement and acquisition decisions.",
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
      "Product-focused legal review and technology transactions for teams preparing to launch, commercialize, license, procure or invest in digital products.",
    kind: "catalogue",
    searchTitle: "Technology Transactions, IP & Product Legal Review | Kenya",
    searchDescription: "Product terms, privacy, software IP, AI and data ownership, technology contracts and regulatory gap reviews for digital businesses in Kenya and Africa.",
    positioning: {
      decisionPoint: "For product and commercial teams approaching launch, a material partnership, a procurement, a financing or an acquisition—and needing to understand the legal and ownership issues that could change the terms or timing.",
      approach: "Read the product, data flows and commercial model alongside the relevant agreements. Separate launch-critical issues from matters that can be managed contractually or addressed over time, then set out practical next actions.",
      outputs: ["Prioritized product, privacy and contract findings", "Ownership, licensing and open-source issue maps", "Drafting or transaction support defined in the engagement scope"],
      boundaries: "This is product and technology advisory. Formal legal representation, court work and filings are outside scope and are referred to a practising advocate where required. Applicable law, markets and deliverables are agreed at intake.",
      faqs: [
        { question: "When is a product legal review most useful?", answer: "Before launch or a significant change to product features, data use, pricing or third-party integrations—especially when existing terms may no longer describe how the product works." },
        { question: "Can you review technology agreements and ownership?", answer: "Yes. Scope can include SaaS, licensing, procurement, vendor, development and data-processing arrangements, as well as software, AI, data and contractor IP ownership." },
        { question: "Does this include court representation or formal filings?", answer: "No. The practice focuses on product and technology advisory. Matters requiring formal representation or filings are referred to a practising advocate." },
      ],
    },
    sections: [
      {
        title: "Review & Audit",
        blurb: "Examining a product already built, or about to ship, against what it claims and what the law requires, written up as findings to act on.",
        serviceIds: ["product-legal-review", "data-protection-audit", "ai-compliance-audit", "consumer-terms-audit", "licensing-compliance-audit", "regulatory-gap-analysis"],
      },
      {
        title: "Ownership & Commercialization",
        blurb: "Who owns what inside the product, and the agreements it is taken to market on.",
        serviceIds: ["technology-ip", "technology-transactions", "cyber-insurance-pi"],
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
        id: "cyber-insurance-pi",
        label: "Cyber Insurance & Professional Indemnity",
        body: "Reading and placing the cover that sits behind the product: what a breach, an outage, or a bad line of code actually exposes a developer or a procurer to, and what a policy would need to answer for it to be worth the premium.",
        items: [
          "Cyber liability cover", "Professional indemnity cover", "Policy wording review",
          "Coverage gap analysis", "Vendor & procurer risk allocation", "Breach & incident response cover",
          "Claims support",
        ],
        opening: "Hi, I need help with cyber insurance or professional indemnity cover, as a developer or as a procurer, policy wording review, coverage gaps, or risk allocation.",
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
      "Governance, privacy, AI, safety and security advisory that translates a product’s applicable obligations into controls, accountable owners and decisions a team can implement.",
    kind: "catalogue",
    searchTitle: "AI Governance, Data Protection & Technology Compliance | Kenya",
    searchDescription: "Practical technology governance, privacy, responsible AI, product safety and security support, mapped to product risks and sector obligations in Kenya and Africa.",
    positioning: {
      decisionPoint: "For teams whose products operate in a regulated or high-impact context, or whose customers and investors now expect evidence of governance—not just policy statements.",
      approach: "Identify the jurisdictions, sector rules, contractual commitments and product-specific risks that actually apply. Translate them into proportionate controls, documentation, ownership and an implementation sequence.",
      outputs: ["Applicability and obligation maps tied to products and markets", "Control gaps, risk priorities and accountable action plans", "Governance, privacy, AI and safety documentation scoped to the work"],
      boundaries: "Compliance depends on the facts, applicable law and how controls operate in practice. Advisory identifies and helps address gaps; it does not certify compliance or replace required regulatory, security or legal approvals.",
      faqs: [
        { question: "How do you determine which technology rules apply?", answer: "The review starts with the product, data, users, operating model and target markets. It then distinguishes binding legal duties from standards, contracts and voluntary frameworks relevant to the engagement." },
        { question: "Can governance work be made practical for an engineering team?", answer: "Yes. Findings can be translated into product requirements, technical controls, owners, evidence and a sequenced remediation plan, with implementation support agreed separately." },
        { question: "Does an assessment certify that we are compliant?", answer: "No. It provides a scoped assessment and practical recommendations based on the information and systems reviewed. It is not a certification or guarantee of compliance." },
      ],
    },
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
      "Ongoing technical product counsel for technology teams that need product, engineering, privacy and governance decisions considered together throughout a defined stage of development or growth.",
    kind: "engagement",
    arrangementHeading: "How ongoing product counsel works",
    searchTitle: "Technical Product Counsel in Kenya | Embedded Product Advice",
    searchDescription: "Ongoing, scoped technical product counsel in Nairobi for product and engineering teams navigating AI, privacy, governance, technology risk and commercialization.",
    positioning: {
      decisionPoint: "For founders and product leaders who face a continuing stream of consequential product decisions and want legal, privacy and risk considerations present while those decisions can still shape the build.",
      approach: "Work to an agreed cadence and scope alongside the product team. Bring requirements, architecture, data use, vendor choices and commercialization questions into view early enough to inform the decision—not just document it later.",
      outputs: ["Product and engineering decision advice within the agreed scope", "Reviews of requirements, data flows, AI use and commercial choices", "A defined cadence, access model, term and set of deliverables"],
      boundaries: "This is a scoped advisory engagement, not general outside counsel or court representation. Repository access, code review, meeting attendance and formal legal work are included only when expressly agreed or referred to practising counsel.",
      faqs: [
        { question: "How is embedded product counsel different from a one-off review?", answer: "It provides continuity across a defined period or product stage, so decisions can be considered as they arise. A one-off review assesses a specific product, issue or milestone." },
        { question: "Does embedded counsel join every engineering meeting or review code?", answer: "No. Cadence, access and deliverables are agreed at scoping. Repository, source-code or pull-request review is included only when explicitly agreed." },
        { question: "Is this formal legal representation?", answer: "No. The work is strategic product and technology advisory. Court representation and formal filings are referred to a practising advocate." },
        { question: "Is Decra Kerubo a practising advocate?", answer: "Decra holds a Bachelor of Laws and completed the Attorney Licensing Program at the Kenya School of Law, but is not currently a practising advocate. Her practice focuses on technology and product advisory; formal representation and filings are referred to a practising advocate." },
      ],
    },
    covers: [
      { categoryId: "technical-development", note: "Architecture, engineering, testing and audit decisions reviewed as they are made, not after they ship." },
      { categoryId: "product-legal-commercialization", note: "Review, audit, ownership and commercial agreements handled as the product changes, rather than redrafted or discovered at the end." },
      { categoryId: "industry-compliance", note: "Governance, data protection, responsible AI, safety and security obligations held continuously rather than revisited at audit time." },
    ],
    howItWorks: [
      { title: "Continuity across product decisions", body: "A monthly retainer supports ongoing access across an agreed period, so product questions can be considered as they arise rather than only at a formal review point." },
      { title: "Work alongside the product team", body: "Review requirements, architecture, data flows and governance questions at agreed points in the product lifecycle. Meeting cadence and access are set during scoping." },
      { title: "Technical and legal context together", body: "Training in Computer Science (Artificial Intelligence) and Law supports integrated consideration of system design, product behavior and legal or privacy implications." },
      { title: "Defined scope and boundaries", body: "Each engagement specifies its term, deliverables and working arrangements. Source-code, repository or pull-request review is included only when expressly agreed." },
    ],
    services: [],
  },
  {
    id: "technical-legal-subcontractor",
    label: "Technical Legal Subcontractor",
    description: "Specialist subcontracted support for firms and project teams working at the intersection of technology, product and legal risk.",
    kind: "engagement",
    arrangementHeading: "How subcontract support is structured",
    searchTitle: "Technical Legal Subcontractor in Kenya | Technology Projects",
    searchDescription: "Scoped subcontract support in Kenya for firms and teams handling technology product, AI, privacy, governance and technical risk work.",
    positioning: {
      decisionPoint: "For law firms, consultancies and project leads who need additional technical product or AI capability on a matter, without presenting that support as a separate or unscoped client engagement.",
      approach: "Agree the retaining organization’s brief, workstream, supervision, client-facing role, confidentiality, conflicts process, attribution and work product before work begins. Support can combine technical analysis with product and legal-risk context.",
      outputs: ["Research, analysis and drafting for an agreed workstream", "Technical or AI product review supporting a broader matter", "Defined deliverables and coordination with the lead firm or project owner"],
      boundaries: "The retaining organization remains responsible for its client relationship and supervision unless agreed otherwise. Scope, conflicts, confidentiality, attribution and any reserved legal work must be settled before commencement; this is not a substitute for a practising advocate where one is required.",
      faqs: [
        { question: "Who engages a technical legal subcontractor?", answer: "Typically a law firm, consultancy or project lead that needs defined technology, AI or product-risk capacity within a larger client matter or delivery." },
        { question: "Can the work be client-facing?", answer: "That depends on the lead organization’s instructions and the agreed role. Client contact, attribution, supervision, confidentiality and responsibility should be explicit in the engagement terms." },
        { question: "What can be included in the scope?", answer: "An agreed workstream may include technology and AI research, product or system analysis, governance and privacy review, or drafting support. The scope must identify deliverables, access and any work requiring a practising advocate." },
      ],
    },
    howItWorks: [
      { title: "Defined workstream", body: "Responsibilities, supervision, client contact and deliverables are agreed with the retaining firm or project lead before work begins." },
      { title: "Integrated technical context", body: "Support can connect product and systems evidence with the legal, privacy and governance questions raised by the broader matter." },
      { title: "Clear professional boundaries", body: "Conflicts, confidentiality, attribution and any reserved legal work are addressed in the engagement terms." },
    ],
    services: [],
  },
  {
    id: "ai-and-systems-engineering",
    label: "AI and Systems Engineering",
    description: "AI and software systems designed around a defined operational need, with architecture, evaluation and implementation decisions made explicit.",
    kind: "engagement",
    arrangementHeading: "How engineering engagements are scoped",
    relatedWork: [
      { label: "AI Footprint Tracker", href: "/engineering/ai-footprint-tracker" },
      { label: "Democratization and Decarbonization of AI Solutions", href: "/engineering/ai-decarbonization-research" },
    ],
    searchTitle: "AI & Systems Engineering in Kenya | Technology Teams",
    searchDescription: "AI engineering, system architecture, integrations and evaluation for teams building or improving digital products in Kenya and across Africa.",
    positioning: {
      decisionPoint: "For teams moving from an AI concept or prototype to a system that must work within real workflows, data constraints, user expectations and operating budgets.",
      approach: "Begin with the use case and failure cost. Establish whether AI is appropriate, define system boundaries and data flows, select an architecture, and evaluate performance against real tasks before expanding deployment.",
      outputs: ["AI and software system architecture or implementation", "Integrations, data workflows and human review paths", "Evaluation criteria, test evidence and deployment recommendations"],
      boundaries: "The statement of work defines the system, environments, data access, deployment responsibilities and acceptance criteria. Model performance, safety and operating cost depend on the data and conditions available for evaluation; they are not guaranteed by the design alone.",
      faqs: [
        { question: "When should a team use AI rather than conventional software?", answer: "When the task benefits from probabilistic inference and the expected value justifies the added cost, uncertainty and oversight needs. The use case, fallback path and evaluation method should be established before choosing a model." },
        { question: "Can you take an AI prototype into a production system?", answer: "Potentially, if the agreed scope includes the required engineering, data, integration, evaluation and deployment work. A prototype is assessed first for reliability, security, cost and operational fit." },
        { question: "Can AI engineering and product counsel be combined?", answer: "Yes. Engineering and advisory can be scoped together or separately, with responsibilities, deliverables and any review boundaries made explicit." },
      ],
    },
    howItWorks: [
      { title: "Start with the use case", body: "Define the task, users, constraints and consequences of error before selecting a model or architecture." },
      { title: "Design the whole system", body: "Account for data, integrations, permissions, human review, evaluation and operations—not just the model call." },
      { title: "Validate against real work", body: "Set evaluation criteria and test the system against representative tasks and failure cases before expanding its role." },
    ],
    services: [],
  },
];
