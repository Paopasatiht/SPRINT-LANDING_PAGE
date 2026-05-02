function Footer() {
  return (
    <footer style={{
      background: '#0A1E2F', borderTop: '2px solid #F47920', color: '#D4DDE6',
    }}>
      <div className="ftr-grid" style={{
        maxWidth: 1280, margin: '0 auto', padding: '64px 32px 32px',
        display: 'grid', gridTemplateColumns: '1.4fr 2fr', gap: 56,
      }}>
        <div>
          <div style={{
            fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 36,
            letterSpacing: '-0.01em', textTransform: 'uppercase',
            position: 'relative', display: 'inline-block', paddingRight: 14,
          }}>
            <span style={{ color: '#F47920' }}>SPRINT</span>
            <span style={{ color: '#FAFAF7' }}>AI</span>
            <span style={{
              position: 'absolute', right: 0, top: 8, width: 8, height: 8, background: '#F47920',
            }} />
          </div>
          <div style={{
            fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 17,
            color: '#88898B', marginTop: 12, maxWidth: 320, lineHeight: 1.4,
          }}>"AI is not a marathon, it's a sprint."</div>
          <div style={{
            display: 'flex', gap: 12, marginTop: 28,
          }}>
            {['LinkedIn', 'YouTube', 'X'].map(s => (
              <a key={s} href="#" style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
                color: '#FAFAF7', textTransform: 'uppercase', letterSpacing: '0.1em',
                border: '1px solid rgba(255,255,255,0.18)', padding: '8px 14px',
                textDecoration: 'none',
              }}>{s} ↗</a>
            ))}
          </div>
        </div>

        <div className="ftr-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <div>
            <div style={colH}>Work</div>
            <a href="#work" style={colLink}>Case studies</a>
            <a href="#" style={colLink}>Clients</a>
            <a href="#" style={colLink}>Press kit</a>
          </div>
          <div>
            <div style={colH}>Services</div>
            <a href="#services" style={colLink}>Strategy Sprint</a>
            <a href="#services" style={colLink}>Engineered Build</a>
            <a href="#services" style={colLink}>Cohort Training</a>
            <a href="#services" style={colLink}>Embedded Lead</a>
          </div>
          <div>
            <div style={colH}>Company</div>
            <a href="#manifesto" style={colLink}>Manifesto</a>
            <a href="#contact" style={colLink}>Contact</a>
            <a href="#" style={colLink}>Careers</a>
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 32px' }} />
      <div className="ftr-fine" style={{
        maxWidth: 1280, margin: '0 auto', padding: '20px 32px',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#5B7A98',
        letterSpacing: '0.04em',
      }}>
        <span>© 2026 SprintAI Co., Ltd · Bangkok</span>
        <span>// Run fast. Read faster.</span>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ftr-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ftr-cols { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}

const colH = {
  fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F47920',
  marginBottom: 16,
};
const colLink = {
  display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 14,
  color: '#C8CBCE', textDecoration: 'none', borderBottom: 0, padding: '6px 0',
};

window.Footer = Footer;
