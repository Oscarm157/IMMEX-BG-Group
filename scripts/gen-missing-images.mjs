// Genera las 2 imágenes faltantes del sitio BG via Replicate flux-1.1-pro.
// Reusa el patrón de /root/gen-bg-images.mjs (token, base cinematográfico, webp).
import { writeFileSync } from "node:fs";

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error("Falta REPLICATE_API_TOKEN en el entorno.");
  process.exit(1);
}
const OUT = "/root/bg-group/public/img/gen";

const base =
  "near-monochrome heavily desaturated color grade, high contrast, " +
  "subtle film grain, editorial photography, anamorphic, no text, no logos, no people faces";

const jobs = [
  {
    // Banda del detalle de servicio (sección dark): cinematográfica nocturna.
    name: "border-crossing",
    ar: "16:9",
    prompt:
      "Wide cinematic photograph of the Tijuana to San Diego land border crossing at night, " +
      "rows of customs inspection booths glowing, long-exposure red and white light trails of trucks and cars, " +
      "fog, wet asphalt reflections, dark moody atmosphere, a single warm light source, deep blacks, " +
      base,
  },
  {
    // Banda de About (sección clara): luminosa, día, arquitectura, no near-black.
    name: "offices",
    ar: "16:9",
    prompt:
      "Architectural photograph of a modern glass-walled corporate office building exterior on a bright clear day, " +
      "clean minimalist facade, soft natural daylight, calm professional atmosphere, light airy tones, " +
      base,
  },
];

async function gen(job) {
  const res = await fetch(
    "https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        input: {
          prompt: job.prompt,
          aspect_ratio: job.ar,
          output_format: "webp",
          output_quality: 90,
          safety_tolerance: 2,
          prompt_upsampling: true,
        },
      }),
    }
  );
  const data = await res.json();
  if (data.error || !data.output) {
    console.log(`FAIL ${job.name}:`, data.error || JSON.stringify(data).slice(0, 300));
    return;
  }
  const url = Array.isArray(data.output) ? data.output[0] : data.output;
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  writeFileSync(`${OUT}/${job.name}.webp`, buf);
  console.log(`OK ${job.name} -> ${buf.length} bytes`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (let i = 0; i < jobs.length; i++) {
  try {
    await gen(jobs[i]);
  } catch (e) {
    console.log(`ERR ${jobs[i].name}:`, e.message);
  }
  if (i < jobs.length - 1) await sleep(15000);
}
console.log("DONE");
