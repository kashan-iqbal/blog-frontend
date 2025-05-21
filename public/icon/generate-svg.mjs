import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name using import.meta.url (this is how you get the current directory in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your SVG folder (update this based on your actual folder structure)
const svgDirectory = path.join(__dirname); // Since SVGs are in the same directory as the script
const exportFile = path.join(__dirname, "svgs.js"); // This is the path where the generated file will be saved

// Read all files from the SVG directory
fs.readdir(svgDirectory, (err, files) => {
  if (err) {
    console.error("Error reading SVG directory", err);
    return;
  }

  // Filter SVG files and map them to import/export statements
  const imports = files
    .filter((file) => file.endsWith(".svg")) // Only process .svg files
    .map((file) => {
      const name = file.replace(".svg", ""); // Remove .svg extension to use as variable name
      return `import ${name} from './${file}';`; // Import statement for each SVG
    });

  const exports = files
    .filter((file) => file.endsWith(".svg")) // Only process .svg files
    .map((file) => file.replace(".svg", "")); // Export each SVG as a variable name

  // Create the content for the generated file
  const content = `
${imports.join("\n")}

export {
  ${exports.join(",\n  ")}
};
`;

  // Write the generated content to svgs.js
  fs.writeFileSync(exportFile, content, "utf-8");
  console.log("SVG imports and exports generated successfully!");
});
