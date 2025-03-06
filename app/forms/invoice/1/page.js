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

  const [lineItems, setLineItems] = useState([{ description: "", total: "" }]);
  const handleAddRow = () => {
    setLineItems([...lineItems, { description: "", total: "" }]);
  };
  const handleRemoveRow = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Template</title>
    <style>
        body {
        background-color:#fff;
            font-family: Arial, sans-serif;
        }
        .invoice-container {
           
            margin: auto;
            border: 1px solid #ddd;
            padding: 20px;
        }
        h2 {
            margin: 0;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #ccc;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        td, th {
            padding: 8px;
            border: 1px solid #ddd;
        }
        .text-right {
            text-align: right;
        }
        .total-table td {
            border: none;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
        }
    </style>
</head>
<body>

<div class="invoice-container">
    <div class="header">
        <div>
            <h2>BLANK INVOICE TEMPLATE</h2>
            <div class="logo">YOUR LOGO</div>
        </div>
        <div>
            <h3>INVOICE</h3>
        </div>
    </div>

    <table>
        <tr>
            <td>
                <strong>Company Name</strong><br>
                123 Main Street<br>
                Hamilton, OH 44416<br>
                (321) 456-7890<br>
                Email Address<br>
                Point of Contact
            </td>
            <td class="text-right">
                <strong>Date:</strong> ___________<br>
                <strong>Invoice No.:</strong> ___________<br>
                <strong>Customer ID:</strong> ___________
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <th>BILL TO</th>
            <th>SHIP TO</th>
        </tr>
        <tr>
            <td>
                ATTN: Name / Dept<br>
                Company Name<br>
                123 Main Street<br>
                Hamilton, OH 44416<br>
                (321) 456-7890<br>
                Email Address
            </td>
            <td>
                ATTN: Name / Dept<br>
                Company Name<br>
                123 Main Street<br>
                Hamilton, OH 44416<br>
                (321) 456-7890
            </td>
        </tr>
    </table>

    <table>
        <tr>
            <th>TERMS</th>
        </tr>
        <tr>
            <td style="height: 50px;"></td>
        </tr>
    </table>

    <table>
        <tr>
            <th>Description</th>
            <th>Total</th>
        </tr>
        ${lineItems
        .map(
          (item) => `<tr>
                <td style="height: 30px; padding: 8px;">${item.description}</td>
                <td style="height: 30px; padding: 8px;">${item.total}</td>
            </tr>`
        )
        .join("")}
    </table>

    <table class="total-table">
        <tr>
            <td>Remarks / Instructions:</td>
            <td class="text-right"><strong>Subtotal:</strong> ___________</td>
        </tr>
        <tr>
            <td></td>
            <td class="text-right"><strong>Discount:</strong> ___________</td>
        </tr>
        <tr>
            <td></td>
            <td class="text-right"><strong>Subtotal Less Discount:</strong> ___________</td>
        </tr>
        <tr>
            <td></td>
            <td class="text-right"><strong>Tax Rate:</strong> ___________</td>
        </tr>
        <tr>
            <td></td>
            <td class="text-right"><strong>Total Tax:</strong> ___________</td>
        </tr>
        <tr>
            <td></td>
            <td class="text-right"><strong>Shipping/Handling:</strong> ___________</td>
        </tr>
        <tr>
            <td></td>
            <td class="text-right"><strong>Other:</strong> ___________</td>
        </tr>
        <tr>
            <td></td>
            <td class="text-right"><strong>Total:</strong> ___________</td>
        </tr>
    </table>

    <p><em>Please make check payable to Your Company Name.</em></p>
    <h3>THANK YOU</h3>

    <div class="footer">
        <p>For questions concerning this invoice, please contact</p>
        <p>Name, (321) 456-7890, Email Address</p>
        <p>www.yourwebaddress.com</p>
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
          {lineItems.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
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
                name="total"
                value={item.total}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Total"
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