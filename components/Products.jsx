function Products() {
  const [hovered, setHovered] = React.useState(null);
  const products = [
    {
      kicker: 'FLAGSHIP COURSE',
      tag: '8 weeks',
      title: 'AI for Analysts',
      lead: 'The full curriculum. Prompting, evals, shipping internal tools — taught by practitioners who ship daily.',
      price: 'THB 14,900',
      perSeat: '/ seat',
      dark: true,
      span: 2,
    },
    {
      kicker: 'WORKSHOP',
      tag: '1 day',
      title: 'Prompt Engineering Intensive',
      lead: 'From first prompt to reusable patterns. One Saturday, your team walks out shipping.',
      price: 'THB 2,900',
      perSeat: '/ seat',
    },
    {
      kicker: 'PLAYBOOK',
      tag: 'Self-paced',
      title: 'The Sprint Playbook',
      lead: 'Our internal operating manual for shipping AI in 21 days. 80 pages. Zero filler.',
      price: 'THB 890',
      perSeat: '',
    },
    {
      kicker: 'FREE · WEEKLY',
      tag: '20 min read',
      title: 'The Sprint Letter',
      lead: 'One opinion a week. What we shipped, what didn\'t work, one prompt to run tomorrow.',
      price: 'Free',
      perSeat: '',
    },
  ];

  return (
    <section id="products" style={{
      background: '#FAFAF7', padding: '120px 0',
      borderTop: '1px solid #E8E8E6',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: 24, marginBottom: 56,
        }}>
          <div>
            <span style={kicker}>PRODUCTS</span>
            <h2 style={{
              fontFamily: 'Oswald, sans-serif', fontWeight: 700,
              fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 0.95,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: '#1A1B1D', margin: 0,
            }}>
              Take the<br/>
              <span style={{ color: '#F47920' }}>method home.</span>
            </h2>
          </div>
          <p style={{
            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
            fontSize: 20, lineHeight: 1.5, color: '#3D3E40',
            margin: 0, maxWidth: 380,
          }}>
            For teams who want the curriculum without the consulting engagement.
          </p>
        </div>

        <div className="prod-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        }}>
          {products.map((p, i) => {
            const dark = p.dark;
            return (
              <article key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn: p.span ? `span ${p.span}` : 'auto',
                  background: dark ? '#1B3C5C' : '#FAFAF7',
                  border: dark ? '1px solid #0A1E2F' : '1px solid #E8E8E6',
                  borderTop: '4px solid #F47920',
                  padding: p.span ? '36px 36px 32px' : '28px 24px 24px',
                  display: 'flex', flexDirection: 'column',
                  minHeight: p.span ? 280 : 240, cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  transform: hovered === i ? 'translateY(-3px)' : 'none',
                  transition: 'transform 200ms cubic-bezier(0.2,0.8,0.2,1)',
                }}>
                {dark && (
                  <svg aria-hidden="true" style={{
                    position: 'absolute', top: 0, right: 0, width: 320, height: '100%',
                    opacity: 0.16, pointerEvents: 'none',
                  }} preserveAspectRatio="none" viewBox="0 0 320 280">
                    <g stroke="#F47920" strokeWidth="1" fill="none">
                      <path d="M-20 60 L160 60 L180 80 L340 80" />
                      <path d="M-20 160 L120 160 L140 180 L340 180" />
                      <circle cx="180" cy="80" r="2.5" fill="#F47920" />
                      <circle cx="140" cy="180" r="2.5" fill="#F47920" />
                    </g>
                  </svg>
                )}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative',
                }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
                    color: '#F47920', textTransform: 'uppercase', letterSpacing: '0.12em',
                    paddingBottom: 4, borderBottom: '2px solid #F47920',
                  }}>{p.kicker}</span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                    color: dark ? '#D4DDE6' : '#3D3E40',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    border: `1px solid ${dark ? '#5B7A98' : '#88898B'}`,
                    padding: '3px 10px', borderRadius: 999,
                  }}>{p.tag}</span>
                </div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif', fontWeight: 700,
                  fontSize: p.span ? 36 : 24, lineHeight: 1.15,
                  color: dark ? '#FAFAF7' : '#1A1B1D',
                  margin: '24px 0 12px', position: 'relative', letterSpacing: '-0.01em',
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: p.span ? 17 : 15, lineHeight: 1.55,
                  color: dark ? '#D4DDE6' : '#3D3E40',
                  margin: '0 0 24px', flex: 1, position: 'relative',
                }}>{p.lead}</p>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  borderTop: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E8E8E6',
                  paddingTop: 16, marginTop: 'auto', position: 'relative',
                }}>
                  <span>
                    <span style={{
                      fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 22,
                      color: dark ? '#FAFAF7' : '#1A1B1D', letterSpacing: '0.01em',
                    }}>{p.price}</span>
                    {p.perSeat && (
                      <span style={{
                        fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
                        color: dark ? '#88898B' : '#88898B', marginLeft: 6,
                      }}>{p.perSeat}</span>
                    )}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 18, color: '#F47920',
                    transform: hovered === i ? 'translate(2px, -2px)' : 'none',
                    transition: 'transform 200ms cubic-bezier(0.2,0.8,0.2,1)',
                  }}>↗</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .prod-grid { grid-template-columns: 1fr !important; }
          .prod-grid > article { grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}

window.Products = Products;
