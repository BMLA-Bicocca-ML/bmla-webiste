/**
 * Sfondo esagonale per la hero della Home.
 *
 * Disegna una griglia a nido d'ape in SVG (generata lato server, deterministica)
 * con:
 *  - contorni azzurrini ben visibili
 *  - alcuni esagoni appena colorati
 *  - alcuni esagoni "sollevati" con ombra esterna → effetto 3D
 * La sfumatura verso il bianco è data dalla maschera in fondo al file.
 */

/* --------------------------- PARAMETRI DA RITOCCARE --------------------------- */
const ACCENT = "#009FB7"; // colore del tema
const SHADOW = "#005F70"; // colore dell'ombra degli esagoni sollevati

const HEX_SIZE = 65; // raggio dell'esagono (px): più grande = esagoni più grandi
const STROKE_OPACITY = 0.1; // visibilità dei contorni (0.05 era il vecchio sfondo)
const STROKE_WIDTH = 0.8;

const RAISED_MIN = 0.0; // probabilità di esagono sollevato a sinistra...
const RAISED_MAX = 0.0; // ...e a destra (più a destra = meno sotto al testo)
const TINTED_PROB = 0.35; // probabilità di esagono colorato "piatto"

const SHADOW_OFFSET = 6; // distanza ombra (px)
const SHADOW_BLUR = 10; // sfocatura ombra
const SHADOW_OPACITY = 0.3; // intensità ombra
/* ----------------------------------------------------------------------------- */

const WIDTH = 1920;
const HEIGHT = 720;

// Generatore pseudo-casuale con seed fisso: stesso risultato su server e client
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 90); // pointy-top
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

function buildHexes() {
  const rand = mulberry32(2026);
  const dx = Math.sqrt(3) * HEX_SIZE;
  const dy = 1.5 * HEX_SIZE;

  const outline: string[] = [];
  const tinted: string[] = [];
  const raised: string[] = [];

  const rows = Math.ceil(HEIGHT / dy) + 2;
  const cols = Math.ceil(WIDTH / dx) + 2;

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * dx + (row % 2 === 0 ? 0 : dx / 2);
      const cy = row * dy;
      outline.push(hexPath(cx, cy, HEX_SIZE));

      const p = rand();
      const xRatio = Math.min(1, Math.max(0, cx / WIDTH));
      const raisedProb = RAISED_MIN + (RAISED_MAX - RAISED_MIN) * xRatio;

      if (p < raisedProb) {
        raised.push(hexPath(cx, cy, HEX_SIZE * 0.93));
      } else if (p < raisedProb + TINTED_PROB) {
        tinted.push(hexPath(cx, cy, HEX_SIZE * 0.93));
      }
    }
  }

  return {
    outline: outline.join(""),
    tinted: tinted.join(""),
    raised: raised.join(""),
  };
}

const HEXES = buildHexes();

const FADE_MASK =
  "radial-gradient(ellipse 85% 100% at 50% 0%, black 25%, transparent 100%)";

export function HexBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
    >
      <svg
        className="absolute left-1/2 top-0 -translate-x-1/2"
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hexRaisedFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#E6F7FA" />
          </linearGradient>
          <filter
            id="hexRaisedShadow"
            x="-5%"
            y="-5%"
            width="110%"
            height="115%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy={SHADOW_OFFSET}
              stdDeviation={SHADOW_BLUR}
              floodColor={SHADOW}
              floodOpacity={SHADOW_OPACITY}
            />
          </filter>
        </defs>

        {/* 1. Griglia di contorni */}
        <path
          d={HEXES.outline}
          fill="none"
          stroke={ACCENT}
          strokeOpacity={STROKE_OPACITY}
          strokeWidth={STROKE_WIDTH}
          strokeLinejoin="round"
        />

        {/* 2. Esagoni appena colorati (piatti) */}
        <path d={HEXES.tinted} fill={ACCENT} fillOpacity={0.07} />

        {/* 3. Esagoni sollevati: faccia chiara + ombra esterna */}
        <g filter="url(#hexRaisedShadow)">
          <path
            d={HEXES.raised}
            fill="url(#hexRaisedFace)"
            stroke={ACCENT}
            strokeOpacity={0.5}
            strokeWidth={STROKE_WIDTH}
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
