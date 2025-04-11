"use client";

import axios from "axios";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function Home() {
  const editor = useRef(null);
  const [content1, setContent1] = useState("How wages are paid");
  const [content2, setContent2] = useState("Enter Detailed Description of duties");


  const [formData, setFormData] = useState({
    issuedDate: "2025-02-07",
    employerName: "John Deo",
    employeeName: "David Mark",
    JOBTITLE: "Web Developer",
    workingHours: "25",
    salary: "$95 per hour"
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
        body {zoom:0.8;
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
        <p>Between <strong> ${formData.employerName} </strong>(the employer) and <strong>${formData.employeeName}</strong> (the employee).</p>
        
        <p>1. <strong>${formData.employeeName} </strong>is employed as <strong> ${formData.JOBTITLE}</strong>.</p>
        
        <p>2. Description of duties: </p>
        <p>${content2}</p>
        
        <p>3. The employee is employed on a part-time basis.</p>
        
        <p>4. The employee's regular hours of work shall be <strong>${formData.workingHours}</strong> (if the employee has a break in the middle of the day you can list the hours in 2 separate lots, for instance: 7:30 - 11:30 and 1:30 - 4:30. This clarifies that the break is not paid work.)</p>
        
        <p>5. With agreement of both the employer and the employee, additional hours may be worked in excess of these hours and on other days of the week.</p>
        
        <p>6. The employee shall be paid<strong> ${formData.salary}</strong> of work. Lunch breaks shall be unpaid.</p>
        
        <p>7. Additional hours shall be paid at the regular rate of pay unless the employee works for more than 8 hours per day, more than 6 days per week, or more than 44 hours per week. If the employee's working hours exceed any of these limits, then overtime shall be paid in accordance with the rates set in the Employment Act.</p>
        
        <p>8. Wages shall be paid (detail on how wages are paid):</p>
        <p>${content1}</p>
        
        <p>9. VNPF will be paid in accordance with the requirements of the VNPF Act.</p>
        
        <p>10. No paid sick leave or paid annual leave will be provided unless the employee works sufficient days to become 'in continuous employment' for the purposes of the Employment Act. This will require the employee to work for more than 22 days per month for the period of 1 year.</p>
        
        <p>11. No severance allowance will be paid unless the employee works sufficient days to become 'in continuous employment' for the purposes of the Employment Act. This will require the employee to work for 4 or more days per week for 1 year.</p>
        
        <p>12. The contract can be terminated at any time by either party by giving 2 weeks' notice.</p>
        
        <p>13. If an employee is absent for more than 2 days without contacting the employer to explain the absence, then through this action, the employee will be deemed to have resigned and the employment relationship shall cease.</p>
        
        <p>14. The contract can be terminated by the employer immediately in the event of serious misconduct by the employee. Before any such termination, the employer will give the employee an adequate opportunity to answer any charges.</p>
        
        <div class="signature">
            <p>Signed (Employer, Employee) Date <strong>${formData.issuedDate}</strong></p>
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

    return <iframe ref={iframeRef} title="HTML Preview" className="h-full min-h-[600px]" />;
  };

  const config = {
    buttons: ["bold", "italic", "underline", "ul", "ol", "fontsize"],
    toolbarAdaptive: false, // Keeps the toolbar fixed
    showXPathInStatusbar: false, 
    // Hides unnecessary UI elements
  };

  return (
    <>
      <div className=" flex lg:my-16 lg:mx-10 m-3 rounded-xl overflow-hidden shadow-md lg:flex-row flex-col gap-y-10">
        {/* Editing Section */}
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 lg:max-h-[800px] max-h-fit flex-col lg:w-5/12 lg:order-1 order-2  w-full bg-[#d7dbd8]">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Employer's Name</label>

          <input
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            placeholder="Enter Employer's Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Employee's Name</label>

          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder="Enter Employee's Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Job Title</label>

          <input
            type="text"
            name="JOBTITLE"
            value={formData.JOBTITLE}
            onChange={handleChange}
            placeholder="Job Title"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Issued Date</label>

          <input
            type="date"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            placeholder="Enter Issued Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Detailed Description of duties</label>

          <JoditEditor
            key={content2} // This forces the editor to re-initialize when content changes
            ref={editor}
            value={content2}
            config={config}
            onBlur={(newContent) => setContent2(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter working hours</label>

          <input
            type="text" name="workingHours"

            value={formData.workingHours}
            onChange={handleChange}
            placeholder="Enter working hours"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Per Hour Wage</label>

          <input
            type="text" name="salary"

            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter Per Hour Wage"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">How wages are paid?</label>

          <JoditEditor
            ref={editor}
            value={content1}
            config={config}
            onBlur={(newContent) => setContent1(newContent)}
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