const projectDetails = {
  project1: {
    title: "Tyre Junction | Prajakta Bansod",
    label: "01 / Retail Commerce",
    headingMain: "Tyre",
    headingEmphasis: "Junction",
    summary:
      "A product-first storefront concept for the automotive segment, focused on fast catalogue scanning, high-trust buying cues and smoother lead capture for buyers who compare before they commit.",
    pills: ["UI Architecture", "React Frontend", "Conversion UX"],
    role: "UI/UX Designer and React Frontend Developer",
    techStack: ["React", "Responsive CSS", "Component Architecture"],
    liveLink: "/projects/tyre-junction/",
    githubLink: "#contact",
    image: "/asset/project-tyre-junction.svg",
    imageAlt: "Tyre Junction preview",
    metrics: [
      ["3-step", "shopping path designed for quick enquiry submission"],
      ["Clean SKU", "grouping for brand, size and usage-specific browsing"],
      ["Mobile-first", "layout tuned for users comparing products on the go"],
    ],
    challenge:
      "Automotive storefronts usually feel dense and overly technical. The brief was to make product selection easier without dumbing down the information.",
    problem:
      "Buyers need to compare tyre options quickly, but dense catalogue layouts make discovery and enquiry harder than necessary.",
    solution:
      "I structured product categories, cards, trust cues and enquiry paths so users can scan, compare and act with less friction.",
    approach: [
      "Introduced clearer hierarchy between category, product and CTA zones.",
      "Used cards and filters that reduce scanning effort on long listings.",
      "Kept trust markers close to action points to improve conversion intent.",
    ],
    outcome:
      "The result is a sharper buying flow with cleaner visual structure, better information rhythm and a more premium feel for a practical commerce use case.",
  },
  project2: {
    title: "DocuPitch AI | Prajakta Bansod",
    label: "02 / AI Product",
    headingMain: "DocuPitch",
    headingEmphasis: "AI",
    summary:
      "A guided product workflow that helps founders transform scattered notes into investor-facing stories, deck structures and pitch-ready content using LLMs.",
    pills: ["Prompt UX", "Dashboard Design", "Flow Simplification"],
    role: "Product UI Designer and Frontend Developer",
    techStack: ["React", "AI Workflow UX", "Dashboard UI"],
    liveLink: "/projects/docupitch-ai/",
    githubLink: "#contact",
    image: "/asset/project-docupitch-ai.svg",
    imageAlt: "DocuPitch AI preview",
    metrics: [
      ["Input to output", "structured into one guided generation journey"],
      ["AI clarity", "through progressive disclosure instead of prompt overload"],
      ["Deck-ready", "sections shaped for immediate founder use and review"],
    ],
    challenge:
      "AI products become confusing quickly when every input field competes for attention. This concept needed confidence, not complexity.",
    problem:
      "Founders often have scattered notes but need a clear, investor-ready story without wrestling with open-ended prompt forms.",
    solution:
      "I designed a guided flow with structured inputs, generation states and review-ready outputs that make the AI experience feel product-led.",
    approach: [
      "Organised the workflow into digestible blocks with clear next actions.",
      "Balanced structured forms with generative flexibility for better output.",
      "Used strong status and result states so users always know where they are.",
    ],
    outcome:
      "The interface feels more product-led than experimental, which is critical when AI has to support high-trust business communication.",
  },
  project3: {
    title: "Flux Payments | Prajakta Bansod",
    label: "03 / Fintech Operations",
    headingMain: "Flux",
    headingEmphasis: "Payments",
    summary:
      "A monitoring and controls interface for cross-border transaction flows, designed to make approvals, exceptions and settlement status easier to act on.",
    pills: ["Fintech UI", "Data Visibility", "Operational Workflows"],
    role: "UX/UI Designer for Data-heavy Product Flows",
    techStack: ["React", "Dashboard Systems", "Data UI"],
    liveLink: "/projects/flux-payments/",
    githubLink: "#contact",
    image: "/asset/project-flux-payments.svg",
    imageAlt: "Flux Payments preview",
    metrics: [
      ["Realtime", "status visibility for approval and settlement checkpoints"],
      ["Risk-aware", "screen hierarchy built around the most critical actions first"],
      ["Readable", "data presentation simplified for faster operational decisions"],
    ],
    challenge:
      "Payment operations products can collapse into noisy dashboards. The system needed to communicate urgency without overwhelming the user.",
    problem:
      "Operations teams need fast visibility into approvals, risks and settlements, but overloaded dashboards slow decisions down.",
    solution:
      "I separated urgent actions from secondary analytics and designed modular cards that keep transaction status readable.",
    approach: [
      "Separated high-priority transaction controls from secondary analytics.",
      "Used contrast and spacing to make risk states more immediately legible.",
      "Created card-based modules that can scale with additional workflows later.",
    ],
    outcome:
      "The resulting concept feels cleaner, faster and more executive-ready while preserving the depth required for a serious fintech product.",
  },
  project4: {
    title: "Portfolio CMS | Prajakta Bansod",
    label: "04 / Admin CMS",
    headingMain: "Portfolio",
    headingEmphasis: "CMS",
    summary:
      "A role-based admin dashboard for managing portfolio content, projects and updates without editing the frontend manually.",
    pills: ["MERN Stack", "Admin Dashboard", "CRUD Workflows"],
    role: "Full-stack Developer",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    liveLink: "/projects/personal-portfolio-cms/",
    githubLink: "#contact",
    image: "/asset/project-tyre-junction.svg",
    imageAlt: "Portfolio CMS preview",
    metrics: [
      ["CRUD", "content management flow for project and page updates"],
      ["Role-based", "admin experience structured around permissions"],
      ["Reusable", "dashboard modules built for repeat editing tasks"],
    ],
    challenge:
      "Updating a portfolio manually becomes slow when project content changes often.",
    problem:
      "The owner needs a faster way to manage project details, content blocks and page updates without touching frontend code every time.",
    solution:
      "I built dashboard patterns for content entry, list management and update flows using reusable MERN modules.",
    approach: [
      "Defined clear content models for repeatable portfolio sections.",
      "Created CRUD screens with predictable editing and review states.",
      "Kept the dashboard structure simple so updates stay fast.",
    ],
    outcome:
      "The CMS direction makes the portfolio easier to maintain and shows practical full-stack product thinking.",
  },
  project5: {
    title: "Vedic Math Game | Prajakta Bansod",
    label: "05 / Learning Tool",
    headingMain: "Vedic Math",
    headingEmphasis: "Game",
    summary:
      "An educational desktop game that makes Vedic math practice more interactive with guided screens, gameplay and feedback.",
    pills: ["Python", "PySide6", "Game UI"],
    role: "Python Desktop App Developer and UI Designer",
    techStack: ["Python", "PySide6", "Qt", "Game Logic"],
    liveLink: "/projects/vedic-math-game/",
    githubLink: "#contact",
    image: "/asset/project-flux-payments.svg",
    imageAlt: "Vedic Math Game preview",
    metrics: [
      ["Practice", "math learning structured as repeatable gameplay"],
      ["Feedback", "states designed to keep students oriented"],
      ["Desktop", "cross-platform UI direction with Python and Qt"],
    ],
    challenge:
      "Math practice can feel repetitive when the interface does not reward progress.",
    problem:
      "Students need a more engaging way to practice mental math techniques without losing clarity or focus.",
    solution:
      "I shaped the learning flow into game-like screens with clear prompts, feedback and progression.",
    approach: [
      "Built UI screens around simple learning actions and fast feedback.",
      "Kept controls familiar so the math remains the focus.",
      "Structured the experience for repeated practice sessions.",
    ],
    outcome:
      "The project demonstrates how I can combine UI design, app logic and educational interaction into a practical tool.",
  },
};

export default projectDetails;
