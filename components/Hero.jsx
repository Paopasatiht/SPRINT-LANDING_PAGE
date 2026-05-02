function Hero({ variant = 'navy', onCTA }) {
  // variant: 'navy' (Hero/Cover combo), 'paper' (Body), 'circuit' (Tech/Circuit)
  const isDark = variant === 'navy' || variant === 'circuit';
  const bg = variant === 'navy' ? '#1B3C5C'
    : variant === 'circuit' ? 'linear-gradient(135deg, #0F1419 0%, #1B3C5C 100%)'
    : '#FAFAF7';
  const fg = isDark ? '#FAFAF7' : '#1A1B1D';
  const fgMuted = isDark ? '#C8CBCE' : '#3D3E40';
  const fgDim = isDark ? '#88898B' : '#88898B';

  return (
    <section id="top" style={{
      background: bg, position: 'relative', overflow: 'hidden',
      borderBottom: isDark ? 'none' : '1px solid #E8E8E6',
    }}>
      {/* Diagonal forward-motion streak */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0, width: '60%', height: '100%',
        background: isDark
          ? 'linear-gradient(115deg, transparent 40%, rgba(244,121,32,0.10) 60%, rgba(244,121,32,0.18) 75%, transparent 90%)'
          : 'linear-gradient(115deg, transparent 50%, rgba(244,121,32,0.08) 70%, transparent 90%)',
        pointerEvents: 'none',
      }} />
      {/* Circuit grid lines (decorative) */}
      {isDark && (
        <svg aria-hidden="true" style={{
          position: 'absolute', top: 0, right: 0, width: 520, height: '100%', opacity: 0.18, pointerEvents: 'none',
        }} viewBox="0 0 520 720" preserveAspectRatio="xMaxYMid meet">
          <g stroke="#F47920" strokeWidth="1" fill="none">
            <path d="M0 80 L300 80 L320 100 L520 100" />
            <path d="M0 200 L240 200 L260 220 L520 220" />
            <path d="M0 360 L380 360 L400 380 L520 380" />
            <path d="M0 520 L180 520 L200 540 L520 540" />
            <path d="M0 640 L420 640 L440 660 L520 660" />
            <circle cx="320" cy="100" r="3" fill="#F47920" />
            <circle cx="260" cy="220" r="3" fill="#F47920" />
            <circle cx="400" cy="380" r="3" fill="#F47920" />
            <circle cx="200" cy="540" r="3" fill="#F47920" />
          </g>
        </svg>
      )}

      <div className="hero-grid" style={{
        maxWidth: 1280, margin: '0 auto', padding: '88px 32px 96px',
        display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 64, alignItems: 'end',
        position: 'relative', zIndex: 1,
      }}>
        <div>
          <span style={{
            display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: 12,
            fontWeight: 700, color: '#F47920', textTransform: 'uppercase',
            letterSpacing: '0.14em', paddingBottom: 4, borderBottom: '2px solid #F47920',
            marginBottom: 32,
          }}>AI · Productivity · Velocity</span>

          <h1 style={{
            fontFamily: 'Oswald, sans-serif', fontWeight: 700,
            fontSize: 'clamp(56px, 9vw, 128px)', lineHeight: 0.92,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: fg, margin: '0 0 28px',
          }}>
            <span style={{ display: 'block', opacity: 0.72 }}>AI is not a</span>
            <span style={{ display: 'block', textDecoration: 'line-through', textDecorationColor: '#F47920', textDecorationThickness: 6 }}>marathon.</span>
            <span style={{ display: 'block', color: '#F47920' }}>It's a sprint.</span>
          </h1>

          <p style={{
            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
            fontSize: 'clamp(18px, 1.6vw, 22px)', lineHeight: 1.5,
            color: fgMuted, margin: '0 0 36px', maxWidth: 620,
          }}>
            We help enterprise teams ship AI products in weeks, not quarters.
            Strategy, training, and engineered systems — built to move.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, marginBottom: 36 }}>
            <button
              onClick={onCTA}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#C55F18'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#F47920'; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(.98)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                background: '#F47920', color: '#fff', border: 0, padding: '18px 28px',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 12,
                transition: 'background 120ms cubic-bezier(0.2,0.8,0.2,1), transform 120ms',
              }}>
              Start a sprint
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </button>
            <a href="#work"
              onClick={(e) => { e.preventDefault(); document.getElementById('work').scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                color: isDark ? '#FAFAF7' : '#1B3C5C', textDecoration: 'none',
                borderBottom: '2px solid #F47920', paddingBottom: 4, cursor: 'pointer',
              }}>See the work →</a>
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12,
            fontFamily: 'Inter, sans-serif', fontSize: 13, color: fgDim,
          }}>
            <span><strong style={{ color: fg }}>Trusted by</strong></span>
            <span style={{ color: isDark ? '#5B7A98' : '#D4DDE6' }}>·</span>
            <span style={{ fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', color: fg, fontWeight: 600 }}>Krungsri</span>
            <span style={{ color: isDark ? '#5B7A98' : '#D4DDE6' }}>·</span>
            <span style={{ fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', color: fg, fontWeight: 600 }}>SCB</span>
            <span style={{ color: isDark ? '#5B7A98' : '#D4DDE6' }}>·</span>
            <span style={{ fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', color: fg, fontWeight: 600 }}>PTT</span>
            <span style={{ color: isDark ? '#5B7A98' : '#D4DDE6' }}>·</span>
            <span style={{ fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', color: fg, fontWeight: 600 }}>True</span>
          </div>
        </div>

        {/* Right side ticker / receipt */}
        <aside className="hero-aside" style={{
          background: isDark ? 'rgba(15,20,25,0.5)' : '#fff',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E8E8E6',
          borderTop: '4px solid #F47920',
          padding: '24px 24px 20px', position: 'relative',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 18, paddingBottom: 12, borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E8E8E6',
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.06em',
              color: '#F47920', textTransform: 'uppercase',
            }}>// LIVE · Q2 2026</span>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#F47920',
              boxShadow: '0 0 12px rgba(244,121,32,0.7)',
            }} />
          </div>

          {[
            { k: 'Sprints shipped', v: '47', s: 'last 12 mo' },
            { k: 'Avg. ship time', v: '21d', s: 'idea → prod' },
            { k: 'Enterprise clients', v: '23', s: 'across SEA' },
            { k: 'Engineers trained', v: '1,200+', s: 'in-house cohorts' },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'baseline',
              padding: '10px 0',
              borderBottom: i < 3 ? (isDark ? '1px dashed rgba(255,255,255,0.08)' : '1px dashed #E8E8E6') : 'none',
            }}>
              <div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: fg,
                }}>{row.k}</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 11, color: fgDim, marginTop: 2,
                }}>{row.s}</div>
              </div>
              <div style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 28,
                color: '#F47920', letterSpacing: '-0.01em',
              }}>{row.v}</div>
            </div>
          ))}
        </aside>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 56px 24px 72px !important; }
          .hero-aside { order: 2; }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
