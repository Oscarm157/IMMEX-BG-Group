// Genera la imagen de banda propia del servicio legal-consulting (NAR-327).
// Mismo grade cinematográfico desaturado que el resto del sitio (gen-missing-images.mjs),
// pero el sujeto es la materia legal: sala de tribunal vacía, no el cruce fronterizo.
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

const job = {
  name: "legal-defense",
  ar: "16:9",
  prompt:
    "Wide cinematic photograph of an empty federal courtroom interior at night, " +
    "tall stone columns, rows of empty dark wooden benches receding into shadow, " +
    "a single warm light source raking across the room, long shadows, fog of dust in the beam, " +
    "deep blacks, solemn institutional architecture, " +
    base,
};

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
  process.exit(1);
}
const url = Array.isArray(data.output) ? data.output[0] : data.output;
const img = await fetch(url);
const buf = Buffer.from(await img.arrayBuffer());
writeFileSync(`${OUT}/${job.name}.webp`, buf);
console.log(`OK ${job.name} -> ${buf.length} bytes`);
