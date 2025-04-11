"use client";

import axios from "axios";
import dynamic from "next/dynamic";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function Home() {
  const editor = useRef(null);
  const [ScopeOFWork, setScopeOFWork] = useState("<ul><li>Facebook</li><li>Instagram</li><li>Youtube</li><li>Pintrest</li></ul>");


  const [formData, setFormData] = useState({
    issuedDate: "2025-02-07",
    BrandName: "Brand Name",
    Influencer: "John Deo",

    Payment: "$3000",
    Compensation: "Yes / No",
    Exclusivity: "Yes / No",
    Termination: "3",
    BRDate: "2025-02-07",
    BRName: "Robin H.",
    IDate: "2025-02-07",
  });
  const [pdfUrl, setPdfUrl] = useState("");
  const config = {
    buttons: ["bold", "italic", "underline", "ul", "ol", "fontsize"],
    toolbarAdaptive: false, // Keeps the toolbar fixed
    showXPathInStatusbar: false,
    // Hides unnecessary UI elements
  };
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
        <p><strong>Date:</strong> <span id="date"><strong>${formData.issuedDate}</strong></span></p>
        <p><strong>Parties:</strong></p>
        <p>Brand:<strong>${formData.BrandName}</strong></p>
        <p>Influencer:<strong> ${formData.Influencer}</strong></p>
        
        <h3>1. Scope of Work</h3>
        <p>The Influencer agrees to create and share content promoting the Brand’s products/services on the following platforms:</p>
       <p>${ScopeOFWork}</p>
        
        <h3>2. Compensation</h3>
        <p>The Brand agrees to compensate the Influencer as follows:</p>
        <p>Monetary Payment:<strong>${formData.Payment}</strong></p>
        <p>Product/Service Compensation:<strong> ${formData.Compensation}</strong></p>
        
        <h3>3. Content Guidelines</h3>
        <p>The Influencer agrees to:</p>
        <ul>
            <li>Adhere to the Brand’s content and messaging guidelines.</li>
            <li>Disclose sponsorships per FTC regulations.</li>
            <li>Provide content revisions if requested.</li>
        </ul>
        
        <h3>4. Exclusivity</h3>
        <p>The Influencer agrees <strong> ${formData.Exclusivity}</strong> to exclusivity during the campaign period.</p>
        
        <h3>5. Termination</h3>
        <p>Either party may terminate the agreement with <strong>${formData.Termination} days</strong> written notice.</p>
        
        <h3>6. Confidentiality</h3>
        <p>Both parties agree to keep confidential information private and not disclose it without consent.</p>
        
        <h3>7. Signatures</h3>
        <div class="signature">
            <div>
                <p>Brand Representative</p>
                <p><strong>${formData.BRName}</strong></p>
                <p>Date: <strong>${formData.BRDate}</strong></p>
            </div>
            <div>
                <p>Influencer</p>
                <p><strong>${formData.Influencer}</strong></p>
                <p>Date: <strong>${formData.IDate}</strong></p>
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

return <iframe ref={iframeRef} title="HTML Preview" className="h-full min-h-[600px]" />;  };

  return (
    <>
       <div className="flex lg:m-10 m-3 rounded-xl overflow-hidden shadow-md lg:flex-row flex-col gap-y-10">
        {/* Editing Section */}
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 lg:max-h-[800px] max-h-fit flex-col lg:w-5/12 lg:order-1 order-2  w-full bg-[#d7dbd8]">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Issued Date</label>
          <input
            type="date"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            placeholder="Enter Issued Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Brand Name</label>
          <input
            type="text"
            name="BrandName"
            value={formData.BrandName}
            onChange={handleChange}
            placeholder="Enter Brand Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Influencer Name</label>
          <input
            type="text"
            name="Influencer"
            value={formData.Influencer}
            onChange={handleChange}
            placeholder="Enter Influencer Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Scope Of Work</label>

          <JoditEditor
            key={ScopeOFWork} // This forces the editor to re-initialize when content changes
            ref={editor}
            value={ScopeOFWork}
            config={config}
            onBlur={(newContent) => setScopeOFWork(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Total Payment</label>
          <input
            type="text"
            name="Payment"
            value={formData.Payment}
            onChange={handleChange}
            placeholder="Enter Payment"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Compensation</label>
          <input
            type="text" name="Compensation"

            value={formData.Compensation}
            onChange={handleChange}
            placeholder="Enter Compensation"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Exclusivity</label>
          <input
            type="text" name="Exclusivity"

            value={formData.Exclusivity}
            onChange={handleChange}
            placeholder="Enter Exclusivity"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Termination Notice Period (in days)</label>
          <input
            type="text" name="Termination"

            value={formData.Termination}
            onChange={handleChange}
            placeholder="3"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Brand Representative's Name</label>
          <input
            type="text" name="BRName"
            value={formData.BRName}
            onChange={handleChange}
            placeholder="Enter Brand Representative"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Brand Signature Date</label>
          <input
            type="date" name="BRDate"
            value={formData.BRDate}
            onChange={handleChange}
            placeholder="Enter Brand Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Influencer Signature Date</label>
          <input
            type="date" name="IDate"
            value={formData.IDate}
            onChange={handleChange}
            placeholder="Enter Influencer Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />

          <button
            onClick={handleGeneratePDF}
            className="py-4 bg-[#5d17eb] text-white placeholder:text-white px-4 rounded shadow-md hover:bg-[#5d17eb] transition-colors duration-300"
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
        <div className="lg:p-10 p-4  flex gap-y-5 flex-col lg:w-7/12  lg:order-2 order-1   w-full bg-[#bfc7c1]">
          {/* <div dangerouslySetInnerHTML={{ __html: rawHtml }} /> */}
          <HtmlPreview rawHtml={rawHtml()} />
        </div>

      </div>


    </>
  );
}