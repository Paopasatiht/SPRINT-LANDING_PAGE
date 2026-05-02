function CTA({ onSignup }) {
  return (
    <section id="contact" style={{
      background: '#0F1419', borderTop: '4px solid #F47920',
      padding: '120px 0', position: 'relative', overflow: 'hidden',
    }}>
      <svg aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0, width: '60%', height: '100%',
        opacity: 0.18, pointerEvents: 'none',
      }} preserveAspectRatio="xMaxYMid slice" viewBox="0 0 800 600">
        <g stroke="#F47920" strokeWidth="1" fill="none">
          <path d="M-20 100 L300 100 L340 140 L820 140" />
          <path d="M-20 220 L240 220 L280 260 L820 260" />
          <path d="M-20 360 L380 360 L420 400 L820 400" />
          <path d="M-20 480 L180 480 L220 520 L820 520" />
          <circle cx="340" cy="140" r="3" fill="#F47920" />
          <circle cx="280" cy="260" r="3" fill="#F47920" />
          <circle cx="420" cy="400" r="3" fill="#F47920" />
          <circle cx="220" cy="520" r="3" fill="#F47920" />
        </g>
      </svg>

      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative',
      }}>
        <div className="cta-grid" style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'center',
        }}>
          <div>
            <span style={kickerDarkCTA}>READY TO SPRINT?</span>
            <h2 style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 700,
              fontSize: 'clamp(56px, 8vw, 112px)', lineHeight: 0.92,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: '#FAFAF7', margin: '0 0 28px',
            }}>
              Stop reading.<br/>
              <span style={{ color: '#F47920' }}>Start shipping.</span>
            </h2>
            <p style={{
              fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
              fontSize: 22, lineHeight: 1.5, color: '#C8CBCE',
              margin: '0 0 40px', maxWidth: 540,
            }}>
              Tell us where you're stuck. We'll tell you, in one call, whether a sprint is the right move — and what it would look like.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
              <button onClick={onSignup}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#C55F18'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#F47920'; }}
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  background: '#F47920', color: '#fff', border: 0, padding: '18px 28px',
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12,
                  transition: 'background 120ms cubic-bezier(0.2,0.8,0.2,1)',
                }}>
                Book a discovery call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </button>
              <a href="mailto:hello@sprintai.co" style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 500,
                color: '#FAFAF7', textDecoration: 'none',
                borderBottom: '2px solid #F47920', paddingBottom: 3,
              }}>hello@sprintai.co</a>
            </div>
          </div>

          <aside style={{
            background: 'rgba(15,20,25,0.6)', border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '4px solid #F47920', padding: '32px 32px 28px',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: '#F47920', letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>// AVAILABILITY · Q3 2026</div>

            {[
              ['Strategy Sprint', '2 slots open', '#F47920'],
              ['Engineered Build', '1 slot open', '#F47920'],
              ['Cohort Training', 'Cohort 04 · Aug', '#F8A56B'],
              ['Embedded Lead', 'Waitlist', '#88898B'],
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                padding: '14px 0',
                borderBottom: i < 3 ? '1px dashed rgba(255,255,255,0.08)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#FAFAF7',
                }}>{row[0]}</span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500,
                  color: row[2], letterSpacing: '0.04em',
                }}>{row[1]}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

const kickerDarkCTA = {
  display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: 12,
  fontWeight: 700, color: '#F47920', textTransform: 'uppercase',
  letterSpacing: '0.14em', paddingBottom: 4, borderBottom: '2px solid #F47920',
  marginBottom: 32,
};

window.CTA = CTA;
