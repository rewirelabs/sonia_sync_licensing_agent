/* SonIA — App shell. Left rail (SonIA + brief history), center canvas
   (Brief → Shortlist → Aligner), right context panel (track detail).
   Holds the view state for the whole kit. */
(function () {
  const { Waveform, MoodChip, SafetyBadge, MatchRing, IconButton } = window.SonIADesignSystem_4b5948;

  function RailItem({ item, onClick }) {
    const [hover, setHover] = React.useState(false);
    return (
      <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          textAlign: 'left', width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
          border: '1px solid', borderColor: item.active ? 'var(--border-strong)' : 'transparent',
          background: item.active ? 'var(--bg-elevated)' : hover ? 'var(--hover-overlay)' : 'transparent',
        }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{item.meta}</div>
      </button>
    );
  }

  function ContextPanel({ track }) {
    if (!track) return (
      <div style={{ padding: 'var(--space-6)', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 13 }}>
        Select a track to see its detail.
      </div>
    );
    const Row = ({ k, v, mono }) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)' }}>{k}</span>
        <span style={{ fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)', fontSize: 13, color: 'var(--text-primary)', letterSpacing: mono ? '.02em' : 'normal' }}>{v}</span>
      </div>
    );
    return (
      <div style={{ padding: 'var(--space-5)', overflow: 'auto' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', background: 'var(--spectrum)', border: '1px solid var(--border)', flex: 'none' }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{track.artist}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          <SafetyBadge state={track.safety} />
          <MatchRing value={track.match} size={48} stroke={4} />
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '8px 0' }}>Mood</div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
          {track.moods.map((m, i) => <MoodChip key={i} mood={m}>{m}</MoodChip>)}
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '8px 0' }}>Metadata</div>
        <Row k="Duration" v={track.duration} mono />
        <Row k="BPM" v={track.bpm} mono />
        <Row k="Language" v={track.language} mono />
        <Row k="Window" v={track.windowLabel} mono />
        <Row k="Match" v={track.match} mono />
      </div>
    );
  }

  function AppShell({ data }) {
    const [view, setView] = React.useState('brief'); // brief | shortlist | aligner
    const [selected, setSelected] = React.useState(data.tracks[0]);

    const tabState = view === 'brief' ? 'listening' : view === 'aligner' ? 'speaking' : 'thinking';

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '232px 1fr 288px', height: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
        {/* LEFT RAIL */}
        <aside style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'var(--space-5) var(--space-5) var(--space-4)' }}>
            <Waveform state={tabState} height={24} bars={6} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, letterSpacing: '-.02em' }}>Son<span style={{ color: 'var(--accent-action)' }}>IA</span></span>
          </div>
          <button onClick={() => setView('brief')} style={{ margin: '0 var(--space-4) var(--space-4)', height: 36, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M8 3v10M3 8h10" /></svg>
            New brief
          </button>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 var(--space-5) var(--space-2)' }}>History</div>
          <div style={{ flex: 1, overflow: 'auto', padding: '0 var(--space-3)', display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
            {data.history.map((h) => <RailItem key={h.id} item={h} onClick={() => setView('shortlist')} />)}
          </div>
          <div style={{ padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>M. Rossi</span>
          </div>
        </aside>

        {/* CENTER CANVAS */}
        <main style={{ minWidth: 0, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {view === 'brief' && <window.BriefComposer brief={data.brief} onRun={() => setView('shortlist')} />}
          {view === 'shortlist' && <window.Shortlist brief={data.brief} tracks={data.tracks}
            onOpen={(t) => { setSelected(t); setView('aligner'); }}
            onBackToBrief={() => setView('brief')} />}
          {view === 'aligner' && <window.SectionAligner track={selected} onBack={() => setView('shortlist')} />}
        </main>

        {/* RIGHT CONTEXT PANEL */}
        <aside style={{ borderLeft: '1px solid var(--border)', minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: 'var(--space-5) var(--space-5) 0' }}>Track detail</div>
          <ContextPanel track={view === 'brief' ? null : selected} />
        </aside>
      </div>
    );
  }

  window.AppShell = AppShell;
})();
