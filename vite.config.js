import { resolve } from "node:path";
import { readdirSync } from "node:fs";
import { defineConfig } from "vite";

const journalInputs = Object.fromEntries(
  readdirSync("journal")
    .filter((file) => file.endsWith(".html"))
    .map((file) => [`journal-${file.replace(".html", "")}`, resolve("journal", file)])
);

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        services: resolve("services.html"),
        pricing: resolve("pricing.html"),
        firstVisit: resolve("first-visit.html"),
        prenatalMassage: resolve("prenatal-massage.html"),
        lymphaticMassage: resolve("lymphatic-massage.html"),
        headacheJawMassage: resolve("headache-jaw-massage.html"),
        sensitiveBodyMassage: resolve("sensitive-body-massage.html"),
        careStandards: resolve("care-standards.html"),
        privacyIntake: resolve("privacy-intake.html"),
        journal: resolve("journal.html"),
        ...journalInputs
      }
    }
  }
});
