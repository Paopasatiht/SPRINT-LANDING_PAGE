function CaseStudies({ onOpen }) {
  const cases = [
    {
      id: 'krungsri',
      kicker: 'BANKING · 2025',
      client: 'Krungsri Bank',
      headline: 'A 9-week sprint replaced a 14-month roadmap.',
      tags: ['RAG', 'Compliance', 'Internal tools'],
      metric: '−68%',
      metricLabel: 'analyst report time',
      cover: '#1B3C5C',
      lead: 'We embedded with the risk analytics team and shipped a compliance copilot that cut credit-memo drafting from 6 hours to under 2.',
      details: {
        problem: 'Analysts spent 60% of their week assembling boilerplate credit memos from scattered PDFs, internal wikis, and Bloomberg exports — work that delayed every credit decision by 3–5 days.',
        approach: [
          'Week 1: Shadowed 4 analysts across 3 desks. Mapped the 14-step memo flow.',
          'Week 2–4: Built a RAG pipeline over 12,000 internal docs with citation enforcement.',
          'Week 5–7: Co-developed evals with compliance. Shipped to a 12-analyst pilot.',
          'Week 8–9: Rolled to 80 analysts. Trained two in-house engineers to own it.',
        ],
        outcome: [
          ['68%', 'reduction in memo drafting time'],
          ['3.2x', 'more memos shipped per analyst per week'],
          ['100%', 'citation coverage required by compliance'],
          ['9 wks', 'idea to production deployment'],
        ],
        quote: 'They didn\'t pitch us a tool. They sat with our analysts for a week, then built the right one. We\'ve never bought software that landed this fast.',
        quoteBy: 'Director of Risk Analytics, Krungsri',
      },
    },
    {
      id: 'scb',
      kicker: 'BANKING · 2025',
      client: 'SCB X',
      headline: 'Trained 400 PMs to ship with AI in one quarter.',
      tags: ['Cohort training', 'Bilingual', 'Workshops'],
      metric: '412',
      metricLabel: 'graduates · 3 cohorts',
      cover: '#0F1419',
      lead: 'A bilingual cohort program for SCB X product managers — running one experiment per week, shipped to a real internal user.',
      details: {
        problem: 'SCB X had hundreds of PMs eager to use AI but no shared playbook. Internal "AI literacy" workshops produced enthusiasm but no shipped work.',
        approach: [
          'Designed an 8-week curriculum: 1 lesson, 1 prompt pattern, 1 shipped artifact per week.',
          'Bilingual delivery — English keywords, Thai discussion, async lessons in both.',
          'Each cohort capped at 40, with senior practitioner office hours.',
          'Final week: every PM presents a shipped tool to a real internal customer.',
        ],
        outcome: [
          ['412', 'PMs graduated across 3 cohorts'],
          ['89%', 'shipped a working internal tool by week 8'],
          ['+34%', 'self-reported weekly output post-program'],
          ['9.4', 'avg. NPS from cohort 03'],
        ],
        quote: 'My team stopped asking what AI could do and started showing me what they\'d already shipped. That\'s the whole game.',
        quoteBy: 'Chief Product Officer, SCB X',
      },
    },
    {
      id: 'ptt',
      kicker: 'ENERGY · 2026',
      client: 'PTT Group',
      headline: 'Field engineer copilot in 21 days.',
      tags: ['Agents', 'Voice', 'Mobile'],
      metric: '21d',
      metricLabel: 'idea → field pilot',
      cover: '#7A3D10',
      lead: 'A voice-first AI copilot for refinery field engineers — built, tested, and rolled to two sites in three weeks.',
      details: {
        problem: 'Field engineers at PTT refineries handled 200+ procedures from 40-year-old manuals. Looking up the right SOP mid-task was slow, error-prone, and dangerous.',
        approach: [
          'Day 1–5: Digitized 240 SOPs, built a voice-first agent grounded in them.',
          'Day 6–14: Hardened safety guardrails with the HSE team. Built offline mode.',
          'Day 15–21: Piloted with 18 engineers across 2 sites. Shipped v1 to production.',
        ],
        outcome: [
          ['21d', 'idea to operational pilot'],
          ['−42%', 'time spent on procedure lookup'],
          ['240', 'SOPs digitized & queryable'],
          ['2', 'sites running in production'],
        ],
        quote: 'We\'d been told this would take a year. SprintAI gave us a working pilot in three weeks. Our engineers don\'t want it taken away.',
        quoteBy: 'Head of Digital, PTT Refining',
      },
    },
    {
      id: 'true',
      kicker: 'TELECOM · 2024',
      client: 'True Corporation',
      headline: 'Customer-care agent: 1 sprint, 4M conversations / mo.',
      tags: ['Customer care', 'Multilingual', 'Scale'],
      metric: '4M',
      metricLabel: 'monthly conversations',
      cover: '#122A44',
      lead: 'An AI agent layer that handles 4 million customer conversations per month across Thai, English, and dialect.',
      details: {
        problem: 'True\'s contact center fielded 5M+ contacts/month with 18-min average handle time. A previous chatbot vendor had failed twice.',
        approach: [
          'Defined a "deflect, don\'t replace" mandate with the care team.',
          'Built a Thai-first agent with strict escalation rules and full conversation logs.',
          'Shipped with eval-driven rollout: 1% → 10% → 100% over 6 weeks.',
        ],
        outcome: [
          ['4M', 'conversations/month handled'],
          ['62%', 'tier-1 deflection rate'],
          ['−7 min', 'avg. handle time on escalations'],
          ['THB 180M', 'estimated annual savings'],
        ],
        quote: 'Two vendors failed. SprintAI shipped in one sprint. The difference was they actually used our data, not their demos.',
        quoteBy: 'VP Customer Experience, True',
      },
    },
  ];

  return (
    <section id="work" style={{ background: '#FAFAF7', padding: '120px 0 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: 24, marginBottom: 56,
        }}>
          <div>
            <span style={kicker}>SELECTED WORK</span>
            <h2 style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 700,
              fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 0.95,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: '#1A1B1D', margin: 0,
            }}>
              Sprints we<br/>actually <span style={{ color: '#F47920', fontStyle: 'italic', fontFamily: 'Playfair Display, serif', textTransform: 'lowercase', fontWeight: 700 }}>shipped.</span>
            </h2>
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#88898B',
            letterSpacing: '0.04em',
          }}>
            // 4 of 47 · <span style={{ color: '#F47920' }}>full archive →</span>
          </div>
        </div>

        <div className="cs-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24,
        }}>
          {cases.map((c, i) => (
            <CaseCard key={c.id} c={c} large={i === 0} onOpen={() => onOpen(c)} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function CaseCard({ c, large, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#FAFAF7', border: '1px solid #E8E8E6', borderTop: '4px solid #F47920',
        cursor: 'pointer', overflow: 'hidden',
        gridColumn: large ? 'span 2' : 'auto',
        display: 'grid', gridTemplateColumns: large ? '1.2fr 1fr' : '1fr',
        transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'transform 200ms cubic-bezier(0.2,0.8,0.2,1)',
      }}>
      {/* Image side */}
      <div style={{
        background: c.cover, position: 'relative', overflow: 'hidden',
        minHeight: large ? 360 : 220, display: 'flex', alignItems: 'flex-end',
        padding: large ? 32 : 24,
      }}>
        {/* Decorative pattern */}
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}
          preserveAspectRatio="none" viewBox="0 0 400 300">
          <g stroke="#F47920" strokeWidth="1" fill="none">
            <path d="M-20 60 L180 60 L200 80 L420 80" />
            <path d="M-20 140 L120 140 L140 160 L420 160" />
            <path d="M-20 230 L240 230 L260 250 L420 250" />
            <circle cx="200" cy="80" r="2.5" fill="#F47920" />
            <circle cx="140" cy="160" r="2.5" fill="#F47920" />
          </g>
        </svg>
        {/* Big metric */}
        <div style={{ position: 'relative', color: '#FAFAF7' }}>
          <div style={{
            fontFamily: 'Oswald, sans-serif', fontWeight: 700,
            fontSize: large ? 'clamp(80px, 9vw, 140px)' : 'clamp(64px, 7vw, 88px)',
            lineHeight: 0.9, letterSpacing: '-0.03em', color: '#F47920',
          }}>{c.metric}</div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FAFAF7',
            marginTop: 4, opacity: 0.8,
          }}>{c.metricLabel}</div>
        </div>
        {/* Streak */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
          background: 'linear-gradient(115deg, transparent 60%, rgba(244,121,32,0.15) 80%, transparent 95%)',
          transform: hover ? 'translateX(0)' : 'translateX(-10%)',
          transition: 'transform 400ms cubic-bezier(0.2,0.8,0.2,1)',
        }} />
      </div>

      {/* Text side */}
      <div style={{ padding: large ? 36 : 28, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.08em',
          color: '#88898B', marginBottom: 16,
        }}>
          <span>{c.kicker}</span>
          <span style={{
            fontFamily: 'Oswald, sans-serif', fontSize: 14, fontWeight: 600,
            color: '#1B3C5C', textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>{c.client}</span>
        </div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif', fontWeight: 700,
          fontSize: large ? 36 : 26, lineHeight: 1.1, color: '#1A1B1D',
          margin: '0 0 16px', letterSpacing: '-0.01em',
        }}>{c.headline}</h3>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: large ? 17 : 15, lineHeight: 1.55,
          color: '#3D3E40', margin: '0 0 24px',
        }}>{c.lead}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {c.tags.map((t, i) => (
            <span key={i} style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
              color: '#3D3E40', textTransform: 'uppercase', letterSpacing: '0.08em',
              border: '1px solid #88898B', padding: '4px 10px', borderRadius: 999,
            }}>{t}</span>
          ))}
        </div>

        <div style={{
          marginTop: 'auto', paddingTop: 18, borderTop: '1px solid #E8E8E6',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
            color: hover ? '#F47920' : '#1B3C5C',
            borderBottom: '2px solid #F47920', paddingBottom: 2,
            transition: 'color 120ms cubic-bezier(0.2,0.8,0.2,1)',
          }}>Read the case study</span>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#F47920',
            transform: hover ? 'translate(2px, -2px)' : 'none',
            transition: 'transform 200ms cubic-bezier(0.2,0.8,0.2,1)',
          }}>↗</span>
        </div>
      </div>
    </article>
  );
}

window.CaseStudies = CaseStudies;
