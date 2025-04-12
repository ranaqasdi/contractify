"use client";

import axios from "axios";
import dynamic from "next/dynamic";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


export default function Home() {
  const editor = useRef(null);
  const [SOW, setSOW] = useState(" <ul> <li>Detailed description of the tasks, including deliverables.</li><li>Timeframe and milestones for completion.</li><li>Any additional services that may be required.</li> </ul>")
  const [PaymentTerms, setPaymentTerms] = useState("  <ul><li>Total agreed payment: <strong>$1500</strong> </li><li>Payment method: <strong>PayPal </strong></li><li>Milestone or installment-based payments, if applicable.</li><li>Late payment penalties or interest charges.</li></ul>")


  const [formData, setFormData] = useState({
    issuedDate: "2025-02-07",
    FreelancerName: "John Deo",
    ClientName: "Mark David",
    ProjectName: "Templik Website",
    StartDate: "2025-02-07",
    EndDate: "2025-03-11",
    Revisions: "3",
    Notice: "10",
    Jurisdiction: "California",
  });
  const [pdfUrl, setPdfUrl] = useState("");

  const handleGeneratePDF = async (e) => {
    e.preventDefault();  // Prevents default form behavior
    try {
      console.log("Generating PDF");


      const response = await axios.post(
        "https://violet-stork-183808.hostingersite.com/generate-pdf.php",
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

  const config = {
    buttons: ["bold", "italic", "underline", "ul", "ol", "fontsize"],
    toolbarAdaptive: false, // Keeps the toolbar fixed
    showXPathInStatusbar: false,
    // Hides unnecessary UI elements
  };


  const rawHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Freelance Contract</title>
    <style>
        body {zoom:0.8;
            font-family: Arial, sans-serif;
             background: #fff;
            padding: 60px;
        
        }
       
        h1, h2, h3 {
            color: #333;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        th {
            background: #0073e6;
            color: #fff;
        }
        .signature {
            margin-top: 100px;
            display: flex;
            justify-content: space-between;
        }
        .signature div {
            width: 45%;
            text-align: center;
            border-top: 2px solid #000;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="contract">
        <h1>Freelance Contract</h1>
        <h2>Agreement between Freelancer and Client</h2>
        <p>This agreement ("Agreement") is made and entered into as of <strong>${formData.issuedDate}</strong> by and between:</p>
        <p>Freelancer: <strong>${formData.FreelancerName}</strong>, an independent contractor providing professional services.</p>
        <p>Client: <strong>${formData.ClientName}</strong>, engaging the services of the Freelancer for the purpose of <strong>${formData.ProjectName}</strong>.</p>
        <h3>1. Scope of Work</h3>
        <p>The Freelancer agrees to perform the following services:</p>
       ${SOW}
        <h3>2. Payment Terms</h3>
        <p>The Client agrees to compensate the Freelancer as follows:</p>
       ${PaymentTerms}
        <h3>3. Timeline</h3>
        <p>The project will begin on <strong>${formData.StartDate}</strong> and is expected to be completed by <strong>${formData.EndDate}</strong>. Any delays will be communicated in writing.</p>
        <h3>4. Confidentiality</h3>
        <p>The Freelancer agrees not to disclose, share, or use any proprietary or confidential information obtained during the project for any purpose other than fulfilling the obligations under this Agreement.</p>
        <h3>5. Ownership & Rights</h3>
        <p>Upon full payment, the Client will obtain full ownership and rights to all work produced by the Freelancer. Until full payment is made, all rights remain with the Freelancer.</p>
        <h3>6. Revisions & Modifications</h3>
        <p>The Freelancer will provide up to <strong>${formData.Revisions}</strong> revisions. Additional revisions may incur extra charges.</p>
        <h3>7. Termination</h3>
        <p>Either party may terminate this Agreement with <strong>${formData.Notice}</strong> days' written notice. In case of termination, any completed work must be compensated accordingly.</p>
        <h3>8. Indemnification</h3>
        <p>Both parties agree to indemnify and hold harmless the other from any claims, damages, or legal expenses that arise due to negligence or failure to meet obligations under this Agreement.</p>
        <h3>9. Dispute Resolution</h3>
        <p>Any disputes will be resolved through mediation or arbitration as agreed upon by both parties. If unresolved, legal action may be pursued under the governing law of <strong>${formData.Jurisdiction}</strong>.</p>
        <h3>10. Entire Agreement</h3>
        <p>This Agreement constitutes the entire agreement between the parties and supersedes all prior discussions, communications, and agreements.</p>
        <div class="signature">
            <div>
                Client Signature<br>
                ${formData.ClientName}
            </div>
            <div>
                Freelancer Signature<br>
                ${formData.FreelancerName}
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

return <iframe ref={iframeRef} title="HTML Preview" className="h-full min-h-[600px]" />;  };

  return (
    <>
       <div className=" flex lg:my-16 lg:mx-10 m-5 my-10  rounded-xl overflow-hidden shadow-md lg:flex-row flex-col gap-y-10">
        {/* Editing Section */}
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 lg:max-h-[800px] max-h-fit flex-col lg:w-5/12 lg:order-1 order-2  w-full bg-[#fbfbfb]">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>
          <input
            type="date"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            placeholder="Enter Issued Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <input
            type="text"
            name="FreelancerName"
            value={formData.FreelancerName}
            onChange={handleChange}
            placeholder="Enter Freelancer Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <input
            type="text"
            name="ClientName"
            value={formData.ClientName}
            onChange={handleChange}
            placeholder="Enter Client Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <input
            type="text"
            name="ProjectName"
            value={formData.ProjectName}
            onChange={handleChange}
            placeholder="Enter Project Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />

          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Details About Responsibilities</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={SOW}
            onBlur={(newContent) => setSOW(newContent)}
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Details About Responsibilities</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={PaymentTerms}
            onBlur={(newContent) => setPaymentTerms(newContent)}
          />
          <input
            type="date" name="StartDate"

            value={formData.StartDate}
            onChange={handleChange}
            placeholder="Enter Start Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <input
            type="date" name="EndDate"

            value={formData.EndDate}
            onChange={handleChange}
            placeholder="Enter End Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <input
            type="text" name="Revisions"
            value={formData.Revisions}
            onChange={handleChange}
            placeholder="Enter Number of Revisions"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <input
            type="text" name="Notice"
            value={formData.Notice}
            onChange={handleChange}
            placeholder="Enter Notice Period (days)"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <input
            type="text" name="Jurisdiction"
            value={formData.Jurisdiction}
            onChange={handleChange}
            placeholder="Enter Jurisdiction"
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
        <div className="lg:p-10 p-4  flex gap-y-5 flex-col lg:w-7/12  lg:order-2 order-1   w-full bg-[#f0f0f0]">
          {/* <div dangerouslySetInnerHTML={{ __html: rawHtml }} /> */}
          <HtmlPreview rawHtml={rawHtml()} />
        </div>

      </div>


    </>
  );
}