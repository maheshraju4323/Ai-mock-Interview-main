/**
 * Seed script: HR interview questions -> hrQuestions
 * Uses Neon serverless with tagged template literals for all queries.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DRIZZLE_DB_URL);

const questions = [
  // ---------------- Introduction ----------------
  {
    category: 'Introduction',
    question: 'Tell me about yourself.',
    suggestedAnswer: 'Use a present-past-future structure: start with what you do now, briefly cover the relevant experience that led you here, and end with why you are excited about this role. For example: "I am currently a software developer focused on building web applications. Before that, I spent three years strengthening my full-stack skills at a startup, which is why I am excited about this position where I can apply both." Keep it under two minutes and strictly professional.',
    tips: 'Keep it professional, structured, and under two minutes, ending with why this role excites you.',
  },
  {
    category: 'Introduction',
    question: 'What are your greatest strengths?',
    suggestedAnswer: 'Pick two or three strengths that map directly to the job description and back each one with a quick example. Instead of saying you are a great problem-solver, describe how you debugged a production issue that saved your team hours of downtime. Concrete proof makes strengths believable rather than generic.',
    tips: 'Choose strengths from the job description and prove each one with a specific, measurable example.',
  },
  {
    category: 'Introduction',
    question: 'Why should we hire you?',
    suggestedAnswer: 'Connect your top skills to the core requirements of the role and show the immediate value you bring. Say something like: "You need someone who can own the testing pipeline; I built one at my last company that cut release bugs by forty percent, so I can deliver that reliability for you from day one." End by expressing genuine enthusiasm for the company mission.',
    tips: 'Summarize how your skills, experience, and enthusiasm directly solve their biggest need.',
  },
  {
    category: 'Introduction',
    question: 'Where do you see yourself in five years?',
    suggestedAnswer: 'Show ambition that aligns with the company, such as mastering this role, taking on more ownership, and growing into a senior or lead position here. Avoid answers that suggest you plan to leave quickly or want the interviewer\'s job. A safe framing is: "In five years I want to be a trusted expert on this team, mentoring newer members and leading larger projects."',
    tips: 'Demonstrate realistic ambition anchored to growth within their organization, not just titles.',
  },
  {
    category: 'Introduction',
    question: 'Tell me about a time you failed.',
    suggestedAnswer: 'Choose a real but recoverable failure and spend most of the answer on what you learned. For instance: "Early in my career I underestimated a project timeline because I did not account for dependencies. Since then I always build in buffer time and flag risks early, and I have delivered every project since on schedule." Owning the failure honestly shows maturity.',
    tips: 'Never blame others; focus on accountability and the lasting lesson or process change.',
  },
  {
    category: 'Introduction',
    question: 'What motivates you?',
    suggestedAnswer: 'Describe intrinsic motivators tied to the actual work, such as solving difficult problems, seeing users benefit from what you build, or continuously improving your craft. Give a brief example of a time those motivators drove strong results. Aligning your motivation with what the role offers makes the answer resonate.',
    tips: 'Name motivations the job genuinely provides and link them to past achievements.',
  },
  {
    category: 'Introduction',
    question: 'How do you handle pressure?',
    suggestedAnswer: 'Explain a repeatable method: prioritize tasks by impact, break work into smaller steps, and communicate early when timelines are at risk. Then give an example, like delivering a critical feature during a launch crunch by triaging ruthlessly and keeping stakeholders updated daily. Emphasize staying calm rather than working panicked overtime.',
    tips: 'Show a concrete prioritization system plus one real example of thriving under a deadline.',
  },
  {
    category: 'Introduction',
    question: 'What makes you unique?',
    suggestedAnswer: 'Highlight an uncommon combination of skills or experiences rather than claiming to be best at everything. You might say: "Very few developers also enjoy talking directly to customers, so I often translate user feedback into technical requirements faster than most teams manage." Tie that uniqueness to a tangible benefit for the employer.',
    tips: 'Focus on a distinctive combination of skills and connect it to value for the team.',
  },
  {
    category: 'Introduction',
    question: 'Tell me about your biggest accomplishment.',
    suggestedAnswer: 'Use the STAR format: describe the situation, your task, the actions you took, and quantify the result. For example: "Our onboarding flow was losing half of new users, so I redesigned it over two months, and completion rose from fifty to eighty percent, lifting signups noticeably." Pick something recent and relevant to this job.',
    tips: 'Quantify the result with numbers or percentages so the achievement feels credible.',
  },
  {
    category: 'Introduction',
    question: 'Do you have any questions for us?',
    suggestedAnswer: 'Always say yes and ask two or three prepared questions, such as what success looks like in the first ninety days, how the team handles shifting priorities, or what the interviewer enjoys most about working there. Saying no signals disinterest, while thoughtful questions show engagement and help you evaluate the fit too.',
    tips: 'Prepare genuine questions in advance; asking none is often seen as a red flag.',

  },
  // ---------------- Strengths and Weaknesses ----------------
  {
    category: 'Strengths and Weaknesses',
    question: 'What is your greatest weakness?',
    suggestedAnswer: 'Name a genuine, non-critical weakness and pair it with active improvement steps. For example: "I used to say yes to every request and overload myself; now I track my commitments explicitly and negotiate deadlines up front, which has made my delivery far more reliable." Avoid clichés like perfectionism that sound rehearsed.',
    tips: 'Be honest, choose something fixable, and emphasize the concrete steps you take to improve.',
  },
  {
    category: 'Strengths and Weaknesses',
    question: 'How do you handle criticism?',
    suggestedAnswer: 'Frame criticism as valuable data for growth rather than a personal attack. Describe a time you received tough feedback, asked clarifying questions to understand it fully, and changed your approach with visible results. This demonstrates coachability, which managers prize highly.',
    tips: 'Show that you listen without defensiveness and act on feedback quickly.',
  },
  {
    category: 'Strengths and Weaknesses',
    question: 'What skills do you need to develop?',
    suggestedAnswer: 'Mention a skill that is adjacent to the role rather than central to it, then show a learning plan. For example: "Public speaking at scale is my growth area, so I have been volunteering to present at internal demos each month." This shows honest self-assessment paired with deliberate effort.',
    tips: 'Pick a real but non-blocking gap and prove you are actively closing it.',
  },
  {
    category: 'Strengths and Weaknesses',
    question: 'Tell me about a time you made a mistake at work.',
    suggestedAnswer: 'Describe a specific mistake, how you took ownership immediately, and how you fixed it. Example: "I once pushed a config change without flagging it, causing a brief outage; I rolled it back within minutes, informed stakeholders transparently, and added a checklist so it never recurred." Interviewers care more about your recovery than the error itself.',
    tips: 'Own the mistake fast, explain the fix, and highlight the safeguard you introduced.',
  },
  {
    category: 'Strengths and Weaknesses',
    question: 'How do you work under minimal supervision?',
    suggestedAnswer: 'Emphasize self-management habits: setting clear milestones, communicating progress proactively, and knowing when to ask questions versus decide independently. Give an example of a project you owned end-to-end and delivered without daily check-ins. Reliability without supervision is exactly what remote and senior roles require.',
    tips: 'Prove autonomy with an example of owning a task from start to finish unprompted.',
  },
  {
    category: 'Strengths and Weaknesses',
    question: 'What would your previous employer say about you?',
    suggestedAnswer: 'Summarize your reputation honestly and positively: "My manager would say I am dependable under pressure and willing to own problems outside my job description, because I covered two roles during a hiring freeze without missing deadlines." Back the claim with a story they could actually verify in a reference call.',
    tips: 'Give a truthful, positive theme supported by a concrete anecdote or metric.',
  },
  {
    category: 'Strengths and Weaknesses',
    question: 'How do you stay organized?',
    suggestedAnswer: 'Describe a simple system rather than naming ten tools: a prioritized task list reviewed each morning, calendar blocks for deep work, and a weekly review to catch loose ends. Mention how the system has kept multi-project deadlines on track. Consistency matters more than any specific app.',
    tips: 'Explain one clear system and how it prevents dropped balls across projects.',
  },
  {
    category: 'Strengths and Weaknesses',
    question: 'What part of your job do you enjoy the most?',
    suggestedAnswer: 'Choose an aspect central to this role so your enjoyment predicts strong performance. Explain why you love it and give a short example, such as staying late happily to polish a feature because seeing users succeed energizes you. Genuine enthusiasm here is contagious in interviews.',
    tips: 'Pick something the daily work of this job actually involves, and show authentic energy.',
  },
  {
    category: 'Strengths and Weaknesses',
    question: 'Describe a situation where you had to learn something quickly.',
    suggestedAnswer: 'Walk through a time you picked up a new tool or domain under deadline pressure: how you identified quality resources, learned by building something small first, and asked targeted questions instead of guessing. Conclude with the outcome, like shipping the feature on time after learning the framework in a week.',
    tips: 'Show a repeatable fast-learning method, not just raw effort.',
  },
  // ---------------- Career Goals ----------------
  {
    category: 'Career Goals',
    question: 'What are your long-term career goals?',
    suggestedAnswer: 'Share goals that logically grow from this position, such as deepening expertise, leading projects, and eventually moving into senior or management tracks depending on where you add most value. Show you have thought deliberately: "My goal is to become a subject-matter expert and mentor others, and this role is a direct step toward that." Vague answers suggest you lack direction.',
    tips: 'Make goals specific, realistic, and clearly connected to a path this company supports.',
  },
  {
    category: 'Career Goals',
    question: 'Where do you see yourself in 10 years?',
    suggestedAnswer: 'Paint a broad but committed picture: having grown into leadership or deep expertise, having made meaningful contributions to products people rely on, and still learning. Avoid overly precise predictions or anything implying you expect to leave the industry or company early. Focus on the kind of professional you want to become.',
    tips: 'Keep it directional rather than literal; show sustained commitment and growth mindset.',
  },
  {
    category: 'Career Goals',
    question: 'Why did you choose this career path?',
    suggestedAnswer: 'Tell a brief authentic story about what drew you in, whether a project that fascinated you, a mentor, or a problem you could not stop solving. Connect that origin to your continued passion and skill development. Authenticity here differentiates you from candidates giving scripted answers.',
    tips: 'Be genuine and specific; tie the original spark to present-day motivation.',
  },
  {
    category: 'Career Goals',
    question: 'How does this position align with your goals?',
    suggestedAnswer: 'Draw explicit lines between the role responsibilities and your development path: "This position lets me deepen my cloud architecture skills while taking ownership of customer-facing systems, which is exactly the experience I need to grow into a lead engineer." The interviewer wants evidence you will stay engaged, not bolt at the first offer elsewhere.',
    tips: 'Map specific duties of the job to specific skills you want to build next.',
  },
  {
    category: 'Career Goals',
    question: 'What would you do if you didn\'t get this job?',
    suggestedAnswer: 'Respond calmly and constructively: "I would ask for feedback, keep strengthening the areas where I fell short, and pursue similar roles because I am confident about this direction." This shows resilience and genuine commitment to the field rather than desperation for any single opening.',
    tips: 'Show resilience and continued interest in the field, never bitterness or panic.',
  },
  {
    category: 'Career Goals',
    question: 'What are you looking for in your next role?',
    suggestedAnswer: 'List two or three things the current opening genuinely offers, such as greater ownership, a stronger engineering culture, or exposure to larger-scale systems. Frame them as growth enablers rather than complaints about your current job. Positive framing signals you move toward opportunity, not away from problems.',
    tips: 'Match your wish list to what this specific role provides, framed positively.',
  },
  {
    category: 'Career Goals',
    question: 'How do you plan to achieve your career goals?',
    suggestedAnswer: 'Show a concrete system: setting quarterly learning objectives, seeking feedback from mentors, volunteering for stretch projects, and measuring progress against milestones. Example: "To move toward architecture work, I completed a systems design course and led the redesign of our service layer." Planning ability itself is the skill being tested here.',
    tips: 'Present deliberate, measurable steps already underway, not vague intentions.',
  },
  {
    category: 'Career Goals',
    question: 'What is your ideal job?',
    suggestedAnswer: 'Describe the qualities of work where you perform best, such as interesting technical challenges, collaborative teammates, clear impact, and room to grow. Then note how closely this role matches that description. Describing an exotic fantasy job signals misfit; describing this job done ideally signals fit.',
    tips: 'Describe an environment nearly identical to the one you are interviewing for.',
  },
  {
    category: 'Career Goals',
    question: 'Are you willing to relocate?',
    suggestedAnswer: 'Answer honestly and specifically: if yes, state it plainly along with any timeline constraints; if flexibility is partial, explain what works, such as relocation after onboarding or hybrid arrangements. Ambiguity here causes problems later, so clarity is kindness for both sides.',
    tips: 'Be direct about your true flexibility now rather than creating future friction.',
  },
  // ---------------- Teamwork ----------------
  {
    category: 'Teamwork',
    question: 'Describe a time you worked successfully as part of a team.',
    suggestedAnswer: 'Use STAR to describe a collaborative win: "Our team had six weeks to launch a feature; I handled the backend integration, coordinated daily with the frontend developer, and we shipped on time with zero critical bugs." Highlight how you communicated, shared workload, and put team success above personal credit.',
    tips: 'Emphasize collaboration behaviors, not just the outcome; say "we" but own your part.',
  },
  {
    category: 'Teamwork',
    question: 'How do you handle disagreements with team members?',
    suggestedAnswer: 'Explain that you focus disagreement on ideas, not people: listen fully first, restate their position to confirm understanding, then present your view with evidence. If no consensus emerges, suggest testing both approaches with data or deferring to agreed decision criteria. One example of a productive disagreement resolved this way seals the answer.',
    tips: 'Attack the problem, not the person, and show willingness to be proven wrong.',
  },
  {
    category: 'Teamwork',
    question: 'Tell me about a time you had to collaborate with a difficult person.',
    suggestedAnswer: 'Avoid badmouthing anyone; instead describe understanding their perspective and adapting. For example: "A stakeholder seemed dismissive in meetings, so I scheduled a one-on-one, learned he preferred detailed written context before discussions, and adjusted our communication, after which collaboration improved dramatically." Empathy plus practical adaptation is the winning formula.',
    tips: 'Stay respectful, show empathy for their perspective, and focus on how you adapted.',
  },
  {
    category: 'Teamwork',
    question: 'What role do you usually take in a team?',
    suggestedAnswer: 'Identify your natural default, such as organizer, problem-solver, or bridge-builder, then show flexibility: "I naturally gravitate toward coordinating and unblocking others, but I am equally comfortable executing independently when the plan is set." Teams need people who fill gaps, so versatility is worth emphasizing.',
    tips: 'Name your default role honestly while showing you flex when the team needs it.',
  },
  {
    category: 'Teamwork',
    question: 'How do you ensure effective communication in a team?',
    suggestedAnswer: 'Describe concrete practices: regular short syncs, written summaries after decisions so nothing lives only in someone\'s head, and proactively flagging blockers early. Example: "I started posting end-of-day updates on our shared channel, which cut duplicate questions significantly." Systems beat intentions when it comes to communication.',
    tips: 'Give specific rituals or tools you personally use to keep everyone aligned.',
  },
  {
    category: 'Teamwork',
    question: 'Give an example of when you helped a team member.',
    suggestedAnswer: 'Recall a time you noticed someone struggling and offered help without being asked, such as pairing with a junior colleague to debug their code or covering documentation while a teammate handled a family emergency. Explain the outcome for the team, not personal glory. Generosity builds the trust teams run on.',
    tips: 'Show initiative in helping and frame the benefit as team-wide, not self-serving.',
  },
  {
    category: 'Teamwork',
    question: 'Describe a team project you are proud of.',
    suggestedAnswer: 'Pick a project with measurable results and tell it through the team lens: the challenge, how responsibilities were divided, how the group overcame obstacles together, and the final quantified outcome. Make clear what your contribution was while crediting teammates genuinely. Pride in shared success reads as maturity.',
    tips: 'Balance personal contribution with genuine credit to teammates and quantify results.',
  },
  {
    category: 'Teamwork',
    question: 'How do you handle a team member not pulling their weight?',
    suggestedAnswer: 'Start privately and with curiosity: "I would talk to them one-on-one first, since slippage often has hidden causes like unclear expectations or personal issues. If that fails, I would involve the manager only after giving them a fair chance to correct course." Escalating thoughtfully rather than complaining publicly protects both the team and the relationship.',
    tips: 'Address it directly and privately first; escalate only as a considered last resort.',
  },
  {
    category: 'Teamwork',
    question: 'What makes a great team?',
    suggestedAnswer: 'Highlight psychological safety, clear shared goals, open communication, and mutual accountability: "The best teams I have been on were ones where people admitted mistakes early, debated ideas openly, and trusted each other to deliver." Adding a quick story of such a team makes the philosophy concrete.',
    tips: 'Define culture traits like trust and safety, ideally illustrated with a lived example.',
  },
  // ---------------- Leadership ----------------
  {
    category: 'Leadership',
    question: 'Tell me about your leadership style.',
    suggestedAnswer: 'Name your approach, such as servant or situational leadership, and make it tangible: "I set clear goals and context, then trust people to choose their methods; I check in frequently enough to remove blockers but not to micromanage." Include a brief example of adjusting your style for a junior versus senior teammate.',
    tips: 'Label your style, prove it with an example, and show you adapt to individuals.',
  },
  {
    category: 'Leadership',
    question: 'Describe a time you led a project.',
    suggestedAnswer: 'Structure a full STAR story: "When our migration project stalled, I volunteered to lead it; I rebuilt the plan into weekly milestones, ran short daily standups, reassigned blocked tasks, and we finished two weeks ahead of schedule with zero rollback incidents." Emphasize outcomes achieved through others, not solo heroics.',
    tips: 'Show planning, delegation, and communication, with the result quantified.',
  },
  {
    category: 'Leadership',
    question: 'How do you motivate others?',
    suggestedAnswer: 'Explain that motivation starts with understanding individuals: some want public recognition, others want autonomy or growth opportunities. Give an example like matching a bored teammate to a challenging task that reignited their performance. Tailored motivation outperforms pep talks every time.',
    tips: 'Show you personalize motivation to each person instead of using one-size-fits-all tactics.',
  },
  {
    category: 'Leadership',
    question: 'Have you ever had to make an unpopular decision?',
    suggestedAnswer: 'Describe a decision like cutting a beloved feature to hit a deadline or restructuring workflows: how you explained the reasoning transparently, listened to objections, and stood firm while softening the impact where possible. Unpopular but correct decisions, handled with respect, define real leadership.',
    tips: 'Justify the decision with reasoning, acknowledge the cost, and show you owned it.',
  },
  {
    category: 'Leadership',
    question: 'How do you delegate tasks?',
    suggestedAnswer: 'Explain your criteria: matching tasks to growth goals and current capacity, delegating the objective plus context rather than micromanaging steps, and agreeing on checkpoints. Example: "I handed our reporting automation to a junior engineer with clear success criteria, and her solution was better than mine." Delegation develops people while scaling output.',
    tips: 'Delegate outcomes with context, match to growth goals, and check in without hovering.',
  },
  {
    category: 'Leadership',
    question: 'Tell me about a time you mentored someone.',
    suggestedAnswer: 'Describe a mentee, your approach, and their growth: "I onboarded a new graduate by pairing on real tickets and gradually increasing scope; within six months she was independently owning features." Mentoring stories demonstrate patience, communication, and investment in others beyond your own deliverables.',
    tips: 'Show measurable growth in the mentee and patience in your teaching approach.',
  },
  {
    category: 'Leadership',
    question: 'How do you handle conflict in your team?',
    suggestedAnswer: 'Act early before resentment hardens: hear each side separately, find the underlying interest beneath each stated position, and facilitate a solution both can accept. Example: two engineers clashing over architecture were guided to prototype both options and let benchmarks decide. Neutral facilitation preserves relationships and raises standards.',
    tips: 'Intervene early, stay neutral, and steer the conflict toward shared criteria.',
  },
  {
    category: 'Leadership',
    question: 'What is the most important quality of a leader?',
    suggestedAnswer: 'Pick one quality and defend it well, such as integrity, because teams follow people they trust especially when decisions are costly. Briefly acknowledge other qualities matter, but explain why yours is foundational. A decisive, well-argued choice beats listing five adjectives.',
    tips: 'Commit to one quality, justify it convincingly, and optionally illustrate with a story.',
  },
  {
    category: 'Leadership',
    question: 'Describe a situation where you had to lead without formal authority.',
    suggestedAnswer: 'Show influence through credibility and persuasion: "When cross-team priorities conflicted, nobody had authority over the group, so I drafted a shared proposal, gathered input from each team, and built consensus around a compromise everyone endorsed." Leading peers requires earning trust rather than pulling rank.',
    tips: 'Emphasize influence, credibility, and consensus-building rather than authority.',
  },
  // ---------------- Conflict Management ----------------
  {
    category: 'Conflict Management',
    question: 'How do you handle conflict with a coworker?',
    suggestedAnswer: 'Describe addressing issues directly but privately before resentment grows: seek first to understand their viewpoint, express yours without accusation using facts rather than judgments, and agree on a concrete change going forward. An example where an ongoing friction turned into a strong working relationship proves the method works.',
    tips: 'Go private early, listen first, and convert complaints into agreements about behavior.',
  },
  {
    category: 'Conflict Management',
    question: 'Describe a time you resolved a workplace dispute.',
    suggestedAnswer: 'Narrate a specific mediation: two teammates disputed credit for a client win, so I met with each separately, uncovered that roles had genuinely overlapped, and proposed joint presentation of the results, which both accepted. Structure the story around listening, finding common ground, and proposing an actionable resolution.',
    tips: 'Show neutrality, active listening, and a creative solution both parties accepted.',
  },
  {
    category: 'Conflict Management',
    question: 'What do you do when you disagree with a manager\'s decision?',
    suggestedAnswer: 'Voice disagreement respectfully and privately, backed by data and framed around shared goals: "I once disagreed with a release date, presented risk analysis to my manager, and she adjusted scope based on my input; when she ultimately decided otherwise, I committed fully." Disagree, then commit is the healthy pattern interviewers want to hear.',
    tips: 'Raise concerns respectfully with evidence, then fully support the final decision.',
  },
  {
    category: 'Conflict Management',
    question: 'How do you handle stress and conflict simultaneously?',
    suggestedAnswer: 'Acknowledge that stacking pressure is real, then explain your coping structure: separating urgent from important, taking short pauses before reacting emotionally, and handling conflicts in calm scheduled conversations rather than heated moments. One brief example of navigating a tense release week shows composure in practice.',
    tips: 'Show emotional regulation techniques and a real example of staying effective under both.',
  },
  {
    category: 'Conflict Management',
    question: 'Tell me about a time you had to mediate a conflict.',
    suggestedAnswer: 'Walk through mediating between colleagues or departments: meeting parties individually to understand interests, bringing them together on neutral ground, focusing discussion on facts and shared objectives, and locking in an agreement with follow-up. The result should include restored working relationships, not just a stopped argument.',
    tips: 'Demonstrate impartiality and a structured path from positions to shared interests.',
  },
  {
    category: 'Conflict Management',
    question: 'What is your approach to resolving disagreements?',
    suggestedAnswer: 'Lay out your framework: clarify what you actually disagree about, identify what evidence would settle it, seek common goals, and agree on a decision mechanism when consensus stalls, whether data, a designated decider, or a trial period. Treating disagreements as problems to solve keeps them productive.',
    tips: 'Present a repeatable framework focused on evidence and shared goals.',
  },
  {
    category: 'Conflict Management',
    question: 'How do you handle constructive feedback?',
    suggestedAnswer: 'Treat constructive feedback as a gift that accelerates growth: listen completely without interrupting, ask examples to make it actionable, thank the giver, and follow up later showing what changed. Sharing how a piece of feedback measurably improved your work makes the answer memorable.',
    tips: 'Receive it gratefully, act visibly on it, and close the loop with the giver.',
  },
  {
    category: 'Conflict Management',
    question: 'Describe a situation where you had to give negative feedback.',
    suggestedAnswer: 'Show you deliver hard messages with care: choose a private setting, anchor on specific behaviors and their impact rather than personality, invite their perspective, and agree on improvement steps together. Example: telling a peer his reviews were blocking releases led to a checklist that helped him and the whole team.',
    tips: 'Be specific, behavior-focused, and private; end with a supportive plan.',
  },
  {
    category: 'Conflict Management',
    question: 'How do you maintain professionalism during conflicts?',
    suggestedAnswer: 'Explain your guardrails: never responding in anger or over chat in the heat of the moment, sticking to facts, keeping discussions confidential, and remembering the shared goal outranks winning the argument. Colleagues may forget who won disputes, but they remember who stayed composed.',
    tips: 'Control tone and timing, stick to facts, and keep the shared goal in view.',
  },
  // ---------------- Communication ----------------
  {
    category: 'Communication',
    question: 'How do you communicate complex ideas to non-technical people?',
    suggestedAnswer: 'Describe anchoring to analogies and outcomes: strip jargon, compare concepts to everyday experiences, and lead with the business impact before any mechanics. Example: explaining API rate limits as a ticket queue at a bank counter instantly got stakeholder buy-in. Checking for understanding afterward completes the loop.',
    tips: 'Lead with analogies and business impact; drop jargon entirely until asked.',
  },
  {
    category: 'Communication',
    question: 'Describe a time your communication skills made a difference.',
    suggestedAnswer: 'Pick a case where communication changed the outcome: "Misaligned assumptions between sales and engineering were causing missed commitments, so I created a shared intake template and weekly alignment call, cutting slipped deadlines dramatically." The difference should be measurable wherever possible.',
    tips: 'Quantify the before-and-after impact your communication produced.',
  },
  {
    category: 'Communication',
    question: 'How do you ensure clear communication in remote work?',
    suggestedAnswer: 'Cover both async discipline and human connection: writing self-contained messages with explicit asks and deadlines, documenting decisions where everyone can find them, defaulting to overcommunicating status, and keeping cameras on for nuanced conversations. Remote clarity comes from writing well more than talking often.',
    tips: 'Stress crisp written updates, documented decisions, and proactive status sharing.',
  },
  {
    category: 'Communication',
    question: 'Tell me about a time you had to present to a large audience.',
    suggestedAnswer: 'Describe the preparation arc: knowing the audience, structuring a narrative with one core message, rehearsing aloud, preparing for likely questions, and managing nerves with breathing techniques. Close with the outcome, such as securing budget approval or positive adoption of your proposal after the talk.',
    tips: 'Show thorough preparation and one clear message, then share the concrete outcome.',
  },
  {
    category: 'Communication',
    question: 'How do you handle miscommunication?',
    suggestedAnswer: 'Move quickly to repair: acknowledge the confusion without blame, restate what each side understood to locate the exact disconnect, agree on corrected understanding in writing, and adjust the process that allowed it. One recovered misunderstanding turned into a better workflow shows maturity.',
    tips: 'Fix it fast, blame-free, and update the process so it cannot recur.',
  },
  {
    category: 'Communication',
    question: 'What is your preferred communication style?',
    suggestedAnswer: 'State your style honestly, such as direct but diplomatic and favoring written summaries for decisions, then show adaptability: "I adjust depth and channel to my audience, from executive briefs to detailed technical reviews." Self-awareness plus flexibility is the combination interviewers seek.',
    tips: 'Name your style, then prove you flex it based on audience and context.',
  },
  {
    category: 'Communication',
    question: 'How do you write effective emails?',
    suggestedAnswer: 'Follow a few rules religiously: a subject line stating the ask, the key point in the first sentence, context in scannable bullets, one explicit action item with a deadline, and matching sensitivity to the channel by moving heated topics offline. Well-written email saves entire teams hours weekly.',
    tips: 'Front-load the ask, keep it scannable, and end with one clear action item.',
  },
  {
    category: 'Communication',
    question: 'Describe a time you had to persuade someone.',
    suggestedAnswer: 'Tell how you persuaded by starting from their interests: convincing a skeptical manager to fund refactoring by framing it in his metrics, showing how the tech debt was slowing the features he cared about. Persuasion succeeds when the other person sees their goal advanced, not just yours.',
    tips: 'Argue from the listener\'s priorities and evidence, not your own preferences.',
  },
  // ---------------- Behavioral ----------------
  {
    category: 'Behavioral',
    question: 'Tell me about a time you went above and beyond.',
    suggestedAnswer: 'Describe exceeding expectations voluntarily: "After our product launch, I noticed users struggling with a step our analytics did not capture, so I spent the weekend building an in-app guide, and support tickets on that step dropped to near zero." The initiative must be genuine, not rewarded overtime alone.',
    tips: 'Show voluntary extra effort driven by ownership, ending with measurable impact.',
  },
  {
    category: 'Behavioral',
    question: 'Describe a situation where you had to adapt to change.',
    suggestedAnswer: 'Recount a significant pivot such as a mid-project technology swap, reorganization, or strategy shift: your initial reaction, how you reframed it positively, learned what was needed quickly, and helped teammates through the transition. Adaptability stories reveal attitude during uncertainty, which employers weigh heavily.',
    tips: 'Show a positive mindset, quick learning, and helping others through the change.',
  },
  {
    category: 'Behavioral',
    question: 'Tell me about a time you showed initiative.',
    suggestedAnswer: 'Pick an unsolicited improvement: "Nobody owned our flaky test suite, so I audited it, fixed the worst offenders, and reduced CI failures enough to speed up everyone\'s merges." Initiative means acting on problems outside your assigned lane before anyone asks.',
    tips: 'Choose something nobody asked you to do and quantify the benefit delivered.',
  },
  {
    category: 'Behavioral',
    question: 'How do you prioritize your tasks?',
    suggestedAnswer: 'Explain your method concretely: ranking by impact and urgency, distinguishing urgent from merely loud, batching low-value work, and renegotiating deadlines early when capacity is exceeded. Mention checking priorities against team goals weekly so individual effort stays aligned.',
    tips: 'Name a real framework you use and how you handle items that cannot all fit.',
  },
  {
    category: 'Behavioral',
    question: 'Describe a time you had to work with tight deadlines.',
    suggestedAnswer: 'Tell a STAR story with real constraints: "We had ten days to deliver a compliance feature that normally takes a month; I scoped ruthlessly with the PM, automated the test suite overnight runs, and we passed the audit on time." Tight deadlines showcase scoping and focus, not just stamina.',
    tips: 'Emphasize smart scoping and focus rather than heroic all-nighters.',
  },
  {
    category: 'Behavioral',
    question: 'Tell me about a time you solved a complex problem.',
    suggestedAnswer: 'Choose a genuinely hard problem and walk through decomposition: how you broke it down, gathered data, ruled out hypotheses systematically, consulted others where needed, and validated the fix. Complexity is best demonstrated by methodical thinking rather than lucky guesses.',
    tips: 'Highlight structured decomposition and verification, not just the final fix.',
  },
  {
    category: 'Behavioral',
    question: 'How do you handle multiple competing priorities?',
    suggestedAnswer: 'Describe surfacing conflicts rather than silently choosing: making trade-offs visible to stakeholders, negotiating sequencing based on business impact, and protecting focus time to execute. An example of balancing three simultaneous requests by getting owners to agree on order shows stakeholder management skill.',
    tips: 'Make trade-offs explicit with stakeholders instead of absorbing them silently.',
  },
  {
    category: 'Behavioral',
    question: 'Describe a time you received unexpected feedback.',
    suggestedAnswer: 'Recall feedback that genuinely surprised you, perhaps that your concise replies read as abrupt to teammates: describe initial surprise, reflecting honestly, asking for specifics, and adjusting style while keeping your strengths. Growth in response to blind spots is exactly what this question probes.',
    tips: 'Show genuine openness to a blind spot and visible behavioral change afterward.',
  },
  // ---------------- Situational ----------------
  {
    category: 'Situational',
    question: 'What would you do if you made a mistake at work?',
    suggestedAnswer: 'Outline the responsible sequence: assess the immediate damage, contain or roll back quickly, inform affected people promptly with an honest account, fix the root cause, and document the lesson. Interviewers want speed, transparency, and prevention, not promises of perfection.',
    tips: 'Contain fast, communicate transparently, and prevent recurrence with a process change.',
  },
  {
    category: 'Situational',
    question: 'How would you handle a situation where you disagree with company policy?',
    suggestedAnswer: 'Show constructive channels: first understand the policy rationale by asking, then raise evidence-based concerns respectfully with your manager or the policy owner, propose alternatives, and if the policy stands, comply professionally while continuing to advocate through proper channels. Respectful dissent beats silent resentment or open defiance.',
    tips: 'Seek to understand first, dissent respectfully through proper channels, then comply.',
  },
  {
    category: 'Situational',
    question: 'What would you do if a customer was unhappy with your service?',
    suggestedAnswer: 'Describe de-escalation: listen fully without interrupting, apologize sincerely for the experience regardless of fault, take ownership of the fix or escalate to someone empowered, and follow up to confirm satisfaction. Turning an angry customer into a loyal one through responsive service is a skill worth demonstrating.',
    tips: 'Listen, empathize, own the resolution, and close the loop with a follow-up.',
  },
  {
    category: 'Situational',
    question: 'How would you handle being assigned a task you have never done before?',
    suggestedAnswer: 'Express enthusiasm first, then a plan: break the task into learnable parts, study comparable examples and documentation, timebox research before asking targeted questions, and give honest progress updates including uncertainty. Willingness plus a learning method beats pretending expertise you lack.',
    tips: 'Show eagerness, a structured learning approach, and honesty about unknowns.',
  },
  {
    category: 'Situational',
    question: 'What would you do if you saw a colleague violating company rules?',
    suggestedAnswer: 'Calibrate severity first: for minor issues, a friendly direct conversation often resolves things; for serious violations like harassment or fraud, report promptly through official channels regardless of personal discomfort. Integrity means escalating what matters while giving people reasonable grace on trivial slips.',
    tips: 'Judge severity honestly: address minor issues directly, report serious ones properly.',
  },
  {
    category: 'Situational',
    question: 'How would you handle receiving a poor performance review?',
    suggestedAnswer: 'Describe processing it maturely: manage the initial emotion privately, seek specific examples to understand each concern, draft a concrete improvement plan with measurable checkpoints, and schedule regular follow-ups with your manager. A poor review handled well often becomes a turning point story employers respect.',
    tips: 'React without defensiveness, get specifics, and commit to a measurable improvement plan.',
  },
  {
    category: 'Situational',
    question: 'What would you do if your team was falling behind schedule?',
    suggestedAnswer: 'Lay out the triage: diagnose why the slip is happening, re-scope with stakeholders by cutting lowest-value items, redistribute work according to actual capacity, and increase communication cadence until back on track. Early escalation with options beats hiding slippage and hoping to recover.',
    tips: 'Diagnose the cause, re-scope early with stakeholders, and tighten communication.',
  },
  {
    category: 'Situational',
    question: 'How would you handle competing priorities from different managers?',
    suggestedAnswer: 'Refuse to absorb the conflict silently: lay out all requested work with realistic estimates, ask the managers to align among themselves on ordering, and propose a sequence based on business impact if they defer to you. Making trade-offs visible protects quality and teaches organizations to prioritize.',
    tips: 'Surface the conflict transparently and drive managers to a single agreed priority.',
  },
];

async function main() {
  try {
    console.log(`Connecting to database...`);
    console.log(`Seeding ${questions.length} HR interview questions...`);

    let inserted = 0;
    for (const q of questions) {
      await sql`INSERT INTO "hrQuestions" (category, question, "suggestedAnswer", tips) VALUES (${q.category}, ${q.question}, ${q.suggestedAnswer}, ${q.tips})`;
      inserted++;
      console.log(`[${inserted}/${questions.length}] (${q.category}) ${q.question}`);
    }

    console.log(`\nSeed complete! Inserted ${inserted} HR interview questions.`);
    const counts = {};
    for (const q of questions) counts[q.category] = (counts[q.category] || 0) + 1;
    Object.entries(counts).forEach(([cat, n]) => console.log(`  - ${cat}: ${n}`));
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

main();
