Text input with the cyan micro-accent focus ring. Sits on `--bg-base`, quiet border that lifts to cyan on focus, magenta when `invalid`.

```jsx
<Input placeholder="Describe the scene…" value={v} onChange={set} />
<Input mono placeholder="01:12" iconLeft={<ClockIcon/>} />
```

Set `mono` for data entry (timestamps, BPM, score). Sizes: sm | md | lg.
