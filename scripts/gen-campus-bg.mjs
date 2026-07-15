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
  "cinematic editorial photograph, dark moody atmosphere, deep navy charcoal blue tones (#0f1521), " +
  "a single cool teal-green accent light (#00e6a0) glowing subtly, high contrast, deep blacks, " +
  "volumetric fog, subtle film grain, anamorphic, vast negative space, no people, no faces, " +
  "no text, no logos, no watermark, premium and restrained";

const jobs = [
  {
    name: "comercio-exterior-cover",
    ar: "16:9",
    prompt:
      "Wide cinematic aerial view of a vast container shipping port terminal at blue hour, " +
      "endless stacked cargo containers in deep navy shadow, cranes silhouetted, a few teal-green " +
      "dock lights glowing through mist, calm and monumental, " + base,
  },
  {
    name: "immex",
    ar: "16:9",
    prompt:
      "Cinematic interior of a vast dark modern logistics warehouse at night, rows of shelving " +
      "vanishing into shadow, a single shaft of cool teal light raking across the floor, haze, " +
      "monumental emptiness, " + base,
  },
  {
    name: "reglas-de-origen",
    ar: "16:9",
    prompt:
      "Cinematic night photograph of an empty border trade highway crossing, long exposure light " +
      "trails in cool teal, overhead gantry structures, deep navy sky, industrial and quiet, fog, " + base,
  },
  {
    name: "pedimento",
    ar: "16:9",
    prompt:
      "Abstract cinematic macro of stacked official paperwork and ledgers on a dark desk, shallow " +
      "depth of field, a single teal edge light catching the paper edges, deep shadow, editorial " +
      "still life, no readable text, " + base,
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
