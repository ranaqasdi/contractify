"use client";

import axios from "axios";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";


export default function Home() {
  const [formData, setFormData] = useState({
    issuedDate: "2025-02-07",
    DisclosingName: "John Deo",
    OwnedBy: "XYZ LLC",
    EffectedDate: "2 Months",
    ExecutedAs: "2025-02-07",
    DisclosingAddress: "420 S Broad St, Winston-Salem, North Carolina",
    ReceivingName: "David Mark",
    ReceivingAddress: "86 Route 59, Airmont, New York",
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
        body {zoom:0.8;
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
            This Agreement is made and entered by and between <span>${formData.DisclosingName}</span> and 
            <span>${formData.ReceivingName}</span>. 
            This Agreement is being executed to protect Confidential Information owned by 
            <span>${formData.OwnedBy}</span>.
        </p>

        <p>
            <span>${formData.DisclosingName}</span> and the Receiving Party do hereby agree, as follows:
        </p>

        <ol>
            <li>Keep all information provided relating to business, marketing plans, discussions, research, design, and any related programs and processes under development in strict confidence.</li>
            <li>Disclose this information only to individuals who have signed a Non-Disclosure Agreement.</li>
            <li>This Agreement shall be in effect for 
                <span>${formData.EffectedDate}</span> from the date of the last disclosure of Confidential and Proprietary Information, at which time it will terminate.
            </li>
        </ol>

        <p>This Agreement may be modified upon written agreement between the Parties.</p>

        <p>Executed as of <span>${formData.ExecutedAs}</span></p>

        <div class="signature-box">
            <div>
                <p>${formData.DisclosingName}</p>
                <p>Printed Name & Signature (Disclosing Party)</p>
                <p>Address: ${formData.DisclosingAddress}</p>
            </div>
            <div>
                <p>${formData.ReceivingName}</p>
                <p>Printed Name & Signature (Receiving Party)</p>
                <p>Address: ${formData.ReceivingAddress}</p>
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
       <div className="flex lg:m-10 m-3 rounded-xl overflow-hidden shadow-md lg:flex-row flex-col gap-y-10">
        {/* Editing Section */}
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 lg:max-h-[800px] max-h-fit flex-col lg:w-5/12 lg:order-1 order-2  w-full bg-[#d7dbd8]">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Issued Date</label>

          <input
            type="date"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            placeholder="Enter Issued Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Disclosing Party's Name</label>

          <input
            type="text"
            name="DisclosingName"
            value={formData.DisclosingName}
            onChange={handleChange}
            placeholder="Enter Disclosing Party's Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Name of Owner</label>

          <input
            type="text"
            name="OwnedBy"
            value={formData.OwnedBy}
            onChange={handleChange}
            placeholder="Enter Name of Owner"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Time Frame of Contract</label>
          <input
            type="text"
            name="EffectedDate"
            value={formData.EffectedDate}
            onChange={handleChange}
            placeholder="Enter Time Frame of Contract"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Disclosing Party's Address</label>
          <input
            type="text"
            name="DisclosingAddress"
            value={formData.DisclosingAddress}
            onChange={handleChange}
            placeholder="Enter Disclosing Party's Address"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Receiving Party's Name</label>
          <input
            type="text"
            name="ReceivingName"
            value={formData.ReceivingName}
            onChange={handleChange}
            placeholder="Enter Receiving Party's Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Receiving Party's Address</label>
          <input
            type="text" name="ReceivingAddress"

            value={formData.ReceivingAddress}
            onChange={handleChange}
            placeholder="Enter Receiving Party's Address"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Execuetion Date</label>
          <input
            type="date" name="ExecutedAs"

            value={formData.ExecutedAs}
            onChange={handleChange}
            placeholder="Enter Execuetion Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />

          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Disclosing Party Date</label>
          <input
            type="date" name="DISCLOSINGDate"

            value={formData.DISCLOSINGDate}
            onChange={handleChange}
            placeholder="Enter Disclosing Party Date"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Receiving Party Date</label>
          <input
            type="date" name="RECEIVINGDate"
            value={formData.RECEIVINGDate}
            onChange={handleChange}
            placeholder="Enter Receiving Party Date"
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