Native select styled to match `Input` — cyan focus ring, custom chevron, dark menu.

```jsx
<Select value={lang} onChange={setLang}
  options={[{value:'it',label:'Italian'},{value:'en',label:'English'}]} />
```

`options` accepts plain strings or `{value,label}`. Sizes: sm | md | lg.
