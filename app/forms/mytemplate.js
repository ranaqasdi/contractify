"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  // Initialize placeholders as an array directly
  const [placeholders, setPlaceholders] = useState({{PLACEHOLDERS}});

  // Function to update placeholder values
  const updatePlaceholder = (index, value) => {
    const updatedPlaceholders = [...placeholders];
    updatedPlaceholders[index] = value;
    setPlaceholders(updatedPlaceholders);
  };

  const [formData, setFormData] = useState({});
  const [pdfUrl, setPdfUrl] = useState("");

  const handleGeneratePDF = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      console.log("Generating PDF");
      const response = await axios.post(
        "https://gold-hawk-364161.hostingersite.com/generate-pdf.php",
        { html: rawHtml() },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      setPdfUrl(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = "document.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const rawHtml = () => {
    return `{{HTMLCONTENT}}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

return <iframe ref={iframeRef} title="HTML Preview" className="h-full min-h-[600px]" />;  };

  return (
    <>
      <div className="flex p-20">
        {/* Editing Section */}
        <div className="overflow-y-auto p-20 flex gap-y-5 max-h-[800px] flex-col w-full bg-slate-200">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>

          {placeholders.map((placeholder, index) => (
            <input
              key={index}
              type="text"
              value={placeholder}
              onChange={(e) => updatePlaceholder(index, e.target.value)}
              placeholder="Enter field name (e.g., lastName)"
              className="border px-3 py-2 rounded-md w-full mb-2"
            />
          ))}

          <button
            onClick={handleGeneratePDF}
            className="py-4 bg-green-600 text-white placeholder:text-white px-4 rounded shadow-md"
          >
            Generate PDF
          </button>

          {pdfUrl && (
            <a href={pdfUrl} download="legal-document.pdf">
              <button className="w-full py-4 bg-slate-600 text-white px-4 rounded shadow-md">
                Download PDF
              </button>
            </a>
          )}
        </div>

        {/* Preview Section */}
        <div className="p-20 overflow-y-scroll max-h-[800px] flex gap-y-5 flex-col w-full bg-green-300">
          <HtmlPreview rawHtml={rawHtml()} />
        </div>
      </div>
    </>
  );
}
