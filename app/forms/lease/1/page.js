"use client";

import axios from "axios";
import dynamic from "next/dynamic";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


export default function Home() {
  const editor = useRef(null);
  const [Utilities, setUtilities] = useState("The Tenant will reponsible for these utilities: Electric Bill, Water Bill  and the landlord for these: Renovation, Painting, Community");
  const [Pets, setPets] = useState("<p>Pets Allowed, If allowed, pet deposit: <strong>$230</strong>.</p>        <p>Smoking inside the premises is Prohibited.</p>");


  const [formData, setFormData] = useState({
    issuedDate: "2025-02-07",
    LandlordName: "John Deo",
    LandlordAddress: "420 S Broad St, Winston-Salem, North Carolina",
    TenantName: "David Mark",
    TenantAddress: "86 Route 59, Airmont, New York",
    PropertyAddress: "2025-02-07",
    StartDate: "2025-02-07",
    EndDate: "2025-02-07",
    RentAmount: "$200",
    LateFee: "$10",
    Deposit: "$2400",
    Return: "20 days",
    Notice: "10 Days",
    EntryNotice: "5 Days",
    TerminationFee: "$130",
    State: "California",
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
            margin-top: 50px;
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
            <p>This Lease Agreement is made and entered into as of <strong>${formData.issuedDate}</strong> by and between:</p>
        </div>

        <h4>1. Parties</h4>
        <p><strong>Landlord:</strong> ${formData.LandlordName}, residing at ${formData.LandlordAddress}</p>
        <p><strong>Tenant:</strong> ${formData.TenantName}, residing at ${formData.TenantAddress}</p>

        <h4>2. Property</h4>
        <p>The property subject to this lease is located at <strong>${formData.PropertyAddress}</strong>.</p>

        <h4>3. Lease Type</h4>
        <p>The lease can be either:</p>
        <ul>
            <li>Fixed Lease: Starting from <strong>${formData.StartDate}</strong> and ending on <strong>${formData.EndDate}</strong>.</li>
            <li>Month-to-Month Lease: Starting from <strong>${formData.StartDate}</strong> with termination upon written notice.</li>
        </ul>

        <h4>4. Rent Payment</h4>
        <p>The Tenant agrees to pay a monthly rent of <strong>${formData.RentAmount}</strong>, due on the first day of each month.</p>
        <p>Late fees apply at <strong>${formData.LateFee}</strong> per day for overdue payments.</p>

        <h4>5. Security Deposit</h4>
        <p>The Tenant shall provide a security deposit of <strong>${formData.Deposit}</strong> before moving in.</p>
        <p>The deposit will be returned within <strong>${formData.Return}</strong> after termination, minus any deductions for damages.</p>

        <h4>6. Use of Property</h4>
        <p>The Property shall only be used for residential purposes. No illegal activities or subleasing without written consent.</p>

        <h4>7. Utilities & Maintenance</h4>
        ${Utilities}

        <h4>8. Alterations & Repairs</h4>
        <p>The Tenant shall not make any structural changes without the Landlord’s written approval.</p>

        <h4>9. Access & Right of Entry</h4>
        <p>The Landlord may enter the premises with <strong>${formData.EntryNotice}</strong> notice for inspections, repairs, or emergencies.</p>

        <h4>10. Pets & Smoking</h4>
        ${Pets}
        

        <h4>11. Termination & Early Exit</h4>
        <p>Either party may terminate with <strong>${formData.Notice}</strong> written notice. Early termination fee: <strong>${formData.TerminationFee}</strong>.</p>

        <h4>12. Governing Law</h4>
        <p>This lease shall be governed by the laws of <strong>${formData.State}</strong>.</p>

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

  const config = {
    buttons: ["bold", "italic", "underline", "ul", "ol", "fontsize"],
    toolbarAdaptive: false, // Keeps the toolbar fixed
    showXPathInStatusbar: false,
    // Hides unnecessary UI elements
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
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 max-h-[800px] flex-col w-full bg-slate-200  ">
          <h2 className="text-2xl font-bold">Edit Legal Document</h2>
          <label htmlFor="" className="-mb-4">Enter Issued Date</label>
          <input
            type="date"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            placeholder="Enter Issued Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter  Landlord Name</label>
          <input
            type="text"
            name="LandlordName"
            value={formData.LandlordName}
            onChange={handleChange}
            placeholder="Enter Landlord Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Landlord Address</label>
          <input
            type="text"
            name="LandlordAddress"
            value={formData.LandlordAddress}
            onChange={handleChange}
            placeholder="Enter Landlord Address"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Tenant Namet</label>
          <input
            type="text"
            name="TenantName"
            value={formData.TenantName}
            onChange={handleChange}
            placeholder="Enter Tenant Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Tenant Address</label>
          <input
            type="text"
            name="TenantAddress"
            value={formData.TenantAddress}
            onChange={handleChange}
            placeholder="Enter Tenant Address"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Propert Address</label>
          <input
            type="text"
            name="PropertyAddress"
            value={formData.PropertyAddress}
            onChange={handleChange}
            placeholder="Enter Property Address"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Start Date Of Contract</label>
          <input
            type="Date"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
            placeholder="Enter Start Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter End Date Of Contract</label>
          <input
            type="Date"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
            placeholder="Enter End Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Total Rent Amount</label>
          <input
            type="text"
            name="RentAmount"
            value={formData.RentAmount}
            onChange={handleChange}
            placeholder="Enter Rent Amount"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Rent Late Fee</label>
          <input
            type="text"
            name="LateFee"
            value={formData.LateFee}
            onChange={handleChange}
            placeholder="Enter Late Fee"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Amount of Initial Deposit</label>
          <input
            type="text"
            name="Deposit"
            value={formData.Deposit}
            onChange={handleChange}
            placeholder="Enter Deposit"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Deposit Return Time</label>
          <input
            type="text"
            name="Return"
            value={formData.Return}
            onChange={handleChange}
            placeholder="Enter Return"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />

          <label htmlFor="" className="-mb-4">Details About Responsibilities</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Utilities}
            onBlur={(newContent) => setUtilities(newContent)}
          />
          <label htmlFor="" className="-mb-4">Enter Inpection Entry Notice Period</label>
          <input
            type="text" name="EntryNotice"

            value={formData.EntryNotice}
            onChange={handleChange}
            placeholder="Enter Entry Notice"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Details About Pets and Smoking</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Pets}
            onBlur={(newContent) => setPets(newContent)}
          />
          <label htmlFor="" className="-mb-4">Enter Notice Period</label>
          <input
            type="text" name="Notice"

            value={formData.Notice}
            onChange={handleChange}
            placeholder="Enter Notice"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Early Termination Fee</label>
          <input
            type="text" name="TerminationFee"

            value={formData.TerminationFee}
            onChange={handleChange}
            placeholder="Enter Early Termination Fee"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter State</label>
          <input
            type="text" name="State"
            value={formData.State}
            onChange={handleChange}
            placeholder="Enter State"
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
        <div className="lg:p-10 p-4  flex gap-y-5 flex-col w-full bg-purple-600">
          {/* <div dangerouslySetInnerHTML={{ __html: rawHtml }} /> */}
          <HtmlPreview rawHtml={rawHtml()} />
        </div>

      </div>


    </>
  );
}