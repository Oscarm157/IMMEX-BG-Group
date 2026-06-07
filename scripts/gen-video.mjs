// Genera el video del hero con Kling (Replicate). Cinematográfico, a tono BG (no stock, no gente).
// Uso: node --env-file=.env.local scripts/gen-video.mjs
import fs from "node:fs/promises";
import path from "node:path";

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error("Falta REPLICATE_API_TOKEN");
  process.exit(1);
}

const MODEL = "kwaivgi/kling-v1.6-standard";
const OUT = path.resolve("public/video/hero.mp4");

const input = {
  prompt:
    "Cinematic aerial drone shot slowly drifting over a cross-border highway and port terminal at dusk, " +
    "long-exposure streaming headlight and taillight trails along the road, distant illuminated city skyline, " +
    "stacked shipping containers, calm moody atmosphere, deep navy-blue tones with subtle warm amber lights, " +
    "premium cinematic film look, smooth slow camera motion.",
  negative_prompt: "people, faces, text, watermark, logo, distorted, glitch, warped, low quality",
  duration: 5,
  aspect_ratio: "16:9",
  cfg_scale: 0.5,
};

const res = await fetch(`https://api.replicate.com/v1/models/${MODEL}/predictions`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", Prefer: "wait" },
  body: JSON.stringify({ input }),
});
let data = await res.json();
if (!res.ok) {
  console.error("Error inicial:", res.status, JSON.stringify(data));
  process.exit(1);
}

let tries = 0;
while (data.status && data.status !== "succeeded" && data.status !== "failed" && tries < 200) {
  await new Promise((r) => setTimeout(r, 4000));
  const g = await fetch(data.urls.get, { headers: { Authorization: `Bearer ${TOKEN}` } });
  data = await g.json();
  tries++;
  if (tries % 5 === 0) console.log(`...${data.status} (${tries})`);
}
if (data.status !== "succeeded") {
  console.error("Falló:", JSON.stringify(data.error || data.status));
  process.exit(1);
}

const url = Array.isArray(data.output) ? data.output[0] : data.output;
const vid = await fetch(url);
const buf = Buffer.from(await vid.arrayBuffer());
await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, buf);
console.log(`✓ video -> ${OUT} (${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
