type Node = { x: number; y: number; r: number; delay: number };
type Edge = { from: Node; to: Node; delay: number };

const WIDTH = 1200;
const HEIGHT = 800;
const NODE_COUNT = 26;
const MAX_EDGE_DIST = 220;
const MAX_EDGES_PER_NODE = 3;

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

function buildField(): { nodes: Node[]; edges: Edge[] } {
  const rand = mulberry32(1337);
  const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: rand() * WIDTH,
    y: rand() * HEIGHT,
    r: 2 + rand() * 2.2,
    delay: (i * 0.37) % 5,
  }));

  const edges: Edge[] = [];
  const edgeCounts = new Array(nodes.length).fill(0);

  for (let i = 0; i < nodes.length; i++) {
    const distances = nodes
      .map((n, j) => ({ j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
      .filter(({ j, d }) => j !== i && d < MAX_EDGE_DIST)
      .sort((a, b) => a.d - b.d);

    for (const { j } of distances) {
      if (edgeCounts[i] >= MAX_EDGES_PER_NODE) break;
      if (edgeCounts[j] >= MAX_EDGES_PER_NODE) continue;
      if (edges.some((e) => e.from === nodes[i] && e.to === nodes[j])) continue;
      edges.push({ from: nodes[i], to: nodes[j], delay: (i + j) % 6 });
      edgeCounts[i]++;
      edgeCounts[j]++;
    }
  }

  return { nodes, edges };
}

const { nodes, edges } = buildField();

export function SystemsField() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-accent"
    >
      <defs>
        <radialGradient id="fieldFade" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fieldMask">
          <rect width={WIDTH} height={HEIGHT} fill="url(#fieldFade)" />
        </mask>
      </defs>
      <g mask="url(#fieldMask)" stroke="currentColor" fill="currentColor">
        {edges.map((edge, i) => (
          <line
            key={i}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            strokeWidth={1}
            className="field-edge"
            style={{ animationDelay: `${edge.delay * 0.4}s` }}
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            className="field-node"
            style={{ animationDelay: `${node.delay}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
