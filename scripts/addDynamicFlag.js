// scripts/addDynamicFlag.js
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, ".."); // assume project root
const FLAG_LINE = 'export const dynamic = "force-dynamic";\n\n';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // თუ უკვე არსებობს, ნუ ვამატებთ
  if (content.includes('export const dynamic')) return;

  // ჩასვამთ ფაილის პირველ სტრიქონში
  content = FLAG_LINE + content;
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Updated: ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file === "page.tsx") {
      processFile(fullPath);
    }
  }
}

walkDir(ROOT_DIR);
