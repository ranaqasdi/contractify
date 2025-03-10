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
    <title>Non-Disclosure and Confidentiality Agreement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 40px;
            background-color:white;
        }
        h1, h2 {
            text-align: center;
        }
        p {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>Non-Disclosure and Confidentiality Agreement</h1>
    <p>This Non-Disclosure and Confidentiality Agreement (the “Agreement”) is entered into <strong>__________________</strong> (the “Effective Date”) by and between <strong>____________________</strong> (“[NAME]”) located at <strong>_______________________________</strong> and <strong>____________________</strong> (“[NAME]”) located at <strong>_________________________</strong>, also individually referred to as the “Party”, and collectively the “Parties”.</p>
    
    <p>The Parties are interested in exploring a potential business opportunity (the “Opportunity”). In order to adequately evaluate whether the Parties would like to pursue the Opportunity, it is necessary for both Parties to exchange certain confidential information.</p>
    
    <h2>1. Confidential Information</h2>
    <p>The confidential information (“Confidential Information”) includes any information that is only known by the disclosing Party and not known by the general public at the time it is disclosed.</p>
    <p>Confidential Information does not include information that:</p>
    <ul>
        <li>The receiving Party lawfully gained before the disclosing Party actually disclosed it.</li>
        <li>Is disclosed to the receiving Party by a third party who is not bound by a confidentiality agreement.</li>
        <li>Becomes available to the general public by no fault of the receiving Party.</li>
        <li>Is required by law to be disclosed.</li>
    </ul>
    
    <h2>2. Use of Confidential Information</h2>
    <p>During the course of this Agreement, the Parties will have access to each others’ Confidential Information. The Parties will not share or use this proprietary information for personal or business benefit.</p>
    <p>The receiving Party may disclose the Confidential Information to its personnel on an as-needed basis. The personnel must be informed that the Confidential Information is confidential and must agree to be bound by the terms of this Agreement.</p>
    
    <h2>3. Ownership and Title</h2>
    <p>Nothing in this Agreement will convey a right, title, interest, or license in the Confidential Information to the receiving party. The Confidential Information will remain the exclusive property of the disclosing party.</p>
    
    <h2>4. Return of Confidential Information</h2>
    <p>Upon termination of this Agreement, the receiving party must return all tangible materials containing Confidential Information, including electronic and hard copies.</p>
    
    <h2>5. Term and Termination</h2>
    <p>This Agreement shall commence upon the Effective Date and continue until <strong>__________________</strong>.</p>
    <p>Either Party may end this Agreement at any time by providing written notice to the other Party. The obligation to maintain confidentiality remains in effect indefinitely.</p>
    
    <h2>6. Remedies</h2>
    <p>The Parties agree that money damages will not adequately remedy the breach of this Agreement. The injured Party is entitled to seek injunctive relief.</p>
    
    <h2>7. Relationship of the Parties</h2>
    <p>The Parties are independent contractors and are not in an agent, representative, partner, or employee relationship.</p>
    <p>No Binding Agreement to Pursue Opportunity. Sharing Confidential Information does not create a legal obligation to pursue the Opportunity.</p>
    <p>No Exclusivity. The Parties are free to enter into similar agreements with other parties.</p>
    
    <h2>8. General</h2>
    <ul>
        <li><strong>Assignment:</strong> The Parties may not assign their rights and obligations under this Agreement.</li>
        <li><strong>Choice of Law:</strong> This Agreement will be interpreted based on the laws of the State of <strong>____________________</strong>.</li>
        <li><strong>Complete Contract:</strong> This Agreement supersedes any other written or verbal communications.</li>
        <li><strong>Severability:</strong> If any provision is deemed invalid, the remainder shall continue in full force.</li>
        <li><strong>Waiver:</strong> No provision of this Agreement can be waived unless agreed to in writing.</li>
    </ul>
    
    <h2>9. Notices</h2>
    <p>All notices under this Agreement must be sent by email with return receipt requested or certified mail.</p>
    
    <h2>10. Signatures</h2>
    <p><strong>Name:</strong> ___________________________</p>
    <p><strong>Date:</strong> ___________________________</p>
    <br>
    <p><strong>Name:</strong> ___________________________</p>
    <p><strong>Date:</strong> ___________________________</p>
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