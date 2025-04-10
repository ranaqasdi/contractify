"use client";
import { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";

const HtmlPreview = ({ rawHtml }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(rawHtml);
        doc.close();
      }
    }
  }, [rawHtml]); // Depend on rawHtml to update live preview

  return (
    <iframe
      ref={iframeRef}
      title="HTML Preview"
      className="w-full h-[600px] border rounded-lg bg-white shadow-md"
    />
  );
};

export default function CreateFolder() {
  const [PLACEHOLDERS, setPlaceholders] = useState([]); // Stores dynamic PLACEHOLDERS
  const [formData, setFormData] = useState({}); // Stores input values dynamically
  const [folderName, setFolderName] = useState("");

  const [HTMLCONTENT, setHTMLCONTENT] = useState(`<!-- Write your HTML here -->
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1 { color: red; }
  </style>
  <h1>Hello, Live Preview!</h1>
  <p>This is an interactive HTML preview.</p>
  `);
  const [message, setMessage] = useState("");

  // Function to add a new placeholder field
  const addPlaceholderField = () => {
    setPlaceholders([...PLACEHOLDERS, ""]); // Add a new empty placeholder
  };

  // Function to update placeholder value
  const updatePlaceholder = (index, value) => {
    const updatedPlaceholders = [...PLACEHOLDERS];
    updatedPlaceholders[index] = value;
    setPlaceholders(updatedPlaceholders);

    // Initialize formData for new PLACEHOLDERS
    setFormData((prev) => ({
      ...prev,
      [value]: "",
    }));
  };

  // Handle direct updates from CodeMirror
  const handleHtmlChange = (value) => {
    setHTMLCONTENT(value);
  };

  // Generate the input fields code
  const generatedInputs = PLACEHOLDERS
    .filter((p) => p.trim() !== "")
    .map(
      (p) => `<input
      type="text" 
      name="${p}"
      value={formData.${p}}
      onChange={handleChange}
      placeholder="Enter ${p}"
      className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
    />`
    )
    .join("\n");


      // Function to send data to API
  const handleSubmit = async () => {
    console.log(JSON.stringify({ PLACEHOLDERS, HTMLCONTENT }));
    
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ PLACEHOLDERS, HTMLCONTENT, folderName}),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Success: ${data.message}`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to send data.");
    }
  }



  return (
    <div className="p-6 max-w-[90%] mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dynamic HTML & Input Generator</h2>
      <h3 className="text-lg font-semibold mb-2">Select Folder Name</h3>
      <select
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className="border px-3 py-2 rounded-md w-full mb-4"
      >
        <option value="">Select a folder</option>
        <option value="freelance-contracts">Freelance Contracts</option>
        <option value="nda-forms">NDA Forms</option>
        <option value="web-development">Web Development</option>
        <option value="marketing-assets">Marketing Assets</option>
      </select>
      {/* Placeholder Input Fields */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add Placeholders</h3>
        {PLACEHOLDERS.map((placeholder, index) => (
          <input
            key={index}
            type="text"
            value={placeholder}
            onChange={(e) => updatePlaceholder(index, e.target.value)}
            placeholder={`Enter field name (e.g., lastName)`}
            className="border px-3 py-2 rounded-md w-full mb-2"
          />
        ))}
        <button
          onClick={addPlaceholderField}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-2"
        >
          + Add Placeholder
        </button>

        {/* Show how to use PLACEHOLDERS */}
        {PLACEHOLDERS.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <h4 className="text-md font-semibold">You can use these PLACEHOLDERS:</h4>
            <code className="bg-gray-200 p-2 rounded block mt-2 text-sm">
              {PLACEHOLDERS
                .filter((p) => p.trim() !== "")
                .map((p, index) => `\${placeholders[${index}]}|${p}`)
                .join(", ")}
            </code>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Code Editor for HTML */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">HTML Editor</h3>
          <CodeMirror
            value={HTMLCONTENT}
            height="400px"
            extensions={[html()]}
            theme="dark"
            onChange={handleHtmlChange}
          />
        </div>

        {/* Code Editor for Input Fields */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Generated Input Fields</h3>
          <CodeMirror value={generatedInputs} height="400px" extensions={[html()]} theme="dark" />
        </div>
      </div>

      {/* Live Preview */}
      <div className="border p-4 rounded-lg shadow-md bg-gray-200 mt-4">
        <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
        <HtmlPreview rawHtml={HTMLCONTENT} />
      </div>

      {/* Create Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Save HTML
      </button>

      {/* Response Message */}
      {message && <p className="mt-3 text-gray-800">{message}</p>}
    </div>
  );
}
