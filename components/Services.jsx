function Services() {
  const [active, setActive] = React.useState(0);
  const services = [
    {
      tag: '01 / STRATEGY',
      title: 'AI Strategy Sprint',
      duration: '2 weeks',
      price: 'from THB 480,000',
      lead: 'A two-week diagnostic that ends with a working prototype, not a 60-page deck.',
      bullets: [
        'Audit current workflows for AI leverage points',
        'Pick one bet. Prototype it. Validate with users.',
        'Walk away with a roadmap and a working v0',
      ],
    },
    {
      tag: '02 / BUILD',
      title: 'Engineered AI Systems',
      duration: '6–12 weeks',
      price: 'from THB 1.8M',
      lead: 'Internal tools, agents, and AI-native products built by senior engineers who ship.',
      bullets: [
        'RAG pipelines, evals, and observability from day 1',
        'Production-grade infra: not a notebook in disguise',
        'Knowledge transfer baked into every sprint',
      ],
    },
    {
      tag: '03 / TRAIN',
      title: 'Cohort Training',
      duration: '8 weeks',
      price: 'from THB 14,900 / seat',
      lead: 'In-house cohorts that turn analysts and PMs into shippers in eight weeks.',
      bullets: [
        'Live workshops + async lessons + cohort Slack',
        'One experiment per week, shipped to your team',
        'Bilingual delivery (Thai + English)',
      ],
    },
    {
      tag: '04 / EMBED',
      title: 'Embedded AI Lead',
      duration: '3–6 months',
      price: 'retainer',
      lead: 'A senior practitioner inside your team — running standups, shipping code, hiring talent.',
      bullets: [
        'Acts as Head of AI without the full-time hire risk',
        'Builds and recruits your in-house AI team',
        'Exits cleanly with documentation and successors',
      ],
    },
  ];

  const s = services[active];

  return (
    <section id="services" style={{
      background: '#0F1419', color: '#FAFAF7', padding: '120px 0',
      borderTop: '4px solid #F47920', position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 80% 30%, rgba(244,121,32,0.12), transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
          <div>
            <span style={kickerDark}>WHAT WE DO</span>
            <h2 style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 700,
              fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 0.95,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: '#FAFAF7', margin: 0,
            }}>
              Four sprints.<br/>
              <span style={{ color: '#F47920' }}>One operating mode.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
            fontSize: 20, lineHeight: 1.5, color: '#C8CBCE',
            margin: 0, maxWidth: 380,
          }}>
            Pick the engagement that fits where you are. We move at one speed.
          </p>
        </div>

        <div className="svc-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 0,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Tabs */}
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            {services.map((svc, i) => (
              <button key={i}
                onClick={() => setActive(i)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: active === i ? 'rgba(244,121,32,0.08)' : 'transparent',
                  border: 0, borderLeft: active === i ? '4px solid #F47920' : '4px solid transparent',
                  borderBottom: i < services.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  padding: '28px 28px', cursor: 'pointer', color: '#FAFAF7',
                  transition: 'all 200ms cubic-bezier(0.2,0.8,0.2,1)',
                }}
                onMouseEnter={(e) => { if (active !== i) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={(e) => { if (active !== i) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                  color: active === i ? '#F47920' : '#88898B',
                  letterSpacing: '0.08em', marginBottom: 8,
                }}>{svc.tag}</div>
                <div style={{
                  fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: 22,
                  color: active === i ? '#FAFAF7' : '#C8CBCE', lineHeight: 1.2,
                }}>{svc.title}</div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div key={active} style={{
            padding: '48px 48px', position: 'relative',
            animation: 'svcSlide 400ms cubic-bezier(0.2,0.8,0.2,1)',
          }}>
            <div style={{
              display: 'flex', gap: 24, marginBottom: 24,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: '#88898B', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <span>Duration: <span style={{ color: '#F47920' }}>{s.duration}</span></span>
              <span style={{ color: '#5B7A98' }}>·</span>
              <span>{s.price}</span>
            </div>
            <h3 style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 48,
              lineHeight: 1, textTransform: 'uppercase', color: '#FAFAF7',
              margin: '0 0 20px', letterSpacing: '-0.01em',
            }}>{s.title}</h3>
            <p style={{
              fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
              fontSize: 22, lineHeight: 1.5, color: '#C8CBCE',
              margin: '0 0 32px', maxWidth: 540,
            }}>{s.lead}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px' }}>
              {s.bullets.map((b, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16, padding: '12px 0',
                  borderBottom: '1px dashed rgba(255,255,255,0.08)',
                  fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.5, color: '#C8CBCE',
                }}>
                  <span style={{
                    fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 14,
                    color: '#F47920', marginTop: 2, minWidth: 24,
                  }}>↗</span>
                  {b}
                </li>
              ))}
            </ul>
            <button
              onMouseEnter={(e) => { e.currentTarget.style.background = '#C55F18'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#F47920'; }}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                background: '#F47920', color: '#fff', border: 0, padding: '14px 22px',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
                transition: 'background 120ms cubic-bezier(0.2,0.8,0.2,1)',
              }}>
              Book a discovery call
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes svcSlide {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 900px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .svc-grid > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
        }
      `}</style>
    </section>
  );
}

const kickerDark = {
  display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: 12,
  fontWeight: 700, color: '#F47920', textTransform: 'uppercase',
  letterSpacing: '0.14em', paddingBottom: 4, borderBottom: '2px solid #F47920',
  marginBottom: 24,
};

window.Services = Services;
