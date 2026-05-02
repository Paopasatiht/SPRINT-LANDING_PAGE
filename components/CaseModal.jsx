function CaseModal({ c, onClose }) {
  React.useEffect(() => {
    if (!c) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [c, onClose]);

  if (!c) return null;
  const d = c.details;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(15,20,25,0.72)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      padding: '40px 24px', overflowY: 'auto',
      animation: 'fadeIn 200ms cubic-bezier(0.2,0.8,0.2,1)',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        maxWidth: 960, width: '100%', background: '#FAFAF7',
        borderTop: '6px solid #F47920',
        animation: 'slideIn 400ms cubic-bezier(0.2,0.8,0.2,1)',
        position: 'relative',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, zIndex: 2,
          background: '#FAFAF7', border: '1px solid #E8E8E6', cursor: 'pointer',
          width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1B1D" strokeWidth="2">
            <path d="M6 6 18 18M18 6 6 18" />
          </svg>
        </button>

        {/* Header */}
        <div style={{ background: c.cover, color: '#FAFAF7', padding: '56px 56px 48px', position: 'relative', overflow: 'hidden' }}>
          <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.16 }} preserveAspectRatio="none" viewBox="0 0 600 300">
            <g stroke="#F47920" strokeWidth="1" fill="none">
              <path d="M-20 50 L240 50 L260 70 L620 70" />
              <path d="M-20 140 L180 140 L200 160 L620 160" />
              <path d="M-20 230 L320 230 L340 250 L620 250" />
              <circle cx="260" cy="70" r="3" fill="#F47920" />
              <circle cx="200" cy="160" r="3" fill="#F47920" />
              <circle cx="340" cy="250" r="3" fill="#F47920" />
            </g>
          </svg>
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.08em',
              color: '#F47920',
            }}>
              <span>{c.kicker}</span>
              <span style={{ color: '#5B7A98' }}>·</span>
              <span style={{
                fontFamily: 'Oswald, sans-serif', fontSize: 14, fontWeight: 600,
                color: '#FAFAF7', textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>{c.client}</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif', fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1,
              color: '#FAFAF7', margin: 0, letterSpacing: '-0.01em', maxWidth: 720,
            }}>{c.headline}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
              {c.tags.map((t, i) => (
                <span key={i} style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                  color: '#FAFAF7', textTransform: 'uppercase', letterSpacing: '0.08em',
                  border: '1px solid rgba(250,250,247,0.3)', padding: '4px 10px', borderRadius: 999,
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '56px 56px 64px' }}>
          {/* Outcome strip */}
          <div className="modal-outcome" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
            background: '#1B3C5C', borderTop: '4px solid #F47920',
            marginBottom: 48,
          }}>
            {d.outcome.map((o, i) => (
              <div key={i} style={{
                padding: '24px 20px',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 44,
                  color: '#F47920', lineHeight: 1, letterSpacing: '-0.01em',
                }}>{o[0]}</div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
                  color: '#D4DDE6', marginTop: 8, lineHeight: 1.4,
                }}>{o[1]}</div>
              </div>
            ))}
          </div>

          <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48 }}>
            <div>
              <span style={kickerSm}>THE PROBLEM</span>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.65,
              color: '#1A1B1D', margin: 0,
            }}>{d.problem}</p>
          </div>

          <div className="modal-body" style={{
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48,
            paddingTop: 40, marginTop: 40, borderTop: '2px solid #F47920',
          }}>
            <div>
              <span style={kickerSm}>THE SPRINT</span>
            </div>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {d.approach.map((step, i) => (
                <li key={i} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20,
                  padding: '14px 0',
                  borderBottom: i < d.approach.length - 1 ? '1px dashed #E8E8E6' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 24,
                    color: '#F47920', lineHeight: 1, minWidth: 32,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 16, lineHeight: 1.55, color: '#3D3E40',
                  }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div style={{
            marginTop: 56, padding: '32px 36px',
            background: '#0F1419', borderLeft: '4px solid #F47920', color: '#FAFAF7',
          }}>
            <div style={{
              fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
              fontSize: 24, lineHeight: 1.4, color: '#FAFAF7', marginBottom: 16,
            }}>
              <span style={{ color: '#F47920', fontSize: '1.4em', marginRight: 6 }}>“</span>
              {d.quote}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
              color: '#88898B', textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>— {d.quoteBy}</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slideIn { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @media (max-width: 700px) {
          .modal-outcome { grid-template-columns: repeat(2, 1fr) !important; }
          .modal-outcome > div:nth-child(3) { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.1); }
          .modal-outcome > div:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.1); }
          .modal-body { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </div>
  );
}

const kickerSm = {
  display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: 11,
  fontWeight: 700, color: '#F47920', textTransform: 'uppercase',
  letterSpacing: '0.14em', paddingBottom: 4, borderBottom: '2px solid #F47920',
};

window.CaseModal = CaseModal;
