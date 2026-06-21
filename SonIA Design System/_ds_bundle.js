/* @ds-bundle: {"format":3,"namespace":"SonIADesignSystem_4b5948","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"MatchRing","sourcePath":"components/data/MatchRing.jsx"},{"name":"MoodChip","sourcePath":"components/data/MoodChip.jsx"},{"name":"SafetyBadge","sourcePath":"components/data/SafetyBadge.jsx"},{"name":"TrackCard","sourcePath":"components/data/TrackCard.jsx"},{"name":"Waveform","sourcePath":"components/data/Waveform.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"}],"sourceHashes":{"components/core/Button.jsx":"98ffbab1036b","components/core/IconButton.jsx":"bbbcd4032aed","components/data/MatchRing.jsx":"a4bae6265295","components/data/MoodChip.jsx":"6ceef7e3e9c4","components/data/SafetyBadge.jsx":"62cafc93894c","components/data/TrackCard.jsx":"ead633ae7755","components/data/Waveform.jsx":"24ab682ab115","components/forms/Input.jsx":"a15869dfdfce","components/forms/Select.jsx":"a90659dda63c","ui_kits/sonia-app/AppShell.jsx":"504926bf2dea","ui_kits/sonia-app/BriefComposer.jsx":"823c0a32f606","ui_kits/sonia-app/SectionAligner.jsx":"73a6c3dd9d37","ui_kits/sonia-app/Shortlist.jsx":"1f7248e49481","ui_kits/sonia-app/data.js":"63555beb319c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SonIADesignSystem_4b5948 = window.SonIADesignSystem_4b5948 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SonIA Button — orange is reserved for primary actions only.
 * Variants: primary (action orange), secondary (ghost/outline), tertiary (text).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  type = 'button',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sizes = {
    sm: {
      padding: '0 12px',
      height: 30,
      font: 'var(--type-body-sm)'
    },
    md: {
      padding: '0 16px',
      height: 38,
      font: 'var(--type-body)'
    },
    lg: {
      padding: '0 22px',
      height: 46,
      font: 'var(--type-body-lg)'
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-body)',
    fontSize: s.font,
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-micro) var(--ease), border-color var(--dur-micro) var(--ease), color var(--dur-micro) var(--ease), transform var(--dur-micro) var(--ease)',
    transform: press && !disabled ? 'scale(0.98)' : 'scale(1)',
    whiteSpace: 'nowrap',
    userSelect: 'none'
  };
  const variants = {
    primary: {
      background: disabled ? 'var(--accent-action)' : press ? 'var(--accent-action-press)' : hover ? 'var(--accent-action-hover)' : 'var(--accent-action)',
      color: 'var(--text-on-action)'
    },
    secondary: {
      background: hover && !disabled ? 'var(--hover-overlay)' : 'transparent',
      color: 'var(--text-primary)',
      borderColor: hover && !disabled ? 'var(--border-strong)' : 'var(--border)'
    },
    tertiary: {
      background: 'transparent',
      color: hover && !disabled ? 'var(--accent-action-hover)' : 'var(--accent-action)',
      padding: '0 4px'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square, icon-only control. Quiet by default (ghost),
 * with an optional active state that uses the cyan micro-accent.
 */
