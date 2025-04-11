"use client";

import axios from "axios";
import dynamic from "next/dynamic";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


export default function Home() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [OBJECTIVE, setOBJECTIVE] = useState("<p>To obtain a part-time position in the field of food and beverage management at a large upscale resort in the Orlando area.</p>");
  const [EDUCATION, setEDUCATION] = useState("<p><strong>University of Central Florida – Rosen College of Hospitality Management, Orlando, FL</strong><br> Bachelor of Science in Hospitality Management<br> Specialization in Restaurant Management<br> GPA 3.9, May 2007</p>");
  const [EXPERIENCE, setEXPERIENCE] = useState(" <p><strong>Guest Relations Coordinator, Buca di Beppo, Orlando, FL</strong> (August 2005-Present)</p><p><strong>Restaurant Supervisor, Orlando Airport Marriott, Orlando, FL</strong> (August 2004-August 2005)</p><ul><li>Increased guest satisfaction scores from 60% to 100% on guest satisfaction surveys.</li><li>Forecasted weekly food and beverage outlets among two restaurants, lounge bar, sports bar, and room service.</li><li>Tracked employee productivity and gained knowledge of basic payroll functions.</li><li>Set standard training procedures for food and beverage outlets and updated weekly inventory reports.</li></ul><p><strong>Sales and Catering Assistant, Gaylord Palms, Kissimmee, FL</strong> (January 2004-August 2004)</p><ul><li>Prepared Banquet Event Order forms for social events and meetings.</li><li>Supported servers and bartenders during periods of heavy guest traffic.</li><li>Oversaw all wait services for the boutique hotel, catering department, and restaurants.</li><li>Assisted with evaluation of monthly estimated budgets ranging from $5,000-$20,000.</li><li>Booked and serviced small meetings and social events alongside the Catering Manager.</li></ul><p><strong>Assistant Chef, Kai Sou Fusion, Winter Springs, FL</strong> (August 2003-December 2003)</p><ul><li>Helped management with menu planning and development.</li>li>Worked to maintain proper levels of ordering and inventory.</li><li>Implemented new techniques in serving and food preparation.</li></ul>");
  const [SKILLS, setSKILLS] = useState(" <ul><li>Proficient with MS Word, Excel, PowerPoint, Access, and Outlook.</li><li>Worked with MICROS Point of Sale System and Navitech Delphi System.</li><li>Certified in ServSafe.</li><li>Fluent in Spanish.</li></ul>");

  const [formData, setFormData] = useState({
    Name: "Charles D. Cook",
    Address: "4000 Central Florida Boulevard Orlando, FL 32816",
    PhoneNo: "407.823.2000",
    EmailAddress: "CharlesD@gmail.ucf.edu"
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
        body {zoom:0.8;
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
    <h1>${formData.Name}</h1>
    <p style="text-align: center;">${formData.Address}<br>
    ${formData.PhoneNo}<br>
    ${formData.EmailAddress}</p>
    
    <div class="section">
        <h2>OBJECTIVE</h2>
        ${OBJECTIVE}
    </div>
    
    <div class="section">
        <h2>EDUCATION</h2>
        ${EDUCATION}
    </div>
    
    <div class="section">
        <h2>WORK EXPERIENCE</h2>
        ${EXPERIENCE}
    </div>
    
    
    <div class="section">
        <h2>SKILLS/CERTIFICATIONS</h2>
        ${SKILLS}
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

return <iframe ref={iframeRef} title="HTML Preview" className="h-full min-h-[600px]" />;  };
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
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Your Full Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Your Address</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Phone Number</label>
          <input
            type="tel"
            name="PhoneNo"
            value={formData.PhoneNo}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Email Address</label>
          <input
            type="email"
            name="EmailAddress"
            value={formData.EmailAddress}
            onChange={handleChange}
            placeholder="Enter Email Address"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Explain Objective of this resume</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={OBJECTIVE}
            onBlur={(newContent) => setOBJECTIVE(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Details About Your Education</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={EDUCATION}
            onBlur={(newContent) => setEDUCATION(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Work Experience Goes Here</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={EXPERIENCE}
            onBlur={(newContent) => setEXPERIENCE(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">List all the skills you have</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={SKILLS}
            onBlur={(newContent) => setSKILLS(newContent)}
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