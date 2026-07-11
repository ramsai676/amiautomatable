import type { RolePreset } from './types';

/**
 * Pre-analyzed roles — the zero-API-key experience.
 * Scores reflect what shipping AI tools handle today (mid-2026),
 * not lab demos. Calibrated for the Indian white-collar market.
 */
export const ROLE_PRESETS: RolePreset[] = [
  {
    slug: 'accountant',
    role: 'Accountant (junior/mid)',
    summary:
      'The recording half of accounting is largely automated already; the advising half is not. The job is migrating from "maintain the books" to "explain the books".',
    tasks: [
      {
        task: 'Data entry from invoices, receipts and bank statements',
        automatability: 95,
        category: 'automate',
        why: 'OCR + LLM extraction reads invoices better than a tired human. Tally/Zoho already ship this.',
        learn: 'Own the review step: exception handling, not entry.',
      },
      {
        task: 'Bank reconciliation',
        automatability: 90,
        category: 'automate',
        why: 'Rule-based matching plus AI for the stragglers clears 95%+ of lines untouched.',
        learn: 'Investigate the unmatched 5% — that is where fraud and errors hide.',
      },
      {
        task: 'GST return preparation and filing',
        automatability: 75,
        category: 'copilot',
        why: 'Software drafts GSTR-1/3B from the books; classification edge cases and notices still need judgment.',
        learn: 'Become the person who handles notices and mismatches, not the person who files.',
      },
      {
        task: 'Preparing financial statements',
        automatability: 70,
        category: 'copilot',
        why: 'Drafting from a clean trial balance is automatable; the judgment calls (provisions, disclosures) are not.',
        learn: 'Accounting-standards judgment and documentation of positions taken.',
      },
      {
        task: 'Client advisory — tax planning, structure, cash flow',
        automatability: 30,
        category: 'moat',
        why: 'Clients pay for accountability and context, not information. AI informs the advice; you own it.',
        learn: 'Use AI to prep scenarios before every client call — advice quality compounds.',
      },
      {
        task: 'Audit fieldwork and vouching',
        automatability: 55,
        category: 'copilot',
        why: 'Sampling, ticking and tracing are automating fast; professional skepticism is the human part.',
        learn: 'Data-analytics-driven audit: test full populations, not samples.',
      },
      {
        task: 'Client relationships and new business',
        automatability: 10,
        category: 'moat',
        why: 'Trust is earned in person. Nobody hires an AI to sign their audit.',
        learn: 'The freed hours from tasks above go here.',
      },
    ],
    moatAdvice:
      'Compliance work is a shrinking island — advisory is the mainland. Every hour AI saves you on entry and reconciliation should move to notices, planning and client conversations.',
    learnPriorities: [
      { skill: 'AI-assisted accounting tools (Zoho AI, Tally + LLM workflows)', why: 'The accountant who reviews 10 clients’ books in the time of one wins on price and margin.' },
      { skill: 'GST notice handling and litigation support', why: 'Messy, high-stakes, human — and demand is growing.' },
      { skill: 'Financial storytelling for owners', why: 'Small-business owners need the numbers explained, not printed.' },
    ],
  },
  {
    slug: 'recruiter',
    role: 'HR Recruiter',
    summary:
      'Sourcing and screening — the bulk of a recruiter’s day — are the most automated parts of HR. Closing candidates and reading people remain stubbornly human.',
    tasks: [
      {
        task: 'Writing job descriptions',
        automatability: 90,
        category: 'automate',
        why: 'A one-line brief produces a solid JD. Editing beats authoring.',
        learn: 'Feed the AI real team context — generic JD in, generic candidates out.',
      },
      {
        task: 'Resume screening and shortlisting',
        automatability: 85,
        category: 'automate',
        why: 'LLMs rank hundreds of CVs against a rubric in minutes, with better consistency than a rushed human.',
        learn: 'Design the rubric; audit for bias. The screener becomes the screen-designer.',
      },
      {
        task: 'Sourcing and outreach messages',
        automatability: 80,
        category: 'copilot',
        why: 'AI personalizes at scale, but candidates smell templates — the best outreach is AI-drafted, human-finished.',
        learn: 'Quality bar per message, volume from the machine.',
      },
      {
        task: 'Interview scheduling and coordination',
        automatability: 95,
        category: 'automate',
        why: 'Pure coordination. Calendar agents already do this end-to-end.',
        learn: 'Stop doing this manually this month.',
      },
      {
        task: 'Conducting interviews and assessing candidates',
        automatability: 35,
        category: 'moat',
        why: 'AI can transcribe and structure, but reading motivation, culture-fit and honesty is human judgment.',
        learn: 'Structured interviewing — your judgment plus AI notes beats either alone.',
      },
      {
        task: 'Offer negotiation and closing',
        automatability: 15,
        category: 'moat',
        why: 'A candidate weighing two offers decides on the human relationship. This is sales.',
        learn: 'The recruiters who survive are closers, not coordinators.',
      },
      {
        task: 'Employer branding and candidate experience',
        automatability: 45,
        category: 'copilot',
        why: 'Content production automates; the authenticity and strategy do not.',
        learn: 'Own the narrative, outsource the typing.',
      },
    ],
    moatAdvice:
      'The funnel top is gone to machines — be the funnel bottom. A recruiter who closes hard-to-get candidates is more valuable than ever, precisely because screening got cheap.',
    learnPriorities: [
      { skill: 'AI sourcing stacks (LinkedIn + LLM ranking + enrichment tools)', why: 'Run the machine instead of being compared to it.' },
      { skill: 'Structured interviewing and assessment design', why: 'Judgment is the moat — make yours measurably good.' },
      { skill: 'Closing and negotiation', why: 'The last human step in the funnel commands the fee.' },
    ],
  },
  {
    slug: 'support',
    role: 'Customer Support Executive',
    summary:
      'Tier-1 support is the most exposed white-collar job in the country. The escape route is upward: escalations, retention, and making the bots better.',
    tasks: [
      {
        task: 'Answering common product questions (chat/email)',
        automatability: 95,
        category: 'automate',
        why: 'RAG chatbots resolve 70–90% of tier-1 tickets today, in every Indian language.',
        learn: 'Move from answering to auditing: own the bot’s quality metrics.',
      },
      {
        task: 'Ticket triage and routing',
        automatability: 95,
        category: 'automate',
        why: 'Classification is what LLMs are best at.',
        learn: '—',
      },
      {
        task: 'Handling angry or escalated customers',
        automatability: 30,
        category: 'moat',
        why: 'De-escalation needs empathy, authority to deviate from script, and accountability.',
        learn: 'Become the escalation specialist — the human the bot hands over to.',
      },
      {
        task: 'Processing refunds, replacements, account changes',
        automatability: 75,
        category: 'copilot',
        why: 'Agentic workflows execute these, but businesses keep a human approval on money-touching steps.',
        learn: 'Be the approver: judgment on exceptions, fraud instinct.',
      },
      {
        task: 'Writing help-center articles and macros',
        automatability: 85,
        category: 'automate',
        why: 'AI drafts from resolved tickets; you curate.',
        learn: 'Knowledge-base ownership is a real role — claim it.',
      },
      {
        task: 'Retention and win-back conversations',
        automatability: 25,
        category: 'moat',
        why: 'Saving a cancelling customer is persuasion with stakes — still human-led.',
        learn: 'Retention skills convert directly into revenue responsibility (and pay).',
      },
      {
        task: 'Reporting support metrics to management',
        automatability: 80,
        category: 'copilot',
        why: 'Dashboards self-generate; the "what should we change" recommendation is yours.',
        learn: 'Bring one insight per report that the dashboard can’t.',
      },
    ],
    moatAdvice:
      'The seat that answers tickets is disappearing; the seats around it are growing — bot trainer, escalation owner, retention specialist, CX analyst. Pick one and move before the floor does.',
    learnPriorities: [
      { skill: 'Conversation design / bot training', why: 'Every company deploying support AI needs humans who know what customers actually ask.' },
      { skill: 'De-escalation and retention', why: 'The tickets that remain human are the hardest and most valuable ones.' },
      { skill: 'Support analytics', why: 'Turning ticket data into product fixes is a promotion path.' },
    ],
  },
  {
    slug: 'content-writer',
    role: 'Content Writer',
    summary:
      'Generic content is free now. What remains valuable: original reporting, strong opinion, deep niche expertise, and the editorial judgment to run AI without publishing slop.',
    tasks: [
      {
        task: 'SEO blog posts and listicles',
        automatability: 90,
        category: 'automate',
        why: 'The commodity end of writing is fully automated — and the market knows it.',
        learn: 'Exit this segment; it pays less every quarter.',
      },
      {
        task: 'Social media captions and calendars',
        automatability: 85,
        category: 'automate',
        why: 'Volume + format-fitting is machine work. Voice consistency needs your review.',
        learn: 'Sell the strategy and voice, not the captions.',
      },
      {
        task: 'Long-form thought leadership (ghostwriting)',
        automatability: 55,
        category: 'copilot',
        why: 'AI drafts, but the founder’s actual stories and takes come from your interviews.',
        learn: 'Interviewing is the differentiator — the writing is increasingly assembly.',
      },
      {
        task: 'Original reporting, interviews, case studies',
        automatability: 25,
        category: 'moat',
        why: 'AI cannot call a customer, notice the offhand quote, or earn a source’s trust.',
        learn: 'Every piece with a primary source is inimitable. Do more of these.',
      },
      {
        task: 'Editing and fact-checking AI drafts',
        automatability: 40,
        category: 'copilot',
        why: 'Ironically growing: someone must catch the confident nonsense.',
        learn: 'Position as an editor-in-chief of machines — higher leverage than writing.',
      },
      {
        task: 'Brand voice development and messaging strategy',
        automatability: 35,
        category: 'moat',
        why: 'Choosing what a brand sounds like is taste + business context. AI executes it after you define it.',
        learn: 'Package this as the premium offer.',
      },
      {
        task: 'Email newsletters and nurture sequences',
        automatability: 75,
        category: 'copilot',
        why: 'Structure and drafts automate; the subject-line instinct and list-knowledge are yours.',
        learn: 'Own the metrics, not the typing.',
      },
    ],
    moatAdvice:
      'The writers being replaced are the ones who were already writing like machines. Move up: primary sources, strong POV, editorial command of AI output. Sell outcomes (leads, authority), not word counts.',
    learnPriorities: [
      { skill: 'AI-assisted editorial workflow', why: '10× output at your quality bar — or someone else will offer it.' },
      { skill: 'Interviewing and original research', why: 'Primary material is the only unfakeable input.' },
      { skill: 'Distribution (SEO is dying, audiences are not)', why: 'Writers who bring an audience never lack work.' },
    ],
  },
  {
    slug: 'junior-developer',
    role: 'Junior Software Developer',
    summary:
      'AI writes most junior-level code today. The role isn’t dying — it’s skipping a level: juniors are now expected to review, integrate and ship like early-mid engineers.',
    tasks: [
      {
        task: 'Writing CRUD features from tickets',
        automatability: 85,
        category: 'automate',
        why: 'Well-specified, pattern-heavy code is what coding agents do best.',
        learn: 'Write the spec and review the diff — the ticket-to-PR pipeline is the new unit of work.',
      },
      {
        task: 'Fixing well-described bugs',
        automatability: 75,
        category: 'copilot',
        why: 'Agents fix reproducible bugs; gnarly, cross-system ones still need a human debugger.',
        learn: 'Debugging skill compounds — it is the hardest thing to fake.',
      },
      {
        task: 'Writing unit tests',
        automatability: 90,
        category: 'automate',
        why: 'Mechanical test-writing is automated; deciding what MUST be tested is not.',
        learn: 'Think in failure modes, not coverage numbers.',
      },
      {
        task: 'Code review',
        automatability: 50,
        category: 'copilot',
        why: 'AI catches bugs and style; architectural pushback and mentoring are human.',
        learn: 'Reviewing AI code at volume is the actual new job description.',
      },
      {
        task: 'System design and architecture decisions',
        automatability: 30,
        category: 'moat',
        why: 'Trade-offs against business constraints, team skills and history — context AI doesn’t hold.',
        learn: 'Get into design discussions years earlier than the old career path allowed.',
      },
      {
        task: 'Understanding requirements from stakeholders',
        automatability: 25,
        category: 'moat',
        why: 'The gap between what users say and need is closed by conversation, not generation.',
        learn: 'Engineers who can talk to customers were always rare. Now they’re mandatory.',
      },
      {
        task: 'DevOps, deployment and incident response',
        automatability: 55,
        category: 'copilot',
        why: 'Runbooks automate; 3am judgment under pressure doesn’t.',
        learn: 'Owning production builds trust no prompt can.',
      },
    ],
    moatAdvice:
      'Stop measuring yourself in lines of code. The juniors who thrive treat AI as their team of interns: they spec, review, integrate and take responsibility for shipping. Depth (debugging, systems) beats breadth of syntax.',
    learnPriorities: [
      { skill: 'Agentic coding workflows (Claude Code, etc.)', why: 'The 10× junior is the one directing the tools, today.' },
      { skill: 'Debugging and systems internals', why: 'When AI code breaks weirdly, this skill is the bottleneck.' },
      { skill: 'Product thinking', why: 'Code is cheap now; knowing what to build is not.' },
    ],
  },
  {
    slug: 'digital-marketer',
    role: 'Digital Marketing Executive',
    summary:
      'Execution (ads, posts, emails) is automating fast while judgment (positioning, budget, brand) is not. The role is consolidating: one strategist with AI replaces a small execution team.',
    tasks: [
      {
        task: 'Creating ad creatives and copy variants',
        automatability: 90,
        category: 'automate',
        why: 'Generating 50 variants for testing is exactly what generative tools are for.',
        learn: 'Taste and brand-fit filtering is your value in this loop.',
      },
      {
        task: 'Campaign setup and budget management',
        automatability: 70,
        category: 'copilot',
        why: 'Platforms’ AI (Advantage+, PMax) already runs targeting; humans set strategy and guard the spend.',
        learn: 'Understand what the black box optimizes for — and when to override it.',
      },
      {
        task: 'Performance reporting',
        automatability: 90,
        category: 'automate',
        why: 'Dashboards and AI summaries. Nobody should hand-build weekly reports anymore.',
        learn: 'Deliver the "so what", not the numbers.',
      },
      {
        task: 'SEO content and keyword work',
        automatability: 80,
        category: 'copilot',
        why: 'Traditional SEO is shrinking as search itself changes; AI does the mechanical parts.',
        learn: 'Shift to AI-search visibility and owned audiences.',
      },
      {
        task: 'Marketing strategy and positioning',
        automatability: 30,
        category: 'moat',
        why: 'Positioning requires market feel, customer conversations and the courage to choose.',
        learn: 'This is the job in 3 years. Everything else is its execution layer.',
      },
      {
        task: 'Influencer and partnership management',
        automatability: 25,
        category: 'moat',
        why: 'Deals between humans, negotiated on relationships.',
        learn: 'Relationship capital compounds and can’t be prompted.',
      },
      {
        task: 'Community management and engagement',
        automatability: 55,
        category: 'copilot',
        why: 'Drafts and moderation automate; authentic presence is detectable and valued.',
        learn: 'Communities forgive typos, not fakeness.',
      },
    ],
    moatAdvice:
      'Agencies billing for execution are collapsing into tools. Bill for judgment: strategy, positioning, and accountability for revenue numbers. Run the AI stack yourself and pocket the margin.',
    learnPriorities: [
      { skill: 'Full-stack AI marketing ops', why: 'One person now runs what a 5-person team did — be that person.' },
      { skill: 'Positioning and offer design', why: 'The most leveraged, least automatable marketing skill.' },
      { skill: 'First-party data and owned audiences', why: 'Platform targeting is commoditized; your list is not.' },
    ],
  },
  {
    slug: 'data-analyst',
    role: 'Data Analyst',
    summary:
      'SQL and dashboards are automating; asking the right question and changing the decision are not. Analysts move up the stack or get abstracted by it.',
    tasks: [
      {
        task: 'Writing SQL queries for ad-hoc requests',
        automatability: 85,
        category: 'automate',
        why: 'Text-to-SQL works on clean schemas. The requester will increasingly self-serve.',
        learn: 'Own the semantic layer that makes self-serve trustworthy.',
      },
      {
        task: 'Building and maintaining dashboards',
        automatability: 75,
        category: 'copilot',
        why: 'Generation is easy; knowing which 5 numbers matter is the actual skill.',
        learn: 'Fewer dashboards, sharper metrics.',
      },
      {
        task: 'Data cleaning and preparation',
        automatability: 80,
        category: 'copilot',
        why: 'AI handles the mechanics; deciding what "clean" means for the business is judgment.',
        learn: 'Data quality ownership is durable work.',
      },
      {
        task: 'Root-cause analysis ("why did X drop?")',
        automatability: 50,
        category: 'copilot',
        why: 'AI explores hypotheses fast, but causal reasoning about YOUR business needs context.',
        learn: 'Pair AI hypothesis-generation with your domain knowledge — this is the power combo.',
      },
      {
        task: 'Presenting insights to stakeholders',
        automatability: 30,
        category: 'moat',
        why: 'Persuading a leadership team to act is communication and credibility.',
        learn: 'The analyst who changes decisions gets promoted; the one who sends charts gets automated.',
      },
      {
        task: 'Defining metrics and experiment design',
        automatability: 35,
        category: 'moat',
        why: 'What to measure and how to test it shapes everything downstream — deeply contextual.',
        learn: 'Experimentation skill is scarce and rising in value.',
      },
      {
        task: 'Regular reporting (weekly/monthly packs)',
        automatability: 90,
        category: 'automate',
        why: 'Scheduled narratives over known data — fully automatable.',
        learn: 'Kill this work proudly and reinvest the time.',
      },
    ],
    moatAdvice:
      'Your moat is context: what the business is trying to do, what broke last quarter, which metric the CEO actually watches. AI has none of that unless you wield it. Become the decision-changer, not the query-runner.',
    learnPriorities: [
      { skill: 'AI-assisted analysis (LLM + notebooks/SQL agents)', why: 'Analysts using AI do a week of exploration in a day.' },
      { skill: 'Causal inference and experimentation', why: 'The questions that remain are the hard ones.' },
      { skill: 'Executive communication', why: 'Insight that doesn’t change a decision is decoration.' },
    ],
  },
  {
    slug: 'sales-executive',
    role: 'Sales Executive (B2B)',
    summary:
      'Everything around the conversation is automating — research, outreach, notes, follow-ups. The conversation itself, and the trust it builds, is the last mile that pays.',
    tasks: [
      {
        task: 'Prospect research and list building',
        automatability: 90,
        category: 'automate',
        why: 'Enrichment tools + LLMs build researched lists in minutes.',
        learn: 'Spend the saved hours on calls, not lists.',
      },
      {
        task: 'Cold outreach (email/LinkedIn/WhatsApp)',
        automatability: 80,
        category: 'copilot',
        why: 'AI personalizes at scale, but response rates reward the genuinely human touch.',
        learn: 'AI for volume, you for the accounts that matter.',
      },
      {
        task: 'Discovery calls and needs analysis',
        automatability: 25,
        category: 'moat',
        why: 'Reading the room, earning candor, hearing what’s unsaid — the core craft.',
        learn: 'AI preps you before and debriefs you after; the call is yours.',
      },
      {
        task: 'Proposal and quote preparation',
        automatability: 85,
        category: 'automate',
        why: 'From call transcript to draft proposal is a solved problem.',
        learn: 'Review for the landmines only you know about.',
      },
      {
        task: 'CRM updates and follow-up scheduling',
        automatability: 95,
        category: 'automate',
        why: 'Nobody should type call notes into a CRM in 2026.',
        learn: 'Adopt the tooling this week.',
      },
      {
        task: 'Negotiation and closing',
        automatability: 15,
        category: 'moat',
        why: 'High-stakes persuasion between humans. The signature is earned, not generated.',
        learn: 'The freed admin time compounds directly into more closing time.',
      },
      {
        task: 'Account management and upsells',
        automatability: 35,
        category: 'moat',
        why: 'Relationships detect churn risk and expansion moments before any dashboard.',
        learn: 'AI flags the signal; you make the save.',
      },
    ],
    moatAdvice:
      'Sales is the safest seat in the building — if you shed the admin. Reps who let AI run research, notes and follow-ups spend 3× more time in conversations, and conversations are where quota lives.',
    learnPriorities: [
      { skill: 'AI sales stack (enrichment, outreach, call intelligence)', why: 'The tooling gap between reps is becoming a quota gap.' },
      { skill: 'Consultative selling', why: 'As product info becomes free, insight becomes the differentiator.' },
      { skill: 'Vertical expertise', why: 'Deep domain knowledge makes you the advisor, not the vendor.' },
    ],
  },
  {
    slug: 'teacher',
    role: 'School Teacher',
    summary:
      'Content delivery and grading automate; motivation, classroom presence and care do not. Teaching is among the safer professions — but the prep-heavy parts of it are transforming.',
    tasks: [
      {
        task: 'Lesson planning and material preparation',
        automatability: 80,
        category: 'copilot',
        why: 'AI drafts plans, worksheets and slides instantly; adapting to YOUR classroom is the craft.',
        learn: 'Reclaim your evenings — curate instead of create.',
      },
      {
        task: 'Grading homework and tests',
        automatability: 75,
        category: 'copilot',
        why: 'Objective grading automates fully; essays need review, and feedback benefits from your voice.',
        learn: 'Shift time from marking to feedback conversations.',
      },
      {
        task: 'Classroom teaching and management',
        automatability: 15,
        category: 'moat',
        why: 'Thirty children need a present human. Full stop.',
        learn: 'This is the job. Everything else is overhead being removed.',
      },
      {
        task: 'Doubt-solving and personalized explanation',
        automatability: 60,
        category: 'copilot',
        why: 'AI tutors handle the 10pm doubt well; knowing WHY this child is stuck is yours.',
        learn: 'Use AI tutors as your teaching assistants, not your replacement.',
      },
      {
        task: 'Parent communication and reports',
        automatability: 70,
        category: 'copilot',
        why: 'Drafting automates; the judgment about what a parent needs to hear does not.',
        learn: 'Templates + personal knowledge = faster, better reports.',
      },
      {
        task: 'Mentoring and student motivation',
        automatability: 10,
        category: 'moat',
        why: 'A teacher who believes in a student changes a life. No model does this.',
        learn: 'The hours saved above belong here.',
      },
      {
        task: 'Administrative work and record keeping',
        automatability: 85,
        category: 'automate',
        why: 'Attendance, records, circulars — pure process.',
        learn: 'Push your school to adopt the tools.',
      },
    ],
    moatAdvice:
      'AI removes the parts of teaching that burn teachers out and leaves the parts that made you choose it. The risk isn’t replacement — it’s schools that use AI to raise class sizes. The teachers who master these tools will define how they’re used.',
    learnPriorities: [
      { skill: 'AI lesson-prep workflow', why: '10 hours a week back, immediately.' },
      { skill: 'Data-informed personalization', why: 'AI tutoring data shows you exactly who is stuck where.' },
      { skill: 'Social-emotional mentoring', why: 'The irreplaceable core — invest in it deliberately.' },
    ],
  },
];

export function getPreset(slug: string): RolePreset | undefined {
  return ROLE_PRESETS.find((r) => r.slug === slug);
}