function IconButton({
  children,
  size = 'md',
  active = false,
  disabled = false,
  label,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dim = {
    sm: 30,
    md: 36,
    lg: 42
  }[size] || 36;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: dim,
      height: dim,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid',
      borderColor: active ? 'var(--accent-micro)' : hover && !disabled ? 'var(--border-strong)' : 'var(--border)',
      background: active ? 'var(--accent-micro-dim)' : hover && !disabled ? 'var(--hover-overlay)' : 'transparent',
      color: active ? 'var(--accent-micro)' : 'var(--text-secondary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--dur-micro) var(--ease), border-color var(--dur-micro) var(--ease), color var(--dur-micro) var(--ease)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/MatchRing.jsx
try { (() => {
/**
 * MatchRing — circular 0–100 match score. The arc uses the cyan→orange
 * gradient (low→high). The number is mono; the score is the data.
 */
function MatchRing({
  value = 0,
  size = 56,
  stroke = 5,
  label = 'match',
  showLabel = true,
  style = {}
}) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = v / 100 * c;
  const gid = React.useId ? React.useId().replace(/:/g, '') : 'mr' + Math.round(value * 1000);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--accent-micro)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--accent-action)"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--ring-track)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: `url(#${gid})`,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: `${dash} ${c}`,
    style: {
      transition: 'stroke-dasharray var(--dur-enter) var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: size > 44 ? 'var(--type-data-lg)' : 'var(--type-data-sm)',
      color: 'var(--text-primary)'
    }
  }, Math.round(v))), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { MatchRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MatchRing.jsx", error: String((e && e.message) || e) }); }

// components/data/MoodChip.jsx
try { (() => {
const MOOD_HUES = {
  calm: 'var(--mood-calm)',
  mellow: 'var(--mood-mellow)',
  warm: 'var(--mood-warm)',
  energetic: 'var(--mood-energetic)',
  intense: 'var(--mood-intense)'
};

/**
 * MoodChip — low-opacity filled chip, one hue per emotional category.
 * The hue is data: it comes from the emotional spectrum, never decoration.
 */
function MoodChip({
  mood = 'calm',
  children,
  color,
  removable = false,
  onRemove,
  style = {}
}) {
  const hue = color || MOOD_HUES[mood] || MOOD_HUES.calm;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      height: 26,
      padding: '0 10px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${hue}`,
      background: `color-mix(in srgb, ${hue} 14%, transparent)`,
      color: hue,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-body-sm)',
      fontWeight: 'var(--weight-medium)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: hue,
      flex: 'none'
    }
  }), children || mood, removable && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: 'none',
      background: 'transparent',
      color: hue,
      cursor: 'pointer',
      padding: 0,
      marginLeft: 2,
      fontSize: 14,
      lineHeight: 1,
      opacity: 0.8
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { MoodChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MoodChip.jsx", error: String((e && e.message) || e) }); }

// components/data/SafetyBadge.jsx
try { (() => {
const STATES = {
  clear: {
    color: 'var(--safe-clear)',
    label: 'Clear'
  },
  review: {
    color: 'var(--safe-review)',
    label: 'Review'
  },
  block: {
    color: 'var(--safe-block)',
    label: 'Block'
  }
};
function Glyph({
  state,
  color
}) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  if (state === 'clear') return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
    d: "M3.5 8.5l3 3 6-6.5"
  }));
  if (state === 'review') return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.5l6 11H2l6-11z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 7v3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 12h.01"
  }));
  return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "5.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 5l6 6"
  }));
}

/**
 * SafetyBadge — brand-safety status. NEVER color alone: always icon + label.
 */
