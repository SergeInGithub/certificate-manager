import React, { useRef, useCallback } from 'react';
import { Input } from './Input';
import { Label } from './Label';
import { useLanguage } from '@hooks';

interface IFileUploadProps {
  setPdfDataUrl: React.Dispatch<React.SetStateAction<string>>;
  setPdfError?: React.Dispatch<React.SetStateAction<string>>;
}

export const FileUpload: React.FC<IFileUploadProps> = ({
  setPdfDataUrl,
  setPdfError,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { translations } = useLanguage();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setPdfDataUrl(reader.result as string);
            setPdfError?.('');
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid PDF file.');
      }
    },
    [setPdfDataUrl],
  );

  return (
    <section className="file-upload-container">
      <Label
        htmlFor="file-upload"
        className="upload-button"
        children={translations.uploadFile}
      />
      <Input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        ref={inputRef}
        className="hidden-file-input"
      />
    </section>
  );
};
