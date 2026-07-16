// Portadas cinematográficas del Campus con Nano Banana Pro (Replicate).
// Paleta BG: navy-charcoal profundo (#0f1521) + luz mint/teal (#00e6a0).
// Tema: comercio exterior / aduanas / logística. Sin personas, caras, texto ni logos.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const TOKEN = readFileSync("/root/bg-group/.env.local", "utf8")
  .split("\n")
  .find((l) => l.startsWith("REPLICATE_API_TOKEN"))
  .split("=")[1]
  .trim()
  .replace(/^["']|["']$/g, "");

const OUT = "/root/bg-group/public/campus";
mkdirSync(OUT, { recursive: true });

const base =
  "realistic professional stock photograph, natural daylight, true-to-life colors, clean and modern, " +
  "sharp focus, documentary style, corporate and understated, no people, no faces, " +
  "no text, no logos, no watermark, not stylized, no heavy color grade";

const jobs = [
  {
    name: "comercio-exterior-cover",
    ar: "16:9",
    prompt:
      "Wide daytime photograph of a real container shipping port terminal, neatly stacked cargo " +
      "containers, gantry cranes, calm overcast sky, professional and orderly, " + base,
  },
  {
    name: "bms-manifestacion-valor",
    ar: "16:9",
    prompt:
      "A tidy modern office desk in daytime with a desktop monitor showing an abstract data table, " +
      "a neat stack of invoices and folders beside the keyboard, natural window daylight, " +
      "shallow depth of field, clean corporate still life, no readable text on the screen, " + base,
  },
];

async function gen(job) {
  const res = await fetch(
    "https://api.replicate.com/v1/models/google/nano-banana-pro/predictions",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", Prefer: "wait" },
      body: JSON.stringify({
        input: { prompt: job.prompt, aspect_ratio: job.ar, resolution: "2K", output_format: "jpg" },
      }),
    },
  );
  const data = await res.json();
  if (data.error || !data.output) {
    console.error(job.name, "ERROR", JSON.stringify(data).slice(0, 300));
    return;
  }
  const url = Array.isArray(data.output) ? data.output[0] : data.output;
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  writeFileSync(`${OUT}/${job.name}.jpg`, buf);
  console.log("OK", job.name, (buf.length / 1024).toFixed(0) + "kb");
}

for (const job of jobs) await gen(job);
console.log("done");