function SafetyBadge({
  state = 'clear',
  label,
  style = {}
}) {
  const s = STATES[state] || STATES.clear;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      height: 24,
      padding: '0 9px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid color-mix(in srgb, ${s.color} 40%, transparent)`,
      background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
      color: s.color,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-data-sm)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-data)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Glyph, {
    state: state,
    color: s.color
  }), label || s.label);
}
Object.assign(__ds_scope, { SafetyBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SafetyBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/TrackCard.jsx
try { (() => {
/** Mini sparkline of the emotional curve, with the 30s window highlighted. */
function WindowSparkline({
  curve,
  window: win
}) {
  const w = 120,
    h = 34;
  const pts = curve.map((v, i) => `${i / (curve.length - 1) * w},${h - v * (h - 4) - 2}`).join(' ');
  const start = win ? win[0] : 0.45;
  const end = win ? win[1] : 0.72;
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: start * w,
    y: 0,
    width: (end - start) * w,
    height: h,
    fill: "color-mix(in srgb, var(--accent-action) 16%, transparent)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: start * w,
    y: 0,
    width: "1.5",
    height: h,
    fill: "var(--accent-action)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: end * w - 1.5,
    y: 0,
    width: "1.5",
    height: h,
    fill: "var(--accent-action)"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: "var(--accent-micro)",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }));
}

/**
 * TrackCard — assembles the SonIA result row: artwork, title (display),
 * artist / duration / language (mono), mood chips, match ring, safety
 * badge, and a mini-sparkline of the optimal window.
 */
function TrackCard({
  title = 'Untitled',
  artist = 'Unknown',
  duration = '0:00',
  language = '—',
  bpm,
  artwork,
  moods = [],
  match = 0,
  safety = 'clear',
  curve = [0.2, 0.3, 0.25, 0.4, 0.55, 0.7, 0.85, 0.78, 0.6, 0.5, 0.42, 0.3],
  window: win = [0.45, 0.72],
  windowLabel = '01:12–01:42',
  onOpen,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onOpen,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      padding: 'var(--space-4)',
      background: 'var(--bg-surface)',
      border: '1px solid',
      borderColor: hover ? 'var(--border-strong)' : 'var(--border)',
      borderRadius: 'var(--radius-md)',
      cursor: onOpen ? 'pointer' : 'default',
      transition: 'border-color var(--dur-std) var(--ease)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      flex: 'none',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      background: artwork ? `center/cover no-repeat url(${artwork})` : 'var(--spectrum)',
      border: '1px solid var(--border)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--type-subheading)',
      letterSpacing: 'var(--tracking-heading)',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-data-sm)',
      color: 'var(--text-secondary)',
      marginTop: 3,
      letterSpacing: 'var(--tracking-data)'
    }
  }, artist, " \xB7 ", duration, " \xB7 ", language, bpm ? ` · ${bpm} BPM` : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, moods.map((m, i) => /*#__PURE__*/React.createElement(__ds_scope.MoodChip, {
    key: i,
    mood: typeof m === 'string' ? m : m.mood
  }, typeof m === 'string' ? m : m.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(WindowSparkline, {
    curve: curve,
    window: win
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-eyebrow)',
      color: 'var(--accent-action)',
      letterSpacing: 'var(--tracking-data)'
    }
  }, windowLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SafetyBadge, {
    state: safety
  }), /*#__PURE__*/React.createElement(__ds_scope.MatchRing, {
    value: match,
    size: 48,
    stroke: 4,
    showLabel: false
  })));
}
Object.assign(__ds_scope, { TrackCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TrackCard.jsx", error: String((e && e.message) || e) }); }

// components/data/Waveform.jsx
try { (() => {
const STATE_COLOR = {
  idle: 'var(--text-muted)',
  listening: 'var(--text-secondary)',
  thinking: 'var(--accent-micro)',
  speaking: 'var(--accent-action)'
};
const STATE_SPEED = {
  idle: 0,
  listening: 1.7,
  thinking: 1.15,
  speaking: 0.7
};

/**
 * Waveform — SonIA's mark, an audio signature in four states.
 * idle = flat baseline (still), listening / thinking / speaking animate.
 * This is the ONLY element that animates ambiently.
 */
function Waveform({
  state = 'listening',
  bars = 7,
  height = 36,
  barWidth = 4,
  gap = 3,
  style = {}
}) {
  const color = STATE_COLOR[state] || STATE_COLOR.listening;
  const speed = STATE_SPEED[state] || 0;
  const animate = state !== 'idle';
  const kf = 'sonia-wv';

  // deterministic, varied delays so bars don't move in lockstep
  const delays = React.useMemo(() => Array.from({
    length: bars
  }, (_, i) => -((i * 0.27 + i % 3 * 0.19) % 1).toFixed(2)), [bars]);
  return /*#__PURE__*/React.createElement("div", {
    role: "img",
    "aria-label": `SonIA ${state}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap,
      height,
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes ${kf}{0%,100%{transform:scaleY(.18)}50%{transform:scaleY(.95)}}`), delays.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: barWidth,
      height: '100%',
      borderRadius: 2,
      background: color,
      transformOrigin: 'center',
      transform: animate ? undefined : 'scaleY(0.14)',
      animation: animate ? `${kf} ${speed}s var(--ease) ${d}s infinite` : 'none'
    }
  })));
}
Object.assign(__ds_scope, { Waveform });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Waveform.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field with a cyan focus ring. Mono variant for data entry
 * (timestamps, BPM). Quiet borders that lift on focus.
 */
function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  mono = false,
  disabled = false,
  invalid = false,
  iconLeft = null,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = {
    sm: 32,
    md: 40,
    lg: 46
  }[size] || 40;
  const ringColor = invalid ? 'var(--safe-block)' : 'var(--accent-micro)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      height: h,
      padding: '0 12px',
      background: 'var(--bg-base)',
      border: '1px solid',
      borderColor: invalid ? 'var(--safe-block)' : focus ? ringColor : 'var(--border)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: focus ? `0 0 0 3px color-mix(in srgb, ${ringColor} 22%, transparent)` : 'none',
      transition: 'border-color var(--dur-micro) var(--ease), box-shadow var(--dur-micro) var(--ease)',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)',
      flex: 'none'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'var(--text-primary)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
      fontSize: 'var(--type-body)',
      letterSpacing: mono ? 'var(--tracking-data)' : 'normal'
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — native select styled to match Input, with a cyan focus ring
 * and a custom chevron.
 */
function Select({
  value,
  onChange,
  options = [],
  disabled = false,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = {
    sm: 32,
    md: 40,
    lg: 46
  }[size] || 40;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      height: h,
      background: 'var(--bg-base)',
      border: '1px solid',
      borderColor: focus ? 'var(--accent-micro)' : 'var(--border)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: focus ? '0 0 0 3px color-mix(in srgb, var(--accent-micro) 22%, transparent)' : 'none',
      transition: 'border-color var(--dur-micro) var(--ease), box-shadow var(--dur-micro) var(--ease)',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-body)',
      height: '100%',
      padding: '0 34px 0 12px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: '100%'
    }
  }, rest), options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lbl = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val,
      style: {
        background: 'var(--bg-elevated)',
        color: 'var(--text-primary)'
      }
    }, lbl);
  })), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "var(--text-muted)",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: 11,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sonia-app/AppShell.jsx
