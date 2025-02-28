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
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            padding: 20px;
          
            border-radius: 5px;
            max-width: 800px;
            background-color: #f9f9f9;
        }
        h1, h2 {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .signature {
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h1>Estimate Template for Pathology Services</h1>
    <p><strong>Disclaimer:</strong> ASHA’s good faith estimate template is only a model. It does not dictate which services should or should not be listed on the estimate and does not imply medical necessity. Not all procedures, billing codes, or other pertinent information are included in the model. See ASHA's website for important information on this template.</p>
    
    <h2>Welcome</h2>
    <p>Thank you for choosing UNL Barkley Speech-Language and Hearing Clinic for your speech-language pathology needs. As a self-pay patient, you are entitled to a good faith estimate which outlines the potential costs associated with your evaluation and treatment in our office.</p>
    
    <h2>Patient Information</h2>
    <p><strong>Patient:</strong> ________________________</p>
    <p><strong>DOB:</strong> ________________________</p>
    
    <h2>Description of Services</h2>
    <p><strong>Primary Diagnosis:</strong> ________________________</p>
    <p><strong>ICD-10 Code:</strong> ________________________</p>
    <p><strong>Secondary Diagnosis (if applicable):</strong> ________________________</p>
    <p><strong>ICD-10 Code:</strong> ________________________</p>
    
    <h2>Expected Services</h2>
    <table>
        <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Cost ($)</th>
        </tr>
        <tr>
            <td>92508</td>
            <td>Speech and language treatment; group</td>
            <td>$20.00</td>
        </tr>
    </table>
    
    <p>Based on your plan of care, you will need up to <strong>[# of visits]</strong> visits this semester. At $20.00 per visit, the estimated total costs are <strong>[# of visits multiplied by $ rate per visit]</strong>.</p>
    
    <h2>Provider Information</h2>
    <p>This good faith estimate lists services that will be furnished at UNL Barkley Speech-Language and Hearing Clinic and applies to all providers in this practice, including the initiating provider: <strong>[Provider Name, Credentials, NPI, Tax ID]</strong>.</p>
    
    <h2>Financial Acknowledgment</h2>
    <p>By signing this document, you acknowledge that you have received and understand your financial responsibilities to this practice if you choose to receive services.</p>
    <p>If you would like to seek reimbursement from your health insurance, we can provide a superbill at the end of your visit(s). Please note that our rates may be different from your insurance reimbursement rate, and reimbursement rates could be lower. We recommend that you check with your insurance provider for rates and coverage of services.</p>
    
    <div class="signature">
        <p><strong>Patient Signature:</strong> ________________________</p>
        <p><strong>Date:</strong> ________________________</p>
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