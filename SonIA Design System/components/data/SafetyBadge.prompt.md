Brand-safety status badge. The one hard rule: status is **never** color alone — every badge carries an icon and a text label.

```jsx
<SafetyBadge state="clear" />
<SafetyBadge state="review" />
<SafetyBadge state="block" />
```

`state`: clear (green check) | review (amber triangle) | block (magenta no-entry). Mono label, uppercase. Override copy with `label`.
