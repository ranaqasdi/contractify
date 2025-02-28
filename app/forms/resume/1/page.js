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
<html>
<head>
   
    <style>
        body {
        background-color:white;
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
        }
        h1, h2 {
            text-align: center;
        }
        .section {
            margin-bottom: 20px;
        }
        ul {
            list-style-type: square;
        }
    </style>
</head>
<body>
    <h1>Charles D. Cook</h1>
    <p style="text-align: center;">4000 Central Florida Boulevard<br>
    Orlando, FL 32816<br>
    407.823.2000<br>
    CharlesD@gmail.ucf.edu</p>
    
    <div class="section">
        <h2>OBJECTIVE</h2>
        <p>To obtain a part-time position in the field of food and beverage management at a large upscale resort in the Orlando area.</p>
    </div>
    
    <div class="section">
        <h2>EDUCATION</h2>
        <p><strong>University of Central Florida – Rosen College of Hospitality Management, Orlando, FL</strong><br>
        Bachelor of Science in Hospitality Management<br>
        Specialization in Restaurant Management<br>
        GPA 3.9, May 2007</p>
    </div>
    
    <div class="section">
        <h2>WORK EXPERIENCE</h2>
        <p><strong>Guest Relations Coordinator, Buca di Beppo, Orlando, FL</strong> (August 2005-Present)</p>
        <ul>
            <li>Collaborate with management to alleviate client concerns and anticipate any potential issues.</li>
            <li>Organize private and semi-private banquet functions for various weekly events within the restaurant.</li>
            <li>Execute daily management-level responsibilities, with a focus on easing the guest experience.</li>
            <li>Assist with weekly inventory procedures to ensure proper amounts of materials are on hand.</li>
        </ul>
        
        <p><strong>Restaurant Supervisor, Orlando Airport Marriott, Orlando, FL</strong> (August 2004-August 2005)</p>
        <ul>
            <li>Increased guest satisfaction scores from 60% to 100% on guest satisfaction surveys.</li>
            <li>Forecasted weekly food and beverage outlets among two restaurants, lounge bar, sports bar, and room service.</li>
            <li>Tracked employee productivity and gained knowledge of basic payroll functions.</li>
            <li>Set standard training procedures for food and beverage outlets and updated weekly inventory reports.</li>
        </ul>
        
        <p><strong>Sales and Catering Assistant, Gaylord Palms, Kissimmee, FL</strong> (January 2004-August 2004)</p>
        <ul>
            <li>Prepared Banquet Event Order forms for social events and meetings.</li>
            <li>Supported servers and bartenders during periods of heavy guest traffic.</li>
            <li>Oversaw all wait services for the boutique hotel, catering department, and restaurants.</li>
            <li>Assisted with evaluation of monthly estimated budgets ranging from $5,000-$20,000.</li>
            <li>Booked and serviced small meetings and social events alongside the Catering Manager.</li>
        </ul>
        
        <p><strong>Assistant Chef, Kai Sou Fusion, Winter Springs, FL</strong> (August 2003-December 2003)</p>
        <ul>
            <li>Helped management with menu planning and development.</li>
            <li>Worked to maintain proper levels of ordering and inventory.</li>
            <li>Implemented new techniques in serving and food preparation.</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>LEADERSHIP EXPERIENCE</h2>
        <p><strong>Vice President of Finance, Sigma Phi Epsilon Fraternity, University of Central Florida</strong> (May 2005-May 2006)</p>
        <ul>
            <li>Completed analysis of all financial records for fraternal activities.</li>
            <li>Set up budgets for departments and delegated responsibilities.</li>
            <li>Created a sound budget with a savings goal of at least 5% for long-term needs.</li>
            <li>Recruited and trained a successor to ensure proper handling of finances.</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>SKILLS/CERTIFICATIONS</h2>
        <ul>
            <li>Proficient with MS Word, Excel, PowerPoint, Access, and Outlook.</li>
            <li>Worked with MICROS Point of Sale System and Navitech Delphi System.</li>
            <li>Certified in ServSafe.</li>
            <li>Fluent in Spanish.</li>
        </ul>
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