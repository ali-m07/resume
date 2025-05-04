// components/ExportPDFButton.jsx
import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExportPDFButton() {
  const handleExport = () => {
    const resume = document.getElementById('resume');
    html2canvas(resume).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Ali-Mansouri-CV.pdf');
    });
  };

  return (
    <button
      onClick={handleExport}
      className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      📄 Download PDF
    </button>
  );
}
