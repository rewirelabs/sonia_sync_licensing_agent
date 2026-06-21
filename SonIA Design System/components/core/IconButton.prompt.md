Square, icon-only control for toolbars and rails. Ghost by default; `active` switches to the cyan micro-accent ring + tint.

```jsx
<IconButton label="Play window"><PlayIcon/></IconButton>
<IconButton label="Filters" active><FilterIcon/></IconButton>
```

Always pass `label` for accessibility. Sizes: `sm` | `md` | `lg`. Put an SVG (16–20px, 1.5 stroke) as the child.
