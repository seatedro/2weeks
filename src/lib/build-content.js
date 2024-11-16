// scripts/build-content.js
import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_DIR = path.join(process.cwd(), "public/content");

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function buildContent() {
  console.log("🚀 NEURAL_TRANSFER_INITIATED...");

  const paths = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const pathName of paths) {
    console.log(`\n[PROCESSING_PATH]: ${pathName}`);
    const pathDir = path.join(CONTENT_DIR, pathName);

    // Copy modules.json
    const modulesFile = path.join(pathDir, "modules.json");
    const modulesOutputPath = path.join(OUTPUT_DIR, pathName, "modules.json");
    ensureDirectoryExists(path.dirname(modulesOutputPath));
    fs.copyFileSync(modulesFile, modulesOutputPath);

    // Read and process each module
    const modules = JSON.parse(fs.readFileSync(modulesFile, "utf8")).modules;

    for (const module of modules) {
      const moduleDir = path.join(pathDir, module.id);
      const moduleOutputDir = path.join(OUTPUT_DIR, pathName, module.id);
      ensureDirectoryExists(moduleOutputDir);

      // Copy module index
      fs.copyFileSync(
        path.join(moduleDir, "index.json"),
        path.join(moduleOutputDir, "index.json"),
      );

      // Copy all concept files
      const conceptsDir = path.join(moduleDir, "concepts");
      const conceptsOutputDir = path.join(moduleOutputDir, "concepts");
      ensureDirectoryExists(conceptsOutputDir);

      const conceptFiles = fs
        .readdirSync(conceptsDir)
        .filter((file) => file.endsWith(".json"));

      for (const conceptFile of conceptFiles) {
        fs.copyFileSync(
          path.join(conceptsDir, conceptFile),
          path.join(conceptsOutputDir, conceptFile),
        );
      }
    }
  }

  console.log("\n✨ NEURAL_TRANSFER_COMPLETE");
  console.log("ALL_PATHWAYS_SYNCHRONIZED");
}

// Run build
buildContent().catch(console.error);
