// Genera las imágenes del sitio con Replicate (FLUX 1.1 pro).
// Uso: node --env-file=.env.local scripts/gen-images.mjs
// Art direction fija: dark navy #0a0e15 + mint #00e6a0 como única luz. Cero texto, cero gente, cero stock.
import fs from "node:fs/promises";
import path from "node:path";

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error("Falta REPLICATE_API_TOKEN (corre con: node --env-file=.env.local scripts/gen-images.mjs)");
  process.exit(1);
}

const MODEL = "black-forest-labs/flux-1.1-pro";
const OUT_DIR = path.resolve("public/img/gen");

const AD =
  "Strictly NO text, NO words, NO letters, NO logos, NO people, NO stock photography. " +
  "Deep navy near-black background (#0a0e15), single mint-green accent light (#00e6a0) as the only color. " +
  "Cinematic, premium, dark technical data-visualization aesthetic, high detail, subtle film grain.";

const JOBS = [
  {
    name: "corridor",
    aspect_ratio: "3:2",
    prompt:
      "Abstract dark topographic satellite map of a cross-border region between two coastal cities, " +
      "thin glowing mint-green contour lines, two bright mint nodes connected by a single luminous route line crossing a border, " +
      "faint technical data grid overlay, depth and atmosphere. " +
      AD,
  },
  {
    name: "corridor-wide",
    aspect_ratio: "16:9",
    prompt:
      "Ultra-wide abstract dark cartographic data render of a trade corridor, glowing mint route lines and scattered node points over deep navy terrain, " +
      "topographic contours fading into darkness, cinematic horizon. " +
      AD,
  },
  {
    name: "core",
    aspect_ratio: "1:1",
    prompt:
      "Abstract translucent crystalline monolith floating in a pure near-black void, soft mint-green subsurface glow, " +
      "refractive iridescent edges, faint floating particle sparks, premium studio 3D render, sense of a system core. " +
      AD,
  },
  {
    name: "field",
    aspect_ratio: "3:2",
    prompt:
      "Abstract dark data field: scattered glowing mint-green plotted points connected by thin lines over deep navy, " +
      "subtle topographic contour hints, a flowing waveform band of light, hand-plotted technical chart feel. " +
      AD,
  },
  {
    name: "rings",
    aspect_ratio: "4:3",
    prompt:
      "Abstract glowing core: concentric mint-green rings and faint data streams orbiting a dark crystalline center in a deep navy void, " +
      "precise, engineered, premium 3D render. " +
      AD,
  },
];

async function generate(job) {
  const res = await fetch(`https://api.replicate.com/v1/models/${MODEL}/predictions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      Prefer: "wait",
    },
    body: JSON.stringify({
      input: {
        prompt: job.prompt,
        aspect_ratio: job.aspect_ratio,
        output_format: "webp",
        output_quality: 90,
        safety_tolerance: 2,
        prompt_upsampling: true,
      },
    }),
  });
  let data = await res.json();
  if (!res.ok) throw new Error(`${job.name}: ${res.status} ${JSON.stringify(data)}`);

  // Si Prefer:wait no alcanzó a terminar, hacer polling
  let tries = 0;
  while (data.status && data.status !== "succeeded" && data.status !== "failed" && tries < 60) {
    await new Promise((r) => setTimeout(r, 2000));
    const g = await fetch(data.urls.get, { headers: { Authorization: `Bearer ${TOKEN}` } });
    data = await g.json();
    tries++;
  }
  if (data.status === "failed") throw new Error(`${job.name}: prediction failed ${JSON.stringify(data.error)}`);

  const url = Array.isArray(data.output) ? data.output[0] : data.output;
  if (!url) throw new Error(`${job.name}: sin output ${JSON.stringify(data)}`);

  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  const file = path.join(OUT_DIR, `${job.name}.webp`);
  await fs.writeFile(file, buf);
  console.log(`✓ ${job.name} -> ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
}

await fs.mkdir(OUT_DIR, { recursive: true });
const only = process.argv.slice(2);
const jobs = only.length ? JOBS.filter((j) => only.includes(j.name)) : JOBS;
for (const job of jobs) {
  try {
    await generate(job);
  } catch (e) {
    console.error("✗", e.message);
  }
}
console.log("Listo.");
