"use client";

import axios from "axios";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";


export default function Home() {
  const [formData, setFormData] = useState({
    issuedDate: "2025-02-07",
    invoiceId: "TP_210",
    clientName: "David Mark",
    clientEmail: "client@example.com",
    clientcompanyName: "Templik",
    clientcompanyAddress: "86 Route 59, Airmont, New York",
    yourName: "John Deo",
    yourEmail: "john@deo.com",
    companyName: "The Studios",
    companyAddress: "846 Route 539, Airmont, New York",
    Subtotal: "",
    TaxAmount: "",
    Tax: "10",
    TotalAmount: "",
  });

  const [lineItems, setLineItems] = useState([{ Description: "", Total: "", Quantity: "", UnitPrice: "" }]);
  const handleAddRow = () => {
    setLineItems([...lineItems, { Description: "", Total: "", Quantity: "", UnitPrice: "" }]);
  };
  const handleRemoveRow = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...lineItems];
    updatedItems[index][name] = value;

    // Calculate the total for the row
    if (name === "Quantity" || name === "UnitPrice") {
      const quantity = parseFloat(updatedItems[index].Quantity) || 0;
      const unitPrice = parseFloat(updatedItems[index].UnitPrice) || 0;
      updatedItems[index].Total = (quantity * unitPrice).toFixed(2);
    }

    setLineItems(updatedItems);
  };

  const [pdfUrl, setPdfUrl] = useState("");
  useEffect(() => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + (parseFloat(item.Quantity) * parseFloat(item.UnitPrice) || 0),
      0
    );
    const taxAmount = (subtotal * (parseFloat(formData.Tax) / 100)) || 0;
    const totalAmount = subtotal + taxAmount;

    setFormData((prevFormData) => ({
      ...prevFormData,
      Subtotal: subtotal.toFixed(2),
      TaxAmount: taxAmount.toFixed(2),
      TotalAmount: totalAmount.toFixed(2),
    }));
  }, [lineItems, formData.Tax]);




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
    <title>Invoice</title>
    <style>
        body {zoom:0.8;
            font-family: Arial, sans-serif;
            background-color: #fff;
            padding: 60px;
        }
        .invoice-container {
           
        }
        h1, h2, h3 {
            color: #333;
        }
        .header, .footer {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            color: #0073e6;
        }
        .invoice-details {
            display: flex;
            justify-content: space-between;
            margin: 50px 0;
        }
        .invoice-details div {
            width: 48%;
        }
        .invoice-details p {
            margin: 5px 0;
        }
        .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .invoice-table th, .invoice-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .invoice-table th {
            background: #0073e6;
            color: white;
        }
        .total-section {
            margin-top: 20px;
            text-align: right;
        }
        .signature {
            margin-top: 40px;
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
    <div class="invoice-container">
        <div class="header">
            <h1>Invoice</h1>
            <p>Invoice #: ${formData.invoiceId} | Date: ${formData.issuedDate}</p>
        </div>

        <div class="invoice-details">
            <div>
                <h3>Bill To:</h3>
                <p><strong>${formData.clientName}</strong></p>
                <p>Company Name: ${formData.clientcompanyName}</p>
                <p>Address: ${formData.clientcompanyAddress}</p>
                <p>Email:  ${formData.clientEmail}</p>
            </div>
            <div>
                <h3>From:</h3>
                <p><strong>${formData.yourName}</strong></p>
                <p>Company Name: ${formData.companyName}</p>
                <p>Address: ${formData.companyAddress}</p>
                <p>Email: ${formData.yourEmail}</p>
            </div>
        </div>

        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
            ${lineItems
        .map(
          (item) => `<tr>
                      <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.Description}</td>
                      <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.Quantity}</td>
                      <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.UnitPrice}</td>
                      <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.Total}</td>
                  </tr>`
        )
        .join("")}
            </tbody>
        </table>

        <div class="total-section">
            <p><strong>Subtotal:</strong> ${formData.Subtotal}</p>
            <p><strong>Tax (10%):</strong>${formData.TaxAmount}</p>
            <h2>Total: $${formData.TotalAmount}</h2>
        </div>

        <h3 style="margin-top:100px">Payment Terms:</h3>
        <p>Payment is due within 14 days of receipt. Late payments may incur a 5% penalty.</p>
        
        <div class="signature">
            <div>
                Authorized Signature<br>
                ${formData.yourName}
            </div>
            <div>
                Client Signature<br>
                ${formData.clientName}
            </div>
        </div>

        <div class="footer">
            <p>Thank you for your business!</p>
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
       <div className=" flex lg:my-16 lg:mx-10 m-3 rounded-xl overflow-hidden shadow-md lg:flex-row flex-col gap-y-10">
        {/* Editing Section */}
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 lg:max-h-[800px] max-h-fit flex-col lg:w-5/12 lg:order-1 order-2  w-full bg-[#d7dbd8]">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Invoice ID</label>

          <input
            type="text"
            name="invoiceId"
            value={formData.invoiceId}
            onChange={handleChange}
            placeholder="Enter Invoice Id"
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
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Client Name</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Enter Client Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Client Company Name</label>
          <input
            type="text"
            name="clientcompanyName"
            value={formData.clientcompanyName}
            onChange={handleChange}
            placeholder="Enter Client Company Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Client Company Address</label>
          <input
            type="text"
            name="clientcompanyAddress"
            value={formData.clientcompanyAddress}
            onChange={handleChange}
            placeholder="Enter Client Company Address"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Client Email Address</label>
          <input
            type="email" name="clientEmail"

            value={formData.clientEmail}
            onChange={handleChange}
            placeholder="Enter Client Email Address"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Your Name</label>
          <input
            type="email" name="yourName"

            value={formData.yourName}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Your Company Name</label>
          <input
            type="email" name="companyName"

            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter Your Company Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Your Company Address</label>
          <input
            type="text" name="companyAddress"

            value={formData.companyAddress}
            onChange={handleChange}
            placeholder="Enter Receiving Party's Address"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Your Email Address</label>
          <input
            type="email" name="yourEmail"

            value={formData.yourEmail}
            onChange={handleChange}
            placeholder="Enter Receiving Party's Address"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Items, Price Per Unit and Quantity</label>

          {lineItems.map((item, index) => (
            <div key={index} className="flex justify-between gap-2 mb-2">
              <input
                type="text"
                name="Description"
                value={item.Description}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Items"
                className="py-2 px-2 border rounded w-60"
              />
                <input
                  type="text"
                  name="Quantity"
                  value={item.Quantity}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter Quantity"
                  className="py-2 px-2 border rounded w-36"
                />
              <input
                type="text"
                name="UnitPrice"
                value={item.UnitPrice}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Unit Price"
                className="py-2 px-2 border rounded w-36"
              />
              <input
                type="text"
                name="Total"
                value={item.Total}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Total"
                className="py-2 px-2 border rounded"
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