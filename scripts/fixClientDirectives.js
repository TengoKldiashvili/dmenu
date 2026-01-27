import fs from "fs";
import path from "path";

const PROJECT_ROOT = path.join(process.cwd(), "app");

function walkDir(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (entry.isFile() && fullPath.endsWith(".tsx")) {
      callback(fullPath);
    }
  });
}

walkDir(PROJECT_ROOT, (filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");

  const hasUseClient = content.includes('"use client"');
  const hasDynamic = content.includes("export const dynamic");

  content = content
    .replace('"use client";', "")
    .replace(/export const dynamic\s*=\s*["']force-dynamic["'];/, "")
    .trimStart();

  let newContent = "";
  if (hasUseClient) newContent += `"use client";\n`;
  if (hasDynamic) newContent += `export const dynamic = "force-dynamic";\n`;
  newContent += "\n" + content;

  fs.writeFileSync(filePath, newContent, "utf-8");
  console.log(`✅ Fixed: ${filePath}`);
});

console.log("🎉 All client directives fixed!");
