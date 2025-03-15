"use client";

import axios from "axios";
import dynamic from "next/dynamic";
// import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


export default function Home() {
  const editor = useRef(null);
  const [Summary, setSummary] = useState("<p>This business plan outlines the strategy and goals for [Business Name], detailing market opportunities, financial projections, and operational plans. Our company aims to provide top-tier products and services that cater to an ever-growing demand. By leveraging innovative technology and market research, we plan to scale efficiently and achieve sustainable growth.</p>")
  const [Overview, setOverview] = useState(" <p><strong>Business Name:</strong> [Your Business Name]<strong>Industry:</strong> [Industry Name]<strong>Founded:</strong> [Year]<strong>Business Structure:</strong> [Sole Proprietorship/LLC/Corporation] Our business operates within a highly competitive market, but with our unique approach, we plan to differentiate ourselves and capture significant market share.</p>")
  const [Services, setServices] = useState("<ul><li>Product/Service 1 - Our flagship offering designed to meet consumer needs.</li><li>Product/Service 2 - A secondary product that complements our main offering.</li><li>Unique Value Proposition - Our edge over competitors lies in quality, pricing, and customer experience.</li></ul>")
  const [Analysis, setAnalysis] = useState("<p>Our target market consists of [Target Audience]. We have conducted thorough research to understand consumer behavior and preferences. Our competitors include [Competitor Names], and we have identified gaps in their offerings that we plan to exploit. Market trends indicate significant growth potential in the coming years, and we aim to capitalize on this opportunity.</p>")
  const [Strategy, setStrategy] = useState("<p>Our marketing strategy involves a mix of digital and traditional channels, including social media advertising, SEO, content marketing, and strategic partnerships. We will leverage analytics to refine our approach and ensure maximum reach.</p>")
  const [Operational, setOperational] = useState("<p>Operations will be streamlined through automation and strategic supplier relationships. Our team will focus on maintaining efficiency in logistics, customer service, and inventory management.</p>")
  const [Risk, setRisk] = useState("<p>We have identified potential risks such as market volatility, supply chain disruptions, and regulatory changes. Mitigation strategies include diversification, contingency planning, and compliance adherence.</p>")
  const [Conclusion, setConclusion] = useState("<p>Our vision is to establish ourselves as a leader in the industry through innovation and customer-centric practices. With a clear roadmap and strategic execution, we are confident in achieving our business goals.</p>")



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

  const config = {
    buttons: ["bold", "italic", "underline", "ul", "ol", "fontsize"],
    toolbarAdaptive: false, // Keeps the toolbar fixed
    showXPathInStatusbar: false,
    // Hides unnecessary UI elements
  };

  const [lineItems, setLineItems] = useState([{ description: "E-Store", total: "$39000" }]);
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
  const rawHtml = () => {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Business Plan</title><style>body{font-family:Arial,sans-serif;padding:40px;background-color:#ffffff;}.plan{}h1,h2,h3{color:#333;text-align:center;}table{width:100%;border-collapse:collapse;margin-top:20px;}th,td{border:1px solid #ddd;padding:10px;text-align:left;}th{background:#0073e6;color:#fff;}</style></head><body><div class="plan"><h1>Business Plan</h1><h2>Executive Summary</h2>${Summary}</p><h3>1. Business Overview</h3>${Overview}<h3>2. Products & Services</h3>${Services}<h3>3. Market Analysis</h3>${Analysis}<h3>4. Marketing Strategy</h3>${Strategy}<h3>5. Operational Plan</h3>${Operational}<h3>6. Financial Plan</h3><table><tr><th>Revenue Stream</th><th>Projected Earnings</th></tr>${lineItems
      .map(
        (item) => `<tr>
              <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.description}</td>
              <td style="height: 30px; padding: 8px; width: 200px; word-wrap: break-word; word-break: break-word; overflow: hidden;">${item.total}</td>
          </tr>`
      )
      .join("")}</table><h3>7. Risk Management</h3>${Risk}<h3>8. Conclusion</h3>${Conclusion}</div></body></html>`;
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
       <div className="flex m-10 rounded-xl overflow-hidden shadow-md lg:flex-row flex-col gap-y-10">
        {/* Editing Section */}
        <div className="overflow-y-auto lg:p-20 py-10 px-8 flex gap-y-5 max-h-[800px] flex-col w-full bg-slate-200  ">
          <h2 className="text-2xl font-bold">Edit Legal Document</h2>
          <label htmlFor="" className="-mb-4">Executive Summary</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Summary}
            onBlur={(newContent) => setSummary(newContent)}
          />
          <label htmlFor="" className="-mb-4">Business Overview</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Overview}
            onBlur={(newContent) => setOverview(newContent)}
          />
          <label htmlFor="" className="-mb-4">Products & Services</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Services}
            onBlur={(newContent) => setServices(newContent)}
          />
          <label htmlFor="" className="-mb-4">Market Analysis</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Analysis}
            onBlur={(newContent) => setAnalysis(newContent)}
          />

          <label htmlFor="" className="-mb-4">Marketing Strategy</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Strategy}
            onBlur={(newContent) => setStrategy(newContent)}
          />
          <label htmlFor="" className="-mb-4">Operational Plan</label>

          <JoditEditor
            config={config}
            ref={editor}
            value={Operational}
            onBlur={(newContent) => setOperational(newContent)}
          />
          <label htmlFor="" className="-mb-4">Financial Plan</label>
          {lineItems.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Stream"
                className="py-2 px-4 border rounded"
              />
              <input
                type="text"
                name="total"
                value={item.total}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Earnings"
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
          <label htmlFor="" className="-mb-4">Risk Management</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Risk}
            onBlur={(newContent) => setRisk(newContent)}
          />
          <label htmlFor="" className="-mb-4">Conclusion</label>
          <JoditEditor
            config={config}
            ref={editor}
            value={Conclusion}
            onBlur={(newContent) => setConclusion(newContent)}
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