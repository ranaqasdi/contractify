import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    // Validate API response
    const data = await req.json();
    if (!data.folderName || typeof data.folderName !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid or missing folder name." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const formsPath = path.join(process.cwd(), "app/forms", data.folderName);

    const templatePath = path.join(process.cwd(), "app/forms/mytemplate.js");

    // Read the template content
    let template = await fs.readFile(templatePath, "utf-8");

    // Parse the request body

    // Validate content
    if (Object.keys(data).length === 0) {
      return new Response(
        JSON.stringify({ error: "At least one placeholder value is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let finalContent = template;

    // Replace HTMLCONTENT
    finalContent = finalContent.replace(/{{HTMLCONTENT}}/g, data.HTMLCONTENT || "");

    // Replace PLACEHOLDERS array
    // Replace PLACEHOLDERS array safely
    if (Array.isArray(data.PLACEHOLDERS)) {
      finalContent = finalContent.replace(
        /{{PLACEHOLDERS}}/g,
        `[${data.PLACEHOLDERS.map(p => `"${p}"`).join(", ")}]` // Convert to valid JS array syntax
      );
    }


    // Get existing folder names
    let existingFolders = await fs.readdir(formsPath);

    // Filter only numeric folder names
    let numbers = existingFolders
      .map((name) => parseInt(name))
      .filter((num) => !isNaN(num))
      .sort((a, b) => a - b);

    // Determine the next folder number
    let nextFolder = numbers.length > 0 ? numbers[numbers.length - 1] + 1 : 1;
    let newFolderPath = path.join(formsPath, nextFolder.toString());

    // Create new folder
    await fs.mkdir(newFolderPath, { recursive: true });

    // Write `page.js` inside the new folder
    await fs.writeFile(path.join(newFolderPath, "page.js"), finalContent, "utf-8");

    return new Response(
      JSON.stringify({ message: `Folder ${nextFolder} created with page.js` }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
