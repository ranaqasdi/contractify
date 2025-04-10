"use client";

import axios from "axios";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";


export default function Home() {
  const [formData, setFormData] = useState({
    issuedDate: "2025-02-07",
    Id: "TP_210",
    yourName: "John Deo",
    yourEmail: "john@deo.com",
    Department: "Sales",
    EmployeeID: "45678",
    startTime: "025-02-07",
    endTime: "25-02-07",
    Subtotal: "",
    TaxAmount: "",
    Tax: "5",
    TotalAmount: "",
    ManagerName: "Mark Deo"
  });

  const [lineItems, setLineItems] = useState([{ Description: "", Total: "", Category: "", Date: "" }]);
  const handleAddRow = () => {
    setLineItems([...lineItems, { Description: "", Total: "", Category: "", Date: "" }]);
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
  useEffect(() => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + (parseFloat(item.Total)),
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
    <title>Expense Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fff;
            padding: 40px;
        }
        .report-container {
          
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
        .details {
           margin-bottom:30px
            
        }
        .details p {
            margin: 5px 0;
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
    <div class="report-container">
        <div class="header">
            <h1>Expense Report</h1>
            <p>Report ID: ${formData.Id} | Date: ${formData.issuedDate}</p>
        </div>

        <div class="details">
            <h3>Employee Details</h3>
            <p><strong>Name:</strong> ${formData.yourName}</p>
            <p><strong>Department:</strong> ${formData.Department}</p>
            <p><strong>Employee ID:</strong> ${formData.EmployeeID}</p>
            <p><strong>Reporting Period:</strong> ${formData.startTime} - ${formData.endTime}</p>
        </div>

        <h3>Expense Breakdown</h3>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${lineItems
        .map(
          (item) => `<tr>
                      <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.Date}</td>
                      <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.Category}</td>
                      <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.Description}</td>
                      <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.Total}</td>
                  </tr>`
        )
        .join("")}
            </tbody>
        </table>

        <div class="total-section">
            <p><strong>Subtotal:</strong> $${formData.Subtotal}</p>
            <p><strong>Tax (5%):</strong> $${formData.TaxAmount}</p>
            <h2>Total Reimbursement: $${formData.TotalAmount}</h2>
        </div>

        <h3>Approval</h3>
        <p>Manager’s approval is required before processing the reimbursement.</p>
        
        <div class="signature">
            <div>
                Employee Signature<br>
                ${formData.yourName}
            </div>
            <div>
                Manager Signature<br>
                ${formData.ManagerName}
            </div>
        </div>

        <div class="footer">
            <p>Thank you! Please submit the report with necessary receipts.</p>
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
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 max-h-[800px] flex-col w-5/12 bg-[#B2BEB5]">
          <h2 className="text-2xl font-bold  text-[#5d17eb]">Edit Legal Document</h2>
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter ID</label>

          <input
            type="text"
            name="Id"
            value={formData.Id}
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
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Your Name</label>
          <input
            type="text"
            name="yourName"
            value={formData.yourName}
            onChange={handleChange}
            placeholder="Enter Client Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Department Name</label>
          <input
            type="text"
            name="Department"
            value={formData.Department}
            onChange={handleChange}
            placeholder="Enter Department Name"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Employee ID</label>
          <input
            type="text"
            name="EmployeeID"
            value={formData.EmployeeID}
            onChange={handleChange}
            placeholder="Enter Employee ID "
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          /> 
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Start Time</label>
          <input
            type="date" name="startTime"

            value={formData.startTime}
            onChange={handleChange}
            placeholder="Enter Start Time"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter End Time</label>
          <input
            type="date" name="endTime"

            value={formData.endTime}
            onChange={handleChange}
            placeholder="Enter End Time"
            className="py-4 bg-white text-black placeholder:text-black px-4 rounded shadow-md"
          />
          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Date, Category and Description</label>

          {lineItems.map((item, index) => (
            <div key={index} className="flex justify-between gap-2 mb-2">
              <input
                type="date"
                name="Date"
                value={item.Date}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Date"
                className="py-2 px-2 border rounded w-60"
              />
              <input
                type="text"
                name="Category"
                value={item.Category}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Category"
                className="py-2 px-2 border rounded w-36"
              />
              <input
                type="text"
                name="Description"
                value={item.Description}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Description"
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

          <label htmlFor="" className="-mb-4 text-[#525a54] font-medium">Enter Manager Name</label>
          <input
            type="text" name="ManagerName"

            value={formData.ManagerName}
            onChange={handleChange}
            placeholder="Enter  Manager Name"
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
        <div className="lg:p-10 p-4  flex gap-y-5 flex-col w-7/12 bg-[#9faca2]">
          {/* <div dangerouslySetInnerHTML={{ __html: rawHtml }} /> */}
          <HtmlPreview rawHtml={rawHtml()} />
        </div>

      </div>


    </>
  );
}