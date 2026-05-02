function Nav({ onSignup, activeSection }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products' },
    { id: 'manifesto', label: 'Manifesto' },
  ];

  const go = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: '#FAFAF7',
      borderBottom: scrolled ? '1px solid #E8E8E6' : '1px solid transparent',
      transition: 'border-color 200ms cubic-bezier(0.2,0.8,0.2,1)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 40,
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 24,
            letterSpacing: '-0.01em', textTransform: 'uppercase', textDecoration: 'none',
            position: 'relative', paddingRight: 14, border: 0, lineHeight: 1,
            display: 'inline-flex', alignItems: 'center',
          }}>
          <span style={{ color: '#F47920' }}>SPRINT</span>
          <span style={{ color: '#1B3C5C' }}>AI</span>
          <span style={{
            position: 'absolute', right: 0, top: 6, width: 6, height: 6, background: '#F47920',
          }} />
        </a>

        <nav className="desktop-nav" style={{ display: 'flex', gap: 28, flex: 1 }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); go(l.id); }}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
                color: activeSection === l.id ? '#F47920' : '#1A1B1D',
                textDecoration: 'none',
                borderBottom: activeSection === l.id ? '2px solid #F47920' : '2px solid transparent',
                paddingBottom: 3, transition: 'all 120ms cubic-bezier(0.2,0.8,0.2,1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { if (activeSection !== l.id) e.target.style.borderBottomColor = '#F47920'; }}
              onMouseLeave={(e) => { if (activeSection !== l.id) e.target.style.borderBottomColor = 'transparent'; }}
            >{l.label}</a>
          ))}
        </nav>

        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#contact" onClick={(e) => { e.preventDefault(); go('contact'); }}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
              color: '#1B3C5C', textDecoration: 'none', border: 0, cursor: 'pointer',
            }}>Contact</a>
          <button
            onClick={onSignup}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#C55F18'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#F47920'; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(.98)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              background: '#F47920', color: '#fff', border: 0, padding: '11px 18px',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'background 120ms cubic-bezier(0.2,0.8,0.2,1), transform 120ms',
            }}>
            Start a sprint
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </button>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', background: 'transparent', border: '1px solid #E8E8E6',
            padding: '8px 10px', cursor: 'pointer',
          }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1B1D" strokeWidth="2">
            {mobileOpen ? <path d="M6 6 18 18M18 6 6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          borderTop: '1px solid #E8E8E6', background: '#FAFAF7', padding: '8px 32px 16px',
        }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); go(l.id); }}
              style={{
                display: 'block', padding: '12px 0', borderBottom: '1px solid #E8E8E6',
                fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 500,
                color: '#1A1B1D', textDecoration: 'none',
              }}>{l.label}</a>
          ))}
          <button onClick={() => { setMobileOpen(false); onSignup(); }}
            style={{
              marginTop: 16, width: '100%',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              background: '#F47920', color: '#fff', border: 0, padding: '14px 18px',
              cursor: 'pointer',
            }}>Start a sprint ↗</button>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}

window.Nav = Nav;
