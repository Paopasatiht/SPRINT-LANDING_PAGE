function Manifesto() {
  const principles = [
    { n: '01', t: 'Velocity over mastery', d: 'You don\'t need to know everything. You need to know first — and ship this week.' },
    { n: '02', t: 'Opinion over options', d: 'Strategy decks die in committees. We make a call, build it, and adjust on Friday.' },
    { n: '03', t: 'Systems over slides', d: 'Pilots that never reach production are theater. Every sprint ends in code your team owns.' },
  ];
  return (
    <section id="manifesto" style={{
      background: '#FAFAF7', padding: '120px 0 100px', borderTop: '2px solid #F47920',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div className="mfg-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, marginBottom: 72, alignItems: 'start',
        }}>
          <div style={{ position: 'sticky', top: 96 }}>
            <span style={kicker}>THE MANIFESTO</span>
            <h2 style={{
              fontFamily: 'Playfair Display, serif', fontWeight: 700,
              fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.02em', color: '#1A1B1D', margin: '0 0 0',
            }}>
              We don't<br/>
              <span style={{ fontStyle: 'italic', color: '#F47920' }}>strategize.</span><br/>
              We <u style={{ textDecorationColor: '#F47920', textDecorationThickness: 4, textUnderlineOffset: 6 }}>ship.</u>
            </h2>
          </div>
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 22, lineHeight: 1.55,
              color: '#1A1B1D', margin: '0 0 28px', fontWeight: 500,
            }}>
              <span style={{
                fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '4em',
                float: 'left', lineHeight: 0.85, padding: '6px 14px 0 0', color: '#F47920',
              }}>E</span>
              very team we work with has an AI strategy doc. Most are several weeks out of date by the time they ship — not because the writers are slow, but because the space moves.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.65,
              color: '#3D3E40', margin: '0 0 28px',
            }}>
              The teams that win aren't the ones with the best theory. They're the ones running one small experiment a week, shipping the result before anyone asks, and adjusting course on Friday.
            </p>
            <div style={{
              fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 28,
              lineHeight: 1.3, color: '#1B3C5C', borderLeft: '3px solid #F47920',
              padding: '8px 0 8px 28px', margin: '36px 0',
            }}>
              <span style={{ color: '#F47920', fontSize: '1.4em', marginRight: 6 }}>“</span>
              Velocity is a strategy. We just don't write it down — we run it.
            </div>
          </div>
        </div>

        <div className="mfg-principles" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
          borderTop: '1px solid #E8E8E6',
        }}>
          {principles.map((p, i) => (
            <div key={i} style={{
              padding: '36px 32px 32px',
              borderRight: i < 2 ? '1px solid #E8E8E6' : 'none',
              borderTop: '4px solid #F47920',
              marginTop: -2,
            }}>
              <div style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 56,
                color: '#F47920', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 16,
              }}>{p.n}</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 24,
                lineHeight: 1.2, color: '#1A1B1D', margin: '0 0 12px',
              }}>{p.t}</h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.6,
                color: '#3D3E40', margin: 0,
              }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mfg-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .mfg-grid > div:first-child { position: static !important; }
          .mfg-principles { grid-template-columns: 1fr !important; }
          .mfg-principles > div { border-right: none !important; }
        }
      `}</style>
    </section>
  );
}

const kicker = {
  display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: 12,
  fontWeight: 700, color: '#F47920', textTransform: 'uppercase',
  letterSpacing: '0.14em', paddingBottom: 4, borderBottom: '2px solid #F47920',
  marginBottom: 24,
};

window.Manifesto = Manifesto;
