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
    <title>Lease Agreement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            width: 80%;
            max-width: 800px;
           
            padding: 20px;
            margin-top: 30px;
            
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .signature {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
        }
        .signature div {
            text-align: center;
            width: 45%;
        }
        .signature p {
            border-top: 1px solid #000;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Lease Agreement</h2>
            <p>This Lease Agreement is made and entered into as of <strong>[Date]</strong> by and between:</p>
        </div>

        <h4>1. Parties</h4>
        <p><strong>Landlord:</strong> [Landlord Name], residing at [Landlord Address]</p>
        <p><strong>Tenant:</strong> [Tenant Name], residing at [Tenant Address]</p>

        <h4>2. Property</h4>
        <p>The property subject to this lease is located at <strong>[Property Address]</strong>.</p>

        <h4>3. Lease Type</h4>
        <p>The lease can be either:</p>
        <ul>
            <li>Fixed Lease: Starting from <strong>[Start Date]</strong> and ending on <strong>[End Date]</strong>.</li>
            <li>Month-to-Month Lease: Starting from <strong>[Start Date]</strong> with termination upon written notice.</li>
        </ul>

        <h4>4. Rent Payment</h4>
        <p>The Tenant agrees to pay a monthly rent of <strong>$[Rent Amount]</strong>, due on the first day of each month.</p>
        <p>Late fees apply at <strong>[Late Fee Percentage]</strong>% per day for overdue payments.</p>

        <h4>5. Security Deposit</h4>
        <p>The Tenant shall provide a security deposit of <strong>$[Deposit Amount]</strong> before moving in.</p>
        <p>The deposit will be returned within <strong>[Return Period]</strong> days after termination, minus any deductions for damages.</p>

        <h4>6. Use of Property</h4>
        <p>The Property shall only be used for residential purposes. No illegal activities or subleasing without written consent.</p>

        <h4>7. Utilities & Maintenance</h4>
        <p>The Tenant is responsible for utilities: <strong>[Utilities List]</strong>. The Landlord will cover <strong>[Covered Utilities]</strong>.</p>

        <h4>8. Alterations & Repairs</h4>
        <p>The Tenant shall not make any structural changes without the Landlord’s written approval.</p>

        <h4>9. Access & Right of Entry</h4>
        <p>The Landlord may enter the premises with <strong>[Notice Period]</strong> notice for inspections, repairs, or emergencies.</p>

        <h4>10. Pets & Smoking</h4>
        <p>Pets (  ) Allowed (  ) Not Allowed. If allowed, pet deposit: <strong>$[Pet Deposit]</strong>.</p>
        <p>Smoking inside the premises is (  ) Allowed (  ) Prohibited.</p>

        <h4>11. Termination & Early Exit</h4>
        <p>Either party may terminate with <strong>[Notice Period]</strong> written notice. Early termination fee: <strong>$[Fee Amount]</strong>.</p>

        <h4>12. Governing Law</h4>
        <p>This lease shall be governed by the laws of <strong>[State/Country]</strong>.</p>

        <div class="signature">
            <div>
                <p>Landlord Signature</p>
            </div>
            <div>
                <p>Tenant Signature</p>
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