try { (() => {
/* SonIA — App shell. Left rail (SonIA + brief history), center canvas
   (Brief → Shortlist → Aligner), right context panel (track detail).
   Holds the view state for the whole kit. */
(function () {
  const {
    Waveform,
    MoodChip,
    SafetyBadge,
    MatchRing,
    IconButton
  } = window.SonIADesignSystem_4b5948;
  function RailItem({
    item,
    onClick
  }) {
    const [hover, setHover] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        textAlign: 'left',
        width: '100%',
        padding: '10px 12px',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: item.active ? 'var(--border-strong)' : 'transparent',
        background: item.active ? 'var(--bg-elevated)' : hover ? 'var(--hover-overlay)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 500,
        color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, item.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, item.meta));
  }
  function ContextPanel({
    track
  }) {
    if (!track) return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-6)',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
        fontSize: 13
      }
    }, "Select a track to see its detail.");
    const Row = ({
      k,
      v,
      mono
    }) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
        fontSize: 13,
        color: 'var(--text-primary)',
        letterSpacing: mono ? '.02em' : 'normal'
      }
    }, v));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-5)',
        overflow: 'auto'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'center',
        marginBottom: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-sm)',
        background: 'var(--spectrum)',
        border: '1px solid var(--border)',
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--text-primary)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, track.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-secondary)',
        marginTop: 2
      }
    }, track.artist))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(SafetyBadge, {
      state: track.safety
    }), /*#__PURE__*/React.createElement(MatchRing, {
      value: track.match,
      size: 48,
      stroke: 4
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        margin: '8px 0'
      }
    }, "Mood"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-2)',
        flexWrap: 'wrap',
        marginBottom: 'var(--space-4)'
      }
    }, track.moods.map((m, i) => /*#__PURE__*/React.createElement(MoodChip, {
      key: i,
      mood: m
    }, m))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        margin: '8px 0'
      }
    }, "Metadata"), /*#__PURE__*/React.createElement(Row, {
      k: "Duration",
      v: track.duration,
      mono: true
    }), /*#__PURE__*/React.createElement(Row, {
      k: "BPM",
      v: track.bpm,
      mono: true
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Language",
      v: track.language,
      mono: true
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Window",
      v: track.windowLabel,
      mono: true
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Match",
      v: track.match,
      mono: true
    }));
  }
  function AppShell({
    data
  }) {
    const [view, setView] = React.useState('brief'); // brief | shortlist | aligner
    const [selected, setSelected] = React.useState(data.tracks[0]);
    const tabState = view === 'brief' ? 'listening' : view === 'aligner' ? 'speaking' : 'thinking';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '232px 1fr 288px',
        height: '100vh',
        background: 'var(--bg-base)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)'
      }
    }, /*#__PURE__*/React.createElement("aside", {
      style: {
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: 'var(--space-5) var(--space-5) var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(Waveform, {
      state: tabState,
      height: 24,
      bars: 6
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: '-.02em'
      }
    }, "Son", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent-action)'
      }
    }, "IA"))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setView('brief'),
      style: {
        margin: '0 var(--space-4) var(--space-4)',
        height: 36,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 3v10M3 8h10"
    })), "New brief"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        padding: '0 var(--space-5) var(--space-2)'
      }
    }, "History"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto',
        padding: '0 var(--space-3)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minHeight: 0
      }
    }, data.history.map(h => /*#__PURE__*/React.createElement(RailItem, {
      key: h.id,
      item: h,
      onClick: () => setView('shortlist')
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-4) var(--space-5)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 26,
        height: 26,
        borderRadius: '50%',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-strong)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--text-secondary)'
      }
    }, "M. Rossi"))), /*#__PURE__*/React.createElement("main", {
      style: {
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }
    }, view === 'brief' && /*#__PURE__*/React.createElement(window.BriefComposer, {
      brief: data.brief,
      onRun: () => setView('shortlist')
    }), view === 'shortlist' && /*#__PURE__*/React.createElement(window.Shortlist, {
      brief: data.brief,
      tracks: data.tracks,
      onOpen: t => {
        setSelected(t);
        setView('aligner');
      },
      onBackToBrief: () => setView('brief')
    }), view === 'aligner' && /*#__PURE__*/React.createElement(window.SectionAligner, {
      track: selected,
      onBack: () => setView('shortlist')
    })), /*#__PURE__*/React.createElement("aside", {
      style: {
        borderLeft: '1px solid var(--border)',
        minHeight: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        padding: 'var(--space-5) var(--space-5) 0'
      }
    }, "Track detail"), /*#__PURE__*/React.createElement(ContextPanel, {
      track: view === 'brief' ? null : selected
    })));
  }
  window.AppShell = AppShell;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sonia-app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sonia-app/BriefComposer.jsx
