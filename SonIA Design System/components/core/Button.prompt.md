Primary action button — orange `primary` for the one true CTA, `secondary` ghost outline and `tertiary` text for everything else.

```jsx
<Button variant="primary" onClick={run}>Find tracks</Button>
<Button variant="secondary">Edit brief</Button>
<Button variant="tertiary" size="sm">Clear</Button>
```

Variants: `primary` | `secondary` | `tertiary`. Sizes: `sm` | `md` | `lg`. Supports `iconLeft` / `iconRight` (pass an SVG node), `disabled`. Never use more than one primary button in a view — orange means action.
