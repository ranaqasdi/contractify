"use client";

import axios from "axios";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";


export default function Home() {
  const [placeholders, setPlaceholders] = useState([]);
  useEffect(() => {
    try {
      const parsedPlaceholders = JSON.parse('{{PLACEHOLDERS}}');
      setPlaceholders(Array.isArray(parsedPlaceholders) ? parsedPlaceholders : []);
    } catch (error) {
      console.error("Error parsing PLACEHOLDERS:", error);
      setPlaceholders([]); // Fallback to empty array
    }
  }, []);
  const updatePlaceholder = (index, value) => {
    const updatedPlaceholders = [...placeholders];
    updatedPlaceholders[index] = value;
    setPlaceholders(updatedPlaceholders);
  };


  const [formData, setFormData] = useState({
    policyNumber: "",
    issuedDate: "",
    agentName: "",
    firstName: "",
    lastName: "",
    effectiveTime: "",
    expiryTime: "",
    carMake: "",
  });
  const [pdfUrl, setPdfUrl] = useState("");

  const handleGeneratePDF = async (e) => {
    e.preventDefault();  // Prevents default form behavior
    try {
      console.log("Generating PDF");


      const response = await axios.post(
        "https://violet-stork-183808.hostingersite.com/generate-pdf.php",
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
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 lg:max-h-[800px] max-h-fit flex-col lg:w-5/12 lg:order-1 order-2  w-full bg-[#fbfbfb]">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>
          {JSON.parse('{{PLACEHOLDERS}}').map((placeholder, index) => (
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
            onClick={handleGeneratePDF}
            className="py-4 bg-green-600 text-white placeholder:text-white px-4 rounded shadow-md"
          >
            Generate PDF
          </button>
          {pdfUrl && (
            <a href={pdfUrl} download="legal-document.pdf">
              <button
                className=" w-full  py-4 bg-slate-600 text-white placeholder:text-white px-4 rounded shadow-md"
              >
                Download PDF
              </button>
            </a>
          )}
        </div>

        {/* Preview Section */}
        <div className="p-20 overflow-y-scroll lg:max-h-[800px] max-h-fit flex gap-y-5 flex-col w-full bg-green-300">
          {/* <div dangerouslySetInnerHTML={{ __html: rawHtml }} /> */}
          <HtmlPreview rawHtml={rawHtml()} />
        </div>

      </div>


    </>
  );
}