// Genera la capa gráfica de /serpientes-tijuana con Nano Banana Pro (Replicate).
// Atmósfera: cancha de noche / marcador encendido / vestidor. Negro + dorado + rojo.
// NUNCA caras de jugadores ni fotos fabricadas de personas (guardrail DESIGN.md).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const TOKEN = readFileSync("/root/bg-group/.env.local", "utf8")
  .split("\n")
  .find((l) => l.startsWith("REPLICATE_API_TOKEN"))
  .split("=")[1]
  .trim()
  .replace(/^["']|["']$/g, "");

const OUT = "/root/bg-group/public/serpientes";
mkdirSync(OUT, { recursive: true });

const base =
  "cinematic, dark moody atmosphere, near-monochrome heavily desaturated, deep blacks, " +
  "high contrast, subtle film grain, anamorphic, empty scene, no people, no faces, " +
  "no text, no logos, no watermark";

const jobs = [
  {
    name: "duela-noche",
    ar: "16:9",
    prompt:
      "Wide low-angle cinematic photograph of an empty indoor basketball hardwood court at night, " +
      "polished wood floor with painted lines fading into darkness, a single hard warm spotlight " +
      "raking across the boards, long shadows, faint haze in the air, dramatic negative space, " + base,
  },
  {
    name: "marcador",
    ar: "16:9",
    prompt:
      "Cinematic photograph of a dark empty sports arena, a glowing scoreboard and LED ribbon lights " +
      "far in the background heavily out of focus into warm amber and deep red bokeh, atmospheric fog, " +
      "vast darkness in the foreground, " + base,
  },
  {
    name: "tribuna-humo",
    ar: "16:9",
    prompt:
      "Cinematic photograph of empty dark arena bleacher stands, rows of seats disappearing into shadow, " +
      "one warm sodium light source cutting through drifting smoke and haze, cold silence, " +
      "moody deep blacks with a single amber accent, " + base,
  },
  {
    name: "serpiente-textura",
    ar: "16:9",
    prompt:
      "Abstract macro texture of dark serpent scales, coiled reptile skin in matte black with faint " +
      "metallic gold and deep crimson red highlights catching a single edge light, extreme shallow depth " +
      "of field, sculptural and menacing, editorial studio photograph, " + base,
  },
];

async function gen(job) {
  const res = await fetch(
    "https://api.replicate.com/v1/models/google/nano-banana-pro/predictions",
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
          resolution: "2K",
          output_format: "jpg",
        },
      }),
    }
  );
  const data = await res.json();
  if (data.error || !data.output) {
    console.error(job.name, "ERROR", JSON.stringify(data).slice(0, 300));
    return;
  }
  const url = Array.isArray(data.output) ? data.output[0] : data.output;
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  const path = `${OUT}/${job.name}.jpg`;
  writeFileSync(path, buf);
  console.log("OK", job.name, (buf.length / 1024).toFixed(0) + "kb", url.slice(0, 60));
}

for (const job of jobs) {
  await gen(job);
}
console.log("done");
