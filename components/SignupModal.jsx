function SignupModal({ open, onClose }) {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    name: '', email: '', company: '', role: '',
    engagement: '', timeline: '', team: '',
  });

  React.useEffect(() => {
    if (!open) { setStep(1); setForm({ name: '', email: '', company: '', role: '', engagement: '', timeline: '', team: '' }); return; }
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const canStep1 = form.name && form.email.includes('@') && form.company && form.role;
  const canStep2 = form.engagement && form.timeline && form.team;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(15,20,25,0.78)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '24px', overflowY: 'auto',
      animation: 'fadeIn 200ms cubic-bezier(0.2,0.8,0.2,1)',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        maxWidth: 640, width: '100%', background: '#FAFAF7',
        borderTop: '6px solid #F47920',
        animation: 'slideIn 400ms cubic-bezier(0.2,0.8,0.2,1)',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, zIndex: 2,
          background: 'transparent', border: '1px solid #E8E8E6', cursor: 'pointer',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1B1D" strokeWidth="2">
            <path d="M6 6 18 18M18 6 6 18" />
          </svg>
        </button>

        <div style={{ padding: '48px 48px 40px' }}>
          {step < 3 && (
            <>
              <div style={{
                display: 'flex', gap: 8, marginBottom: 24,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.06em',
                color: '#88898B',
              }}>
                <span style={{ color: '#F47920' }}>// STEP {step} / 2</span>
                <span>·</span>
                <span>{step === 1 ? 'WHO YOU ARE' : 'WHAT YOU NEED'}</span>
              </div>
              <h3 style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 700,
                fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 0.95,
                letterSpacing: '-0.02em', textTransform: 'uppercase',
                color: '#1A1B1D', margin: '0 0 12px',
              }}>
                {step === 1 ? <>Let's <span style={{ color: '#F47920' }}>sprint.</span></> : <>One more <span style={{ color: '#F47920' }}>question.</span></>}
              </h3>
              <p style={{
                fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
                fontSize: 17, lineHeight: 1.5, color: '#3D3E40',
                margin: '0 0 32px',
              }}>
                {step === 1
                  ? 'Two short steps. We reply within one business day.'
                  : 'Helps us send the right partner — strategy, build, or training.'}
              </p>

              {step === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Your name" v={form.name} onChange={(v) => set('name', v)} placeholder="Wisoot S." />
                  <Field label="Work email" v={form.email} onChange={(v) => set('email', v)} placeholder="you@company.co" type="email" />
                  <Field label="Company" v={form.company} onChange={(v) => set('company', v)} placeholder="Your organization" />
                  <Field label="Role" v={form.role} onChange={(v) => set('role', v)} placeholder="Head of Product" />
                </div>
              )}

              {step === 2 && (
                <div style={{ display: 'grid', gap: 24 }}>
                  <Choice label="What kind of engagement?" v={form.engagement} onChange={(v) => set('engagement', v)}
                    options={['Strategy Sprint', 'Engineered Build', 'Cohort Training', 'Embedded Lead', 'Not sure yet']} />
                  <Choice label="Timeline" v={form.timeline} onChange={(v) => set('timeline', v)}
                    options={['ASAP', 'This quarter', 'Next quarter', 'Just exploring']} />
                  <Choice label="Team size" v={form.team} onChange={(v) => set('team', v)}
                    options={['1–10', '10–50', '50–500', '500+']} />
                </div>
              )}

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: 36, paddingTop: 24, borderTop: '1px solid #E8E8E6',
              }}>
                <button onClick={step === 1 ? onClose : () => setStep(1)}
                  style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                    color: '#88898B', background: 'transparent', border: 0,
                    cursor: 'pointer', padding: 0,
                  }}>{step === 1 ? '← Cancel' : '← Back'}</button>
                <button
                  disabled={step === 1 ? !canStep1 : !canStep2}
                  onClick={() => step === 1 ? setStep(2) : setStep(3)}
                  onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#C55F18'; }}
                  onMouseLeave={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#F47920'; }}
                  style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    background: (step === 1 ? canStep1 : canStep2) ? '#F47920' : '#E8E8E6',
                    color: (step === 1 ? canStep1 : canStep2) ? '#fff' : '#88898B',
                    border: 0, padding: '14px 24px',
                    cursor: (step === 1 ? canStep1 : canStep2) ? 'pointer' : 'not-allowed',
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    transition: 'background 120ms cubic-bezier(0.2,0.8,0.2,1)',
                  }}>
                  {step === 1 ? 'Continue' : 'Send'} →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 88,
                color: '#F47920', lineHeight: 0.9, marginBottom: 20,
              }}>↗</div>
              <h3 style={{
                fontFamily: 'Oswald, sans-serif', fontWeight: 700,
                fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 0.95,
                letterSpacing: '-0.02em', textTransform: 'uppercase',
                color: '#1A1B1D', margin: '0 0 16px',
              }}>You're <span style={{ color: '#F47920' }}>in.</span></h3>
              <p style={{
                fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
                fontSize: 19, lineHeight: 1.5, color: '#3D3E40',
                margin: '0 auto 32px', maxWidth: 420,
              }}>
                We'll reply within one business day from <strong style={{ color: '#1A1B1D' }}>hello@sprintai.co</strong>. Check spam if you don't see it.
              </p>
              <button onClick={onClose}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#C55F18'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#F47920'; }}
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  background: '#F47920', color: '#fff', border: 0, padding: '14px 28px',
                  cursor: 'pointer', transition: 'background 120ms cubic-bezier(0.2,0.8,0.2,1)',
                }}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, v, onChange, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{
        display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F47920',
        marginBottom: 8,
      }}>{label}</span>
      <input
        type={type}
        value={v}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', fontFamily: 'Inter, sans-serif', fontSize: 16,
          padding: '12px 14px', background: '#fff',
          border: '1px solid #E8E8E6', borderRadius: 0,
          outline: 'none', color: '#1A1B1D', boxSizing: 'border-box',
        }}
        onFocus={(e) => { e.target.style.borderColor = '#F47920'; }}
        onBlur={(e) => { e.target.style.borderColor = '#E8E8E6'; }}
      />
    </label>
  );
}

function Choice({ label, v, onChange, options }) {
  return (
    <div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F47920',
        marginBottom: 10,
      }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map(o => (
          <button key={o} onClick={() => onChange(o)}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
              background: v === o ? '#1B3C5C' : '#fff',
              color: v === o ? '#FAFAF7' : '#1A1B1D',
              border: v === o ? '1px solid #1B3C5C' : '1px solid #E8E8E6',
              padding: '10px 14px', cursor: 'pointer', borderRadius: 0,
              transition: 'all 120ms cubic-bezier(0.2,0.8,0.2,1)',
            }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

window.SignupModal = SignupModal;
