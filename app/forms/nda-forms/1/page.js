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
        body {
        background-color:white;
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
        }

        h1,
        h2 {
            text-align: left;
        }

        .section {
            margin-bottom: 20px;
        }

        .signature {
            margin-top: 40px;
        }
    </style>
</head>

<body >
    <h1 style="text-align:center">NON-DISCLOSURE AGREEMENT (NDA)</h1>
    <p>This Non Disclosure Agreement or ("Agreement") has been entered into on the date of
        <u><b>${formData.issuedDate}</b></u>  and is by and between:</p>

    <div class="section">
        <p><strong>Party Disclosing Information:</strong> <u><b>${formData.DisclosingName}</b></u>  with a mailing address of
            <u><b>${formData.DisclosingAddress}</b></u>  (“Disclosing Party”).</p>
        <p><strong>Party Receiving Information:</strong> <u><b>${formData.ReceivingName}</b></u>  with a mailing address of
            <u><b>${formData.ReceivingAddress}</b></u>  (“Receiving Party”).</p>
    </div>

    <div class="section">
        <h2>1. Definition of Confidential Information</h2>
        <p>For purposes of this Agreement, "Confidential
            Information" shall include all information or material that has or could have commercial value or
            other utility in the business in which Disclosing Party is engaged. If Confidential Information is in
            written form, the Disclosing Party shall label or stamp the materials with the word "Confidential"
            or some similar warning. If Confidential Information is transmitted orally, the Disclosing Party
            shall promptly provide writing indicating that such oral communication constituted Confidential
            Information.
        </p>
    </div>

    <div class="section">
        <h2>2. Exclusions from Confidential Information</h2>
        <p> Receiving Party's obligations under this
            Agreement do not extend to information that is: (a) publicly known at the time of disclosure or
            subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or
            created by the Receiving Party before disclosure by Disclosing Party; (c) learned by the
            Receiving Party through legitimate means other than from the Disclosing Party or Disclosing
            Party's representatives; or (d) is disclosed by Receiving Party with Disclosing Party's prior
            written approval.</p>

    </div>

    <div class="section">
        <h2>3. Obligations of Receiving Party</h2>
        <p> Receiving Party shall hold and maintain the Confidential
            Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party.
            Receiving Party shall carefully restrict access to Confidential Information to employees,
            contractors and third parties as is reasonably required and shall require those persons to sign
            nondisclosure restrictions at least as protective as those in this Agreement. Receiving Party
            shall not, without the prior written approval of Disclosing Party, use for Receiving Party's benefit,
            publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to
            the detriment of Disclosing Party, any Confidential Information. Receiving Party shall return to
            Disclosing Party any and all records, notes, and other written, printed, or tangible materials in its
            possession pertaining to Confidential Information immediately if Disclosing Party requests it in
            writing.</p>
    </div>

    <div class="section">
        <h2>4. Time Periods</h2>
        <p> The nondisclosure provisions of this Agreement shall survive the termination
            of this Agreement and Receiving Party's duty to hold Confidential Information in confidence
            shall remain in effect until the Confidential Information no longer qualifies as a trade secret or
            until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this
            Agreement, whichever occurs first.</p>
    </div>

    <div class="section">
        <h2>5. Relationships</h2>
        <p>Nothing contained in this Agreement shall be deemed to constitute either
            party a partner, joint venture or employee of the other party for any purpose.
        </p>
    </div>

    <div class="section">
        <h2>6. Severability</h2>
        <p>If a court finds any provision of this Agreement invalid or unenforceable, the
            remainder of this Agreement shall be interpreted so as best to affect the intent of the parties.</p>
    </div>

    <div class="section">
        <h2>7. Integration</h2>
        <p>This Agreement expresses the complete understanding of the parties with
            respect to the subject matter and supersedes all prior proposals, agreements, representations,
            and understandings. This Agreement may not be amended except in writing signed by both
            parties.
        </p>
    </div>

    <div class="section">
        <h2>8. Waiver</h2>
        <p>The failure to exercise any right provided in this Agreement shall not be a waiver of
            prior or subsequent rights.</p>
    </div>

    <div class="section">
        <h2>9. Notice of Immunity</h2>
        <p> Employee is provided notice that an individual shall not be held
            criminally or civilly liable under any federal or state trade secret law for the disclosure of a trade
            secret that is made (i) in confidence to a federal, state, or local government official, either
            directly or indirectly, or to an attorney; and (ii) solely for the purpose of reporting or investigating
            a suspected violation of law; or is made in a complaint or other document filed in a lawsuit or
            other proceeding, if such filing is made under seal. An individual who files a lawsuit for
            retaliation by an employer for reporting a suspected violation of law may disclose the trade
            secret to the attorney of the individual and use the trade secret information in the court
            proceeding, if the individual (i) files any document containing the trade secret under seal; and (ii)
            does not disclose the trade secret, except pursuant to court order</p>
    
        <p>This Agreement and each party's obligations shall be binding on the representatives, assigns
            and successors of such party. Each party has signed this Agreement through its authorized
            representative.
        </p>
    </div>

    <div class="signature">
        <p><strong>DISCLOSING PARTY</strong></p>
  
        <p>Name: <u><b>${formData.DisclosingName}</b></u>&nbsp;&nbsp;Date: <u><b>${formData.DISCLOSINGDate}</b></u></p>
    </div>

    <div class="signature">
        <p><strong>RECEIVING PARTY</strong></p>

        <p>Name: <u><b>${formData.ReceivingName}</b></u>&nbsp;&nbsp;Date: <u><b>${formData.RECEIVINGDate}</b></u></p>
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
          <label htmlFor="" className="-mb-4">Enter Issued Date</label>
          <input
            type="date"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleChange}
            placeholder="Enter Issued Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Disclosing Party's Name</label>
          <input
            type="text"
            name="DisclosingName"
            value={formData.DisclosingName}
            onChange={handleChange}
            placeholder="Enter Disclosing Party's Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Disclosing Party's Address</label>
          <input
            type="text"
            name="DisclosingAddress"
            value={formData.DisclosingAddress}
            onChange={handleChange}
            placeholder="Enter Disclosing Party's Address"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Receiving Party's Name</label>
          <input
            type="text"
            name="ReceivingName"
            value={formData.ReceivingName}
            onChange={handleChange}
            placeholder="Enter Receiving Party's Name"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Receiving Party's Address</label>
          <input
            type="text" name="ReceivingAddress"

            value={formData.ReceivingAddress}
            onChange={handleChange}
            placeholder="Enter Receiving Party's Address"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Disclosing Party Date</label>
          <input
            type="date" name="DISCLOSINGDate"

            value={formData.DISCLOSINGDate}
            onChange={handleChange}
            placeholder="Enter Disclosing Party Date"
            className="py-4 bg-slate-400 text-white placeholder:text-white px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4">Enter Receiving Party Date</label>
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