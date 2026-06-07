// Genera el video del hero con Kling (Replicate).
// Image-to-video desde la foto real de la garita de Tijuana (public/aduana-tijuana.jpg).
// Uso: node --env-file=.env.local scripts/gen-video.mjs
import fs from "node:fs/promises";
import path from "node:path";

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error("Falta REPLICATE_API_TOKEN");
  process.exit(1);
}

const MODEL = "kwaivgi/kling-v3-video";
const OUT = path.resolve("public/video/hero.mp4");
const START_IMAGE = path.resolve("public/aduana-tijuana.jpg");

const imgBuf = await fs.readFile(START_IMAGE);
const dataUri = `data:image/jpeg;base64,${imgBuf.toString("base64")}`;

const input = {
  start_image: dataUri,
  mode: "pro",
  generate_audio: false,
  prompt:
    "Cinematic aerial hyperlapse over a busy border customs truck crossing: brisk smooth lateral camera drift, cargo trucks and vehicles moving steadily through the inspection lanes, subtle long-exposure light streaks on the road, crisp clear air, the entire crossing stays fully visible. Teal-and-amber cinematic color grade, slight motion blur, premium film look, fine grain. Photorealistic, trucks keep their solid rigid shape.",
  negative_prompt: "deforming trucks, morphing vehicles, warping, melting, rubbery shapes, fog, smoke, heavy clouds, haze covering the scene, white-out, glitch, cartoon, low quality, text",
  duration: 5,
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