try { (() => {
/* SonIA — Brief composer. The entry point: the supervisor describes a scene,
   SonIA returns a structured interpretation as editable chips. */
(function () {
  const {
    Waveform,
    MoodChip,
    Button
  } = window.SonIADesignSystem_4b5948;
  function BriefComposer({
    brief,
    onRun
  }) {
    const [text, setText] = React.useState(brief.raw);
    const [interpreted, setInterpreted] = React.useState(true);
    const empty = text.trim().length === 0;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-12)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        maxWidth: 680
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement(Waveform, {
      state: interpreted ? 'speaking' : 'listening',
      height: 26,
      bars: 6
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, "SonIA \xB7 brief composer")), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 34,
        letterSpacing: '-.02em',
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: 1.1
      }
    }, "Describe the scene."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        color: 'var(--text-secondary)',
        marginTop: 'var(--space-3)',
        lineHeight: 1.5
      }
    }, "Mood, energy, duration, language \u2014 SonIA does the rest."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-6)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement("textarea", {
      value: text,
      onChange: e => {
        setText(e.target.value);
        setInterpreted(false);
      },
      placeholder: "A late-night rooftop, two friends reconcile after a long silence\u2026",
      style: {
        width: '100%',
        minHeight: 92,
        resize: 'vertical',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        lineHeight: 1.55
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'var(--space-3)',
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)'
      }
    }, empty ? 'awaiting brief' : interpreted ? 'interpreted' : 'edited · re-interpret'), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-2)'
      }
    }, !interpreted && !empty && /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: () => setInterpreted(true)
    }, "Interpret"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      disabled: empty,
      onClick: onRun
    }, "Find tracks")))), empty ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-6)',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        color: 'var(--text-muted)',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-8)'
      }
    }, "Describe the scene. Mood, energy, duration, language: SonIA does the rest.") : interpreted && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 'var(--space-3)'
      }
    }, "SonIA's reading \u2014 edit any chip"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-2)',
        flexWrap: 'wrap'
      }
    }, brief.facets.map((f, i) => /*#__PURE__*/React.createElement(MoodChip, {
      key: i,
      mood: f.mood,
      removable: true,
      onRemove: () => {}
    }, f.label)), /*#__PURE__*/React.createElement("button", {
      style: {
        height: 26,
        padding: '0 10px',
        borderRadius: 'var(--radius-sm)',
        border: '1px dashed var(--border-strong)',
        background: 'transparent',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        cursor: 'pointer'
      }
    }, "+ add facet")))));
  }
  window.BriefComposer = BriefComposer;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sonia-app/BriefComposer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sonia-app/SectionAligner.jsx
