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
    <title>Non-Disclosure Agreement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 40px;
            line-height: 1.6;
            background-color:white;
        }
        h1 {
            text-align: center;
            text-decoration: underline;
        }
        .container {
            max-width: 800px;
            margin: auto;
        }
        .signature-box {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }
        .signature-box div {
            width: 45%;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>NON-DISCLOSURE AGREEMENT</h1>

        <p>
            This Agreement is made and entered by and between <span>_____________________</span> and 
            <span>_____________________</span>. 
            This Agreement is being executed to protect Confidential Information owned by 
            <span>_____________________</span>.
        </p>

        <p>
            <span>_____________________</span> and the Receiving Party do hereby agree, as follows:
        </p>

        <ol>
            <li>Keep all information provided relating to business, marketing plans, discussions, research, design, and any related programs and processes under development in strict confidence.</li>
            <li>Disclose this information only to individuals who have signed a Non-Disclosure Agreement.</li>
            <li>This Agreement shall be in effect for 
                <span>___________</span> from the date of the last disclosure of Confidential and Proprietary Information, at which time it will terminate.
            </li>
        </ol>

        <p>This Agreement may be modified upon written agreement between the Parties.</p>

        <p>Executed as of <span>___________</span></p>

        <div class="signature-box">
            <div>
                <p>_____________________</p>
                <p>Printed Name & Signature (Disclosing Party)</p>
                <p>Address: _____________________</p>
            </div>
            <div>
                <p>_____________________</p>
                <p>Printed Name & Signature (Receiving Party)</p>
                <p>Address: _____________________</p>
            </div>
        </div>

    </div>

</body>
</html>
`;
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