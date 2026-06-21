Circular 0–100 match-score indicator. The arc fills along the cyan→orange gradient (low→high match); the score sits in the center in mono.

```jsx
<MatchRing value={87} />
<MatchRing value={62} size={40} showLabel={false} />
```

`value`: 0–100. Size it with `size` / `stroke`. Used on track cards and the shortlist; the number IS the data, so never fake or round arbitrarily.