try { (() => {
/* SonIA — Section Aligner (HERO). Overlays the emotional curve (filled with
   the spectrum gradient) with time-synced lyrics, and brackets the optimal
   ~30s window. Hover scrubber reads instant × intensity × current line. */
(function () {
  const {
    Waveform,
    SafetyBadge,
    MatchRing,
    Button
  } = window.SonIADesignSystem_4b5948;
  function fmt(sec) {
    const m = Math.floor(sec / 60),
      s = Math.round(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  function intensityWord(v) {
    if (v < 0.25) return 'calm';
    if (v < 0.45) return 'mellow';
    if (v < 0.65) return 'warm';
    if (v < 0.82) return 'energetic';
    return 'intense';
  }
  function SectionAligner({
    track,
    onBack
  }) {
    const W = 1000,
      H = 280,
      padL = 16,
      padR = 16,
      top = 18,
      bottom = 38;
    const plotW = W - padL - padR,
      plotH = H - top - bottom;
    const [hoverX, setHoverX] = React.useState(null);
    const svgRef = React.useRef(null);
    const c = track.curve;
    const n = c.length;
    const xAt = frac => padL + frac * plotW;
    const fracAt = i => i / (n - 1);
    const yAt = v => top + (1 - v) * plotH;

    // area path
    let line = '';
    c.forEach((v, i) => {
      line += `${i === 0 ? 'M' : 'L'}${xAt(fracAt(i)).toFixed(1)},${yAt(v).toFixed(1)} `;
    });
    const area = `${line} L${xAt(1).toFixed(1)},${yAt(0).toFixed(1)} L${xAt(0).toFixed(1)},${yAt(0).toFixed(1)} Z`;
    const win = track.window;
    const winX0 = xAt(win[0]),
      winX1 = xAt(win[1]);
    function onMove(e) {
      const rect = svgRef.current.getBoundingClientRect();
      const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setHoverX(frac);
    }
    // value at fraction (interp)
    function valAt(frac) {
      const idx = frac * (n - 1);
      const lo = Math.floor(idx),
        hi = Math.min(n - 1, lo + 1);
      const t = idx - lo;
      return c[lo] * (1 - t) + c[hi] * t;
    }
    const hoverSec = hoverX != null ? hoverX * track.durSec : null;
    const hoverVal = hoverX != null ? valAt(hoverX) : null;
    const hoverLine = hoverX != null ? [...track.lyrics].reverse().find(l => l.t <= hoverX) : null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-5) var(--space-6)',
        borderBottom: '1px solid var(--border)'
      }
    }, onBack && /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        background: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-secondary)',
        width: 34,
        height: 34,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      "aria-label": "Back to shortlist"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M10 3L5 8l5 5"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 'var(--radius-sm)',
        background: 'var(--spectrum)',
        border: '1px solid var(--border)',
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 22,
        letterSpacing: '-.01em',
        color: 'var(--text-primary)'
      }
    }, track.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-secondary)',
        marginTop: 3,
        letterSpacing: '.02em'
      }
    }, track.artist, " \xB7 ", track.duration, " \xB7 ", track.language, " \xB7 ", track.bpm, " BPM")), /*#__PURE__*/React.createElement(SafetyBadge, {
      state: track.safety
    }), /*#__PURE__*/React.createElement(MatchRing, {
      value: track.match,
      size: 52,
      stroke: 5
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: 'var(--space-6)',
        overflow: 'auto',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, "Section Aligner \xB7 lyric \xD7 emotion"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 6,
        borderRadius: 3,
        background: 'var(--spectrum)'
      }
    }), " emotional curve (Cyanite)")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      ref: svgRef,
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      style: {
        display: 'block',
        overflow: 'visible'
      },
      onMouseMove: onMove,
      onMouseLeave: () => setHoverX(null)
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "specV",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "#F0386B"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "22%",
      stopColor: "#FF6A2C"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "48%",
      stopColor: "#FACC15"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "74%",
      stopColor: "#2DD4BF"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "#4C6EF5"
    })), /*#__PURE__*/React.createElement("clipPath", {
      id: "areaClip"
    }, /*#__PURE__*/React.createElement("path", {
      d: area
    }))), [0.25, 0.5, 0.75].map(g => /*#__PURE__*/React.createElement("line", {
      key: g,
      x1: padL,
      y1: yAt(g),
      x2: W - padR,
      y2: yAt(g),
      stroke: "var(--border)",
      strokeWidth: "1",
      strokeDasharray: "2 4"
    })), /*#__PURE__*/React.createElement("g", {
      clipPath: "url(#areaClip)"
    }, /*#__PURE__*/React.createElement("rect", {
      x: padL,
      y: top,
      width: plotW,
      height: plotH,
      fill: "url(#specV)",
      opacity: "0.85"
    })), /*#__PURE__*/React.createElement("path", {
      d: line,
      fill: "none",
      stroke: "#F4F5F7",
      strokeWidth: "1.5",
      strokeOpacity: "0.5",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("rect", {
      x: winX0,
      y: top - 6,
      width: winX1 - winX0,
      height: plotH + 12,
      fill: "rgba(255,106,44,0.10)"
    }), /*#__PURE__*/React.createElement("line", {
      x1: winX0,
      y1: top - 6,
      x2: winX0,
      y2: top + plotH + 6,
      stroke: "var(--accent-action)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: winX1,
      y1: top - 6,
      x2: winX1,
      y2: top + plotH + 6,
      stroke: "var(--accent-action)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: winX0,
      y1: top - 6,
      x2: winX1,
      y2: top - 6,
      stroke: "var(--accent-action)",
      strokeWidth: "2"
    }), track.lyrics.map((l, i) => /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: xAt(l.t),
      y1: top,
      x2: xAt(l.t),
      y2: top + plotH,
      stroke: "var(--accent-micro)",
      strokeWidth: "1",
      strokeOpacity: "0.45"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: xAt(l.t),
      cy: yAt(valAt(l.t)),
      r: "3.5",
      fill: "#14161B",
      stroke: "var(--accent-micro)",
      strokeWidth: "1.5"
    }))), /*#__PURE__*/React.createElement("line", {
      x1: padL,
      y1: top + plotH,
      x2: W - padR,
      y2: top + plotH,
      stroke: "var(--border-strong)",
      strokeWidth: "1"
    }), [0, 0.25, 0.5, 0.75, 1].map(f => /*#__PURE__*/React.createElement("text", {
      key: f,
      x: xAt(f),
      y: H - 14,
      fill: "var(--text-muted)",
      fontFamily: "var(--font-mono)",
      fontSize: "11",
      textAnchor: f === 0 ? 'start' : f === 1 ? 'end' : 'middle'
    }, fmt(f * track.durSec))), hoverX != null && /*#__PURE__*/React.createElement("line", {
      x1: xAt(hoverX),
      y1: top - 6,
      x2: xAt(hoverX),
      y2: top + plotH,
      stroke: "#F4F5F7",
      strokeWidth: "1",
      strokeOpacity: "0.7"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: `calc(${(win[0] + win[1]) / 2 * 100}% - 60px)`,
        top: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--accent-action)',
        background: 'var(--bg-base)',
        padding: '2px 8px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--accent-action)',
        pointerEvents: 'none'
      }
    }, track.windowLabel), hoverX != null && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: `calc(${hoverX * 100}% )`,
        top: 0,
        transform: 'translateX(8px)',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-sm)',
        padding: '8px 10px',
        pointerEvents: 'none',
        boxShadow: 'var(--shadow-pop)',
        minWidth: 150
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-primary)'
      }
    }, fmt(hoverSec), " \xB7 ", Math.round(hoverVal * 100), "%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--accent-micro)',
        textTransform: 'uppercase',
        letterSpacing: '.08em',
        marginTop: 2
      }
    }, intensityWord(hoverVal)), hoverLine && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        color: 'var(--text-secondary)',
        marginTop: 6,
        maxWidth: 200
      }
    }, "\"", hoverLine.text, "\""))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-4)',
        marginTop: 'var(--space-6)',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 'none',
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement(Waveform, {
      state: "speaking",
      height: 28,
      bars: 6
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-pill)',
        padding: '12px 18px',
        maxWidth: 640
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        lineHeight: 1.55,
        color: 'var(--text-primary)'
      }
    }, track.rationale))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-3)',
        marginTop: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement("svg", {
        width: "15",
        height: "15",
        viewBox: "0 0 16 16",
        fill: "currentColor"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M5 3.5v9l7-4.5z"
      }))
    }, "Play window \xB7 ", track.windowLabel), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary"
    }, "Export cue sheet"), /*#__PURE__*/React.createElement(Button, {
      variant: "tertiary"
    }, "Adjust window"))));
  }
  window.SectionAligner = SectionAligner;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sonia-app/SectionAligner.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sonia-app/Shortlist.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SonIA — Shortlist. Results sorted by match score. Structured brief chips at
   top (editable), quick filters, and the list of track cards. */
