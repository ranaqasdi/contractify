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
    <title>Part-Time Employment Contract</title>
    <style>
        body {
        background-color:white;
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
        }
        h2 {
            text-align: center;
            text-decoration: underline;
        }
        .note {
            font-style: italic;
            font-weight: bold;
            color: red;
        }
        .contract {
            border: 1px solid #000;
            padding: 20px;
        }
        .signature {
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <h2>EXAMPLE CONTRACT OF EMPLOYMENT FOR PART TIME EMPLOYEES</h2>
    <p class="note">IMPORTANT NOTE TO EMPLOYERS: Please do not just paste any of these clauses into your employees' work contracts without carefully reviewing them to ensure they meet your needs.</p>
    
    <div class="contract">
        <p>Between _______________________ (the employer) and _______________________ (the employee).</p>
        
        <p>1. _______________________ is employed as <strong>____ (JOB TITLE) ____</strong>.</p>
        
        <p>2. Description of duties: (You may want to include a short description of duties. This is not strictly necessary.)</p>
        
        <p>3. The employee is employed on a part-time basis.</p>
        
        <p>4. The employee's regular hours of work shall be ____________ (if the employee has a break in the middle of the day you can list the hours in 2 separate lots, for instance: 7:30 - 11:30 and 1:30 - 4:30. This clarifies that the break is not paid work.)</p>
        
        <p>5. With agreement of both the employer and the employee, additional hours may be worked in excess of these hours and on other days of the week.</p>
        
        <p>6. The employee shall be paid ____________ per hour of work. Lunch breaks shall be unpaid.</p>
        
        <p>7. Additional hours shall be paid at the regular rate of pay unless the employee works for more than 8 hours per day, more than 6 days per week, or more than 44 hours per week. If the employee's working hours exceed any of these limits, then overtime shall be paid in accordance with the rates set in the Employment Act.</p>
        
        <p>8. Wages shall be paid ____________ (detail on how wages are paid).</p>
        
        <p>9. VNPF will be paid in accordance with the requirements of the VNPF Act.</p>
        
        <p>10. No paid sick leave or paid annual leave will be provided unless the employee works sufficient days to become 'in continuous employment' for the purposes of the Employment Act. This will require the employee to work for more than 22 days per month for the period of 1 year.</p>
        
        <p>11. No severance allowance will be paid unless the employee works sufficient days to become 'in continuous employment' for the purposes of the Employment Act. This will require the employee to work for 4 or more days per week for 1 year.</p>
        
        <p>12. The contract can be terminated at any time by either party by giving 2 weeks' notice.</p>
        
        <p>13. If an employee is absent for more than 2 days without contacting the employer to explain the absence, then through this action, the employee will be deemed to have resigned and the employment relationship shall cease.</p>
        
        <p>14. The contract can be terminated by the employer immediately in the event of serious misconduct by the employee. Before any such termination, the employer will give the employee an adequate opportunity to answer any charges.</p>
        
        <div class="signature">
            <p>Signed (Employer, Employee) Date ____________</p>
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