SonIA's mark — a waveform that is also the agent's live status. The one element allowed to animate ambiently; everything else holds still until a signal arrives.

```jsx
<Waveform state="idle" />       {/* flat, muted */}
<Waveform state="listening" />  {/* secondary, slow */}
<Waveform state="thinking" />   {/* cyan, medium */}
<Waveform state="speaking" />   {/* orange, fast */}
```

State is encoded by both color and motion period. Use it in the rail/header as SonIA's presence and inline next to her microcopy.