(function () {
  const {
    TrackCard,
    MoodChip,
    Button,
    IconButton
  } = window.SonIADesignSystem_4b5948;
  function Shortlist({
    brief,
    tracks,
    onOpen,
    onBackToBrief
  }) {
    const [filter, setFilter] = React.useState('all');
    const filtered = tracks.filter(t => filter === 'all' || (filter === 'clear' ? t.safety === 'clear' : t.moods.includes(filter)));
    const sorted = [...filtered].sort((a, b) => b.match - a.match);
    const Filter = ({
      id,
      children
    }) => /*#__PURE__*/React.createElement("button", {
      onClick: () => setFilter(id),
      style: {
        height: 28,
        padding: '0 12px',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: filter === id ? 'var(--accent-micro)' : 'var(--border)',
        background: filter === id ? 'var(--accent-micro-dim)' : 'transparent',
        color: filter === id ? 'var(--accent-micro)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 500
      }
    }, children);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-5) var(--space-6)',
        borderBottom: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, "Brief"), /*#__PURE__*/React.createElement(Button, {
      variant: "tertiary",
      size: "sm",
      onClick: onBackToBrief
    }, "Edit brief")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-2)',
        flexWrap: 'wrap'
      }
    }, brief.facets.map((f, i) => /*#__PURE__*/React.createElement(MoodChip, {
      key: i,
      mood: f.mood
    }, f.label)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4) var(--space-6)',
        borderBottom: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 18,
        color: 'var(--text-primary)'
      }
    }, sorted.length, " tracks ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-muted)',
        fontWeight: 400
      }
    }, "\xB7 sorted by match")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-2)'
      }
    }, /*#__PURE__*/React.createElement(Filter, {
      id: "all"
    }, "All"), /*#__PURE__*/React.createElement(Filter, {
      id: "clear"
    }, "Clear only"), /*#__PURE__*/React.createElement(Filter, {
      id: "mellow"
    }, "Mellow"), /*#__PURE__*/React.createElement(Filter, {
      id: "energetic"
    }, "Energetic"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        minHeight: 0
      }
    }, sorted.map(t => /*#__PURE__*/React.createElement(TrackCard, _extends({
      key: t.id
    }, t, {
      onOpen: () => onOpen(t)
    })))));
  }
  window.Shortlist = Shortlist;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sonia-app/Shortlist.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sonia-app/data.js
