function App() {
  const [openCase, setOpenCase] = React.useState(null);
  const [signup, setSignup] = React.useState(false);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [active, setActive] = React.useState('');

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroVariant": "navy",
    "density": "spacious"
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const sections = ['top', 'work', 'services', 'products', 'manifesto', 'contact'];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Nav onSignup={() => setSignup(true)} activeSection={active} />
      <Hero variant={tweaks.heroVariant} onCTA={() => setSignup(true)} />
      <CaseStudies onOpen={(c) => setOpenCase(c)} />
      <Services />
      <Products />
      <Manifesto />
      <CTA onSignup={() => setSignup(true)} />
      <Footer />
      <CaseModal c={openCase} onClose={() => setOpenCase(null)} />
      <SignupModal open={signup} onClose={() => setSignup(false)} />

      <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)} title="Tweaks">
        <TweakSection title="Hero">
          <TweakRadio label="Variant" value={tweaks.heroVariant}
            onChange={(v) => setTweak('heroVariant', v)}
            options={[
              { value: 'navy', label: 'Navy' },
              { value: 'paper', label: 'Paper' },
              { value: 'circuit', label: 'Circuit' },
            ]} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
