import React from 'react';
import '../assets/styles/components/preview.css';

interface IPreviewProps {
  pdfDataUrl: string | null;
}

export const Preview: React.FC<IPreviewProps> = ({
  pdfDataUrl,
}: IPreviewProps) => {
  return (
    <div className="preview-file">
      {pdfDataUrl && (
        <iframe
          src={pdfDataUrl}
          title="PDF Preview"
          className="uploadedFile"
        />
      )}
    </div>
  );
};
