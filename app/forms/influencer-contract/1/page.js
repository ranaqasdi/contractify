"use client";

import axios from "axios";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";


export default function Home() {
  const [formData, setFormData] = useState({
    issuedDate: "2025-02-07",
    DisclosingName: "John Deo",
    DisclosingAddress: "420 S Broad St, Winston-Salem, North Carolina",
    ReceivingName: "David Mark",
    ReceivingAddress: "	86 Route 59, Airmont, New York",
    DISCLOSINGDate: "2025-02-07",
    RECEIVINGDate: "2025-02-07",
  });
  const [pdfUrl, setPdfUrl] = useState("");

  const handleGeneratePDF = async (e) => {
    e.preventDefault();  // Prevents default form behavior
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
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Influencer Collaboration Agreement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
           
            line-height: 1.6;
            color: #333;
        }
        .container {
            
            
            padding: 50px;
           
            
            
            background-color: #fff;
        }
        h2, h3 {
            color: #444;
        }
        .signature {
            margin-top: 40px;
        }
        .signature div {
            display: inline-block;
            width: 45%;
            text-align: center;
        }
        

    </style>
</head>
<body>
    <div class="container">
        <h2>Influencer Collaboration Agreement</h2>
        <p><strong>Date:</strong> <span id="date">__________</span></p>
        <p><strong>Parties:</strong></p>
        <p><strong>Brand:</strong> __________________________</p>
        <p><strong>Influencer:</strong> __________________________</p>
        
        <h3>1. Scope of Work</h3>
        <p>The Influencer agrees to create and share content promoting the Brand’s products/services on the following platforms:</p>
        <ul>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>TikTok</li>
            <li>Other: ______________________</li>
        </ul>
        
        <h3>2. Compensation</h3>
        <p>The Brand agrees to compensate the Influencer as follows:</p>
        <p><strong>Monetary Payment:</strong> $__________</p>
        <p><strong>Product/Service Compensation:</strong> Yes / No</p>
        
        <h3>3. Content Guidelines</h3>
        <p>The Influencer agrees to:</p>
        <ul>
            <li>Adhere to the Brand’s content and messaging guidelines.</li>
            <li>Disclose sponsorships per FTC regulations.</li>
            <li>Provide content revisions if requested.</li>
        </ul>
        
        <h3>4. Exclusivity</h3>
        <p>The Influencer agrees <strong>(Yes / No)</strong> to exclusivity during the campaign period.</p>
        
        <h3>5. Termination</h3>
        <p>Either party may terminate the agreement with <strong>___ days</strong> written notice.</p>
        
        <h3>6. Confidentiality</h3>
        <p>Both parties agree to keep confidential information private and not disclose it without consent.</p>
        
        <h3>7. Signatures</h3>
        <div class="signature">
            <div>
                <p>Brand Representative</p>
                <p>________________________</p>
                <p>Date: __________</p>
            </div>
            <div>
                <p>Influencer</p>
                <p>________________________</p>
                <p>Date: __________</p>
            </div>
        </div>
        
        
    </div>
</body>
</html>`;
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

    return <iframe ref={iframeRef} title="HTML Preview" className="h-full" />;
  };

  return (
    <>
      <div className="flex m-10 rounded-xl overflow-hidden shadow-md">
        {/* Editing Section */}
        <div className="overflow-y-auto p-20  flex gap-y-5 max-h-[800px] flex-col w-full bg-slate-200  ">
          <h2 className="text-2xl font-bold">Edit Legal Document</h2>
          <input
            type="date"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            placeholder="Enter Issued Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            name="DisclosingName"
            value={formData.DisclosingName}
            onChange={handleChange}
            placeholder="Enter Disclosing Party's Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            name="DisclosingAddress"
            value={formData.DisclosingAddress}
            onChange={handleChange}
            placeholder="Enter Disclosing Party's Address"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text"
            name="ReceivingName"
            value={formData.ReceivingName}
            onChange={handleChange}
            placeholder="Enter Receiving Party's Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="text" name="ReceivingAddress"

            value={formData.ReceivingAddress}
            onChange={handleChange}
            placeholder="Enter Receiving Party's Address"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="date" name="DISCLOSINGDate"

            value={formData.DISCLOSINGDate}
            onChange={handleChange}
            placeholder="Enter Disclosing Party Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <input
            type="date" name="RECEIVINGDate"
            value={formData.RECEIVINGDate}
            onChange={handleChange}
            placeholder="Enter Receiving Party Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
         
          <button
            onClick={handleGeneratePDF}
            className="py-4 bg-purple-600 text-white placeholder:text-white px-4 rounded shadow-md hover:bg-purple-700 transition-colors duration-300"
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
        <div className="p-10  flex gap-y-5 flex-col w-full bg-purple-600">
          {/* <div dangerouslySetInnerHTML={{ __html: rawHtml }} /> */}
          <HtmlPreview rawHtml={rawHtml()} />
        </div>

      </div>


    </>
  );
}