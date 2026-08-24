import { motion } from "framer-motion";

// Simple stylized SVG world with glowing connection lines
const cities: { x: number; y: number; name: string }[] = [
  { x: 180, y: 150, name: "SF" },
  { x: 320, y: 140, name: "NYC" },
  { x: 470, y: 170, name: "London" },
  { x: 540, y: 200, name: "Berlin" },
  { x: 640, y: 230, name: "Dubai" },
  { x: 760, y: 230, name: "Bangalore" },
  { x: 860, y: 280, name: "Singapore" },
  { x: 900, y: 240, name: "Tokyo" },
  { x: 280, y: 320, name: "São Paulo" },
  { x: 580, y: 320, name: "Lagos" },
  { x: 880, y: 380, name: "Sydney" },
];

const arcs: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [0, 8], [3, 9], [6, 10], [1, 4], [2, 7],
];

export function WorldMap() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <svg viewBox="0 0 1000 500" className="w-full">
        <defs>
          <radialGradient id="dot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5ee4ff" />
            <stop offset="100%" stopColor="#5ee4ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5ee4ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#b388ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5ee4ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Stylized continent dots */}
        {Array.from({ length: 320 }).map((_, i) => {
          const x = (i * 53) % 1000;
          const y = ((i * 91) % 380) + 60;
          // sparse-mask: keep only a fraction
          if ((i * 7) % 13 > 5) return null;
          return (
            <circle key={i} cx={x} cy={y} r="1.2" fill="oklch(0.6 0.05 250 / 0.5)" />
          );
        })}

        {/* Arcs */}
        {arcs.map(([a, b], i) => {
          const A = cities[a], B = cities[b];
          const mx = (A.x + B.x) / 2;
          const my = Math.min(A.y, B.y) - 90;
          const d = `M ${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`;
          return (
            <g key={i}>
              <path d={d} stroke="url(#arc)" strokeWidth="1.2" fill="none" />
              <motion.circle
                r="3"
                fill="#5ee4ff"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 3.5 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                style={{ offsetPath: `path('${d}')`, filter: "drop-shadow(0 0 6px #5ee4ff)" }}
              />
            </g>
          );
        })}

        {/* Cities */}
        {cities.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r="14" fill="url(#dot)" opacity="0.6" />
            <circle cx={c.x} cy={c.y} r="3" fill="#5ee4ff" />
          </g>
        ))}
      </svg>
    </div>
  );
}
