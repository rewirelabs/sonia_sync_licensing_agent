/* SonIA — Brief composer. The entry point: the supervisor describes a scene,
   SonIA returns a structured interpretation as editable chips. */
(function () {
  const { Waveform, MoodChip, Button } = window.SonIADesignSystem_4b5948;

  function BriefComposer({ brief, onRun }) {
    const [text, setText] = React.useState(brief.raw);
    const [interpreted, setInterpreted] = React.useState(true);
    const empty = text.trim().length === 0;

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12)' }}>
        <div style={{ width: '100%', maxWidth: 680 }}>
          {/* presence */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
            <Waveform state={interpreted ? 'speaking' : 'listening'} height={26} bars={6} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>SonIA · brief composer</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, letterSpacing: '-.02em', color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>Describe the scene.</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', marginTop: 'var(--space-3)', lineHeight: 1.5 }}>Mood, energy, duration, language — SonIA does the rest.</p>

          {/* input */}
          <div style={{ marginTop: 'var(--space-6)', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setInterpreted(false); }}
              placeholder="A late-night rooftop, two friends reconcile after a long silence…"
              style={{ width: '100%', minHeight: 92, resize: 'vertical', border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.55 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{empty ? 'awaiting brief' : interpreted ? 'interpreted' : 'edited · re-interpret'}</span>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {!interpreted && !empty && <Button variant="secondary" size="sm" onClick={() => setInterpreted(true)}>Interpret</Button>}
                <Button variant="primary" size="sm" disabled={empty} onClick={onRun}>Find tracks</Button>
              </div>
            </div>
          </div>

          {/* structured interpretation OR empty state */}
          {empty ? (
            <div style={{ marginTop: 'var(--space-6)', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-8)' }}>
              Describe the scene. Mood, energy, duration, language: SonIA does the rest.
            </div>
          ) : interpreted && (
            <div style={{ marginTop: 'var(--space-6)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>SonIA's reading — edit any chip</div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {brief.facets.map((f, i) => (
                  <MoodChip key={i} mood={f.mood} removable onRemove={() => {}}>{f.label}</MoodChip>
                ))}
                <button style={{ height: 26, padding: '0 10px', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border-strong)', background: 'transparent', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'pointer' }}>+ add facet</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  window.BriefComposer = BriefComposer;
})();
