"use client";
import { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";

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
  }, [rawHtml]);

  return (
    <iframe
      ref={iframeRef}
      title="HTML Preview"
      className="w-full h-[600px] border rounded-lg bg-white shadow-md"
    />
  );
};

export default function CreateFolder() {
  const [content, setContent] = useState(`<!-- Write your HTML here -->
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1 { color: red; }
  </style>
  <h1>Hello, Live Preview!</h1>
  <p>This is an interactive HTML preview.</p>
  `);
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/create-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Folder Created: ${data.folderName}`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to create folder.");
    }
  };

  return (
    <div className="p-6 max-w-[80%] mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create HTML File</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Editor</h3>
          <CodeMirror
            value={content}
            height="600px"
            extensions={[html()]}
            onChange={(value) => setContent(value)}
            theme="dark"
          />
        </div>

        {/* Iframe Preview */}
        <div className="border p-4 rounded-lg shadow-md bg-gray-200">
          <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
          <HtmlPreview rawHtml={content} />
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={handleCreate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Create Folder & Save File
      </button>

      {/* Response Message */}
      {message && <p className="mt-3 text-gray-800">{message}</p>}
    </div>
  );
}
