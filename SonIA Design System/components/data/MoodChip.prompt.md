Editable mood / facet chip. One hue per emotional-spectrum category (`calm` blue → `intense` magenta), rendered as a low-opacity fill with solid text and border.

```jsx
<MoodChip mood="warm">warm</MoodChip>
<MoodChip mood="energetic" removable onRemove={drop}>energetic</MoodChip>
```

`mood`: calm | mellow | warm | energetic | intense. Use `color` only for non-spectrum facets (language, energy level). The hue carries meaning — never pick it for looks.