try { (() => {
/* SonIA — UI kit mock data. Jury-facing: EN labels, multilingual real-ish data.
   Every visual derives from this data ("il dato è la decorazione"). */
window.SONIA_DATA = function () {
  // Normalized emotional curves (0–1 arousal/intensity), ~48 samples each.
  function curve(seed, peakAt, width) {
    const n = 48,
      out = [];
    for (let i = 0; i < n; i++) {
      const x = i / (n - 1);
      const base = 0.18 + 0.12 * Math.sin(x * 7 + seed) + 0.06 * Math.sin(x * 19 + seed * 2);
      const peak = Math.exp(-Math.pow((x - peakAt) / width, 2)) * 0.72;
      out.push(Math.max(0.05, Math.min(0.98, base + peak)));
    }
    return out;
  }
  const tracks = [{
    id: 't1',
    title: 'Glass Veins',
    artist: 'HÖRT',
    duration: '3:24',
    durSec: 204,
    language: 'EN',
    bpm: 128,
    match: 92,
    safety: 'clear',
    moods: ['mellow', 'warm', 'energetic'],
    curve: curve(1.2, 0.52, 0.13),
    window: [0.46, 0.62],
    windowLabel: '01:34–02:04',
    rationale: 'The chorus lifts from mellow to energetic exactly at 01:34 — the lyric "we break into light" lands on the emotional peak.',
    lyrics: [{
      t: 0.18,
      text: 'Slow morning, holding the line'
    }, {
      t: 0.34,
      text: 'Counting the quiet in twos'
    }, {
      t: 0.47,
      text: 'We break into light'
    }, {
      t: 0.55,
      text: 'Everything moving at once'
    }, {
      t: 0.70,
      text: 'Then the room goes still again'
    }]
  }, {
    id: 't2',
    title: 'Marea Bassa',
    artist: 'Nadia Conti',
    duration: '4:02',
    durSec: 242,
    language: 'IT',
    bpm: 96,
    match: 84,
    safety: 'clear',
    moods: ['calm', 'mellow'],
    curve: curve(3.7, 0.66, 0.16),
    window: [0.60, 0.76],
    windowLabel: '02:25–02:55',
    rationale: 'Stays calm through the verse, then a restrained swell at 02:25 — fits a reflective, unhurried scene.',
    lyrics: [{
      t: 0.2,
      text: 'La marea si ritira piano'
    }, {
      t: 0.45,
      text: 'Lascia il sale sulle mani'
    }, {
      t: 0.64,
      text: 'Torno dove non sapevo'
    }, {
      t: 0.82,
      text: 'E resta solo il mare'
    }]
  }, {
    id: 't3',
    title: 'Static Bloom',
    artist: 'VELD',
    duration: '2:58',
    durSec: 178,
    language: 'EN',
    bpm: 140,
    match: 77,
    safety: 'review',
    moods: ['energetic', 'intense'],
    curve: curve(0.4, 0.40, 0.11),
    window: [0.34, 0.50],
    windowLabel: '01:01–01:31',
    rationale: 'High arousal throughout; the 01:01 drop is the most intense window. One lyric line flagged for review.',
    lyrics: [{
      t: 0.15,
      text: 'Wired to the floor again'
    }, {
      t: 0.37,
      text: 'Burn it down, start over'
    }, {
      t: 0.52,
      text: 'Nothing left to hold'
    }, {
      t: 0.74,
      text: 'Static where the bloom was'
    }]
  }, {
    id: 't4',
    title: 'Hojas Secas',
    artist: 'Lumen Bajo',
    duration: '3:41',
    durSec: 221,
    language: 'ES',
    bpm: 110,
    match: 71,
    safety: 'clear',
    moods: ['warm', 'mellow'],
    curve: curve(2.1, 0.58, 0.15),
    window: [0.52, 0.68],
    windowLabel: '01:55–02:25',
    rationale: 'Warm mid-section with an organic build; a good neutral-positive bed under dialogue.',
    lyrics: [{
      t: 0.22,
      text: 'Hojas secas en la acera'
    }, {
      t: 0.5,
      text: 'El sol baja despacio'
    }, {
      t: 0.66,
      text: 'Todo vuelve a empezar'
    }, {
      t: 0.85,
      text: 'Y la tarde se deshace'
    }]
  }, {
    id: 't5',
    title: 'Cathode',
    artist: 'Mira Okonkwo',
    duration: '5:10',
    durSec: 310,
    language: 'EN',
    bpm: 118,
    match: 63,
    safety: 'block',
    moods: ['intense', 'energetic'],
    curve: curve(4.9, 0.30, 0.10),
    window: [0.24, 0.40],
    windowLabel: '01:14–01:44',
    rationale: 'Strong early peak but blocked: master rights unavailable for sync in this territory.',
    lyrics: [{
      t: 0.12,
      text: 'Glow against the dark'
    }, {
      t: 0.31,
      text: 'Hold the current steady'
    }, {
      t: 0.58,
      text: 'Until the filament gives'
    }, {
      t: 0.8,
      text: 'And the screen goes white'
    }]
  }];
  const brief = {
    raw: 'Late-night city rooftop, two friends reconcile after a long silence. Bittersweet turning hopeful. Around 30 seconds, building toward the end. English or Italian, nothing explicit.',
    facets: [{
      key: 'mood',
      label: 'bittersweet → hopeful',
      mood: 'mellow'
    }, {
      key: 'energy',
      label: 'energy: building',
      mood: 'warm'
    }, {
      key: 'duration',
      label: '~30s window',
      mood: 'calm'
    }, {
      key: 'language',
      label: 'EN / IT',
      mood: 'calm'
    }, {
      key: 'safety',
      label: 'no explicit',
      mood: 'calm'
    }]
  };
  const history = [{
    id: 'h1',
    title: 'Rooftop reconcile',
    meta: '5 results · just now',
    active: true
  }, {
    id: 'h2',
    title: 'Chase, neon, no vocals',
    meta: '12 results · 2h ago'
  }, {
    id: 'h3',
    title: 'Closing credits, warm',
    meta: '8 results · yesterday'
  }, {
    id: 'h4',
    title: 'Product film, minimal',
    meta: '6 results · Mon'
  }];
  return {
    tracks,
    brief,
    history
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sonia-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.MatchRing = __ds_scope.MatchRing;

__ds_ns.MoodChip = __ds_scope.MoodChip;

__ds_ns.SafetyBadge = __ds_scope.SafetyBadge;

__ds_ns.TrackCard = __ds_scope.TrackCard;

__ds_ns.Waveform = __ds_scope.Waveform;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

})();
