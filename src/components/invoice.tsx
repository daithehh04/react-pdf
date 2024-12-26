import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React from "react";

export default function Invoice() {
  const printRef = React.useRef(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    const pdfBlob = pdf.output("bloburl");
    window.open(pdfBlob, "_blank");
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold">Company Name</h2>
              <p className="text-sm text-gray-600">
                123 Business Street
                <br />
                City, State 12345
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">Bill To:</h3>
            <p className="text-gray-700">
              Client Name
              <br />
              Client Address
              <br />
              City, State ZIP
            </p>
          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">Description</th>
                <th className="p-2 text-right border">Quantity</th>
                <th className="p-2 text-right border">Unit Price</th>
                <th className="p-2 text-right border">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Web Design Service</td>
                <td className="p-2 text-right border">1</td>
                <td className="p-2 text-right border">$1,500.00</td>
                <td className="p-2 text-right border">$1,500.00</td>
              </tr>
              <tr>
                <td className="p-2 border">Hosting Setup</td>
                <td className="p-2 text-right border">1</td>
                <td className="p-2 text-right border">$250.00</td>
                <td className="p-2 text-right border">$250.00</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>$1,750.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%):</span>
                <span>$175.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>$1,925.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
