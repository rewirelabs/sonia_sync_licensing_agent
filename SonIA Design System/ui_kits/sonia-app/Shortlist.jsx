/* SonIA — Shortlist. Results sorted by match score. Structured brief chips at
   top (editable), quick filters, and the list of track cards. */
(function () {
  const { TrackCard, MoodChip, Button, IconButton } = window.SonIADesignSystem_4b5948;

  function Shortlist({ brief, tracks, onOpen, onBackToBrief }) {
    const [filter, setFilter] = React.useState('all');
    const filtered = tracks.filter((t) => filter === 'all' || (filter === 'clear' ? t.safety === 'clear' : t.moods.includes(filter)));
    const sorted = [...filtered].sort((a, b) => b.match - a.match);

    const Filter = ({ id, children }) => (
      <button onClick={() => setFilter(id)} style={{
        height: 28, padding: '0 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
        border: '1px solid', borderColor: filter === id ? 'var(--accent-micro)' : 'var(--border)',
        background: filter === id ? 'var(--accent-micro-dim)' : 'transparent',
        color: filter === id ? 'var(--accent-micro)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
      }}>{children}</button>
    );

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* brief summary */}
        <div style={{ padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Brief</span>
            <Button variant="tertiary" size="sm" onClick={onBackToBrief}>Edit brief</Button>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {brief.facets.map((f, i) => <MoodChip key={i} mood={f.mood}>{f.label}</MoodChip>)}
          </div>
        </div>

        {/* results header + filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--text-primary)' }}>
            {sorted.length} tracks <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>· sorted by match</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Filter id="all">All</Filter>
            <Filter id="clear">Clear only</Filter>
            <Filter id="mellow">Mellow</Filter>
            <Filter id="energetic">Energetic</Filter>
          </div>
        </div>

        {/* list */}
        <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minHeight: 0 }}>
          {sorted.map((t) => (
            <TrackCard key={t.id} {...t} onOpen={() => onOpen(t)} />
          ))}
        </div>
      </div>
    );
  }

  window.Shortlist = Shortlist;
})();
