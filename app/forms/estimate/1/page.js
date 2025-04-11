"use client";

import axios from "axios";
import dynamic from "next/dynamic";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


export default function Home() {
  const editor = useRef(null);
  const [Disclaimer, setDisclaimer] = useState("ASHA’s good faith estimate template is only a model. It does not dictate which services should or should not be listed on the estimate and does not imply medical necessity. Not all procedures, billing codes, or other pertinent information are included in the model. See ASHA's website for important information on this template.");
  const [Welcome, setWelcome] = useState("Thank you for choosing UNL Barkley Speech-Language and Hearing Clinic for your speech-language pathology needs. As a self-pay patient, you are entitled to a good faith estimate which outlines the potential costs associated with your evaluation and treatment in our office.");
  const [Financial, setFinancial] = useState("By signing this document, you acknowledge that you have received and understand your financial responsibilities to this practice if you choose to receive services.<br>If you would like to seek reimbursement from your health insurance, we can provide a superbill at the end of your visit(s). Please note that our rates may be different from your insurance reimbursement rate, and reimbursement rates could be lower. We recommend that you check with your insurance provider for rates and coverage of services.");
  const [Provider, setProvider] = useState("This good faith estimate lists services that will be furnished at UNL Barkley Speech-Language and Hearing Clinic and applies to all providers in this practice, including the initiating provider: [Provider Name, Credentials, NPI, Tax ID].");
  const [Primary , setPrimary ] = useState("<p><strong>Primary Diagnosis:</strong> ________________________</p><p><strong>ICD-10 Code:</strong> ________________________</p><p><strong>Secondary Diagnosis (if applicable):</strong> ________________________</p> <p><strong>ICD-10 Code:</strong> ________________________</p>");
  


  const [formData, setFormData] = useState({
    TemplateFor: "Pathology Services",
    InformationHeading: "Patient Information",
    Name: "John Deo",
    Date: "2025-02-07",
    Services: "Description of Services",
    Signature:"Mark Rivero",
    Dated:"2025-02-07"

  });


  const config = {
    buttons: ["bold", "italic", "underline", "ul", "ol", "fontsize"],
    toolbarAdaptive: false, // Keeps the toolbar fixed
    showXPathInStatusbar: false, 
    // Hides unnecessary UI elements
  };


  
  const [lineItems, setLineItems] = useState([{ code: "",description: "", cost :""  }]);
  const handleAddRow = () => {
    setLineItems([...lineItems, { code: "", description: "", cost :"" }]);
  };
  const handleRemoveRow = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;  // Extract name and value correctly
    const updatedItems = [...lineItems];
    updatedItems[index][name] = value;  
    setLineItems(updatedItems);
  };

  
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
        body {zoom:0.8;
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
    <h1>Estimate For ${formData.TemplateFor}</h1>
    <p><strong>Disclaimer:</strong> ${Disclaimer}</p>
    
    <h2>Welcome</h2>
    <p>${Welcome}</p>
    
    <h2>${formData.InformationHeading}</h2>
    <p><strong>Name: </strong>${formData.Name}</p>
    <p><strong>Date: </strong>${formData.Date}</p>
    
    <h2>${formData.Services}</h2>
    ${Primary}
    
    <h2>Expected Services</h2>
    <table>
        <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Cost ($)</th>
        </tr>
      ${lineItems
        .map(
          (item) => `<tr>
                <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.code}</td>
                <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.description}</td>
                <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.code}</td>
            </tr>`
        )
        .join("")}
    </table>
    
  
    
    <h2>Provider Information</h2>
    ${Provider}
    
    <h2>Financial Acknowledgment</h2>
   ${Financial}
    
    <div class="signature">
        <p><strong>Signature:</strong> <u>${formData.Signature}</u></p>
        <p><strong>Date:</strong> <u>${formData.Dated}</u></p>
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

  return (
    <>
       <div className="flex lg:m-10 m-3 rounded-xl overflow-hidden shadow-md lg:flex-row flex-col gap-y-10">
        {/* Editing Section */}
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 lg:max-h-[800px] max-h-fit flex-col lg:w-5/12 lg:order-1 order-2  w-full bg-[#d7dbd8]">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Template Name</label>
          <input
            type="text"
            name="TemplateFor"
            value={formData.TemplateFor}
            onChange={handleChange}
            placeholder="Estimate Report For?"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Disclaimer Content</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Disclaimer}
            onBlur={(newContent) => setDisclaimer(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Welcome Content</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Welcome}
            onBlur={(newContent) => setWelcome(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Heading</label>
          <input
            type="text"
            name="InformationHeading"
            value={formData.InformationHeading}
            onChange={handleChange}
            placeholder="Enter Heading"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Your Full Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Date</label>
          <input
            type="Date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            placeholder="Select Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Heading</label>
          <input
            type="Text"
            name="Services"
            value={formData.Services}
            onChange={handleChange}
            placeholder="Heading"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">List Of Service Given</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Primary}
            onBlur={(newContent) => setPrimary(newContent)}
          />
           <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Estimation Table</label>
          {lineItems.map((item, index) => (
            <div key={index} className="flex-col flex gap-2 mb-2 gap-x-2">
              <input
                type="text"
                name="code"
                value={item.code}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Code"
                className="py-2 px-4 border rounded"
              />
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Description"
                className="py-2 px-4 border rounded"
              />
              <input
                type="text"
                name="cost"
                value={item.cost}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Cost"
                className="py-2 px-4 border rounded"
              />
              {lineItems.length > 1 && (
                <button
                  onClick={() => handleRemoveRow(index)}
                  className="py-2 px-4 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddRow}
            className="py-2 px-4 bg-green-500 text-white rounded mt-2"
          >
            Add Row
          </button>
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Set Provider Information</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Provider}
            onBlur={(newContent) => setProvider(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Financial Content Can Edit Here</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Financial}
            onBlur={(newContent) => setFinancial(newContent)}
          />
         
         <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Signature</label>
          <input
            type="Text"
            name="Signature"
            value={formData.Signature}
            onChange={handleChange}
            placeholder="Signature"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Date</label>
          <input
            type="Text"
            name="Dated"
            value={formData.Dated}
            onChange={handleChange}
            placeholder="Date"
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