import React, { useState, useRef } from 'react';
import '../assets/styles/pages/addCertificate.css';
import { Button, CertificateForm, FileUpload, Preview } from '@components';

export function AddCertificate() {
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const formRef = useRef<{ submit: () => void; reset: () => void }>(null);

  const handleSave = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
      setPdfDataUrl(null);
    }
  };

  return (
    <div className="add-certificate-page">
      <div className="add-certificate-container">
        <section>
          <CertificateForm
            ref={formRef}
            pdfDataUrl={pdfDataUrl}
            onReset={() => setPdfDataUrl(null)}
          />
        </section>

        <section className="add-file-container">
          <FileUpload setPdfDataUrl={setPdfDataUrl} />

          <Preview pdfDataUrl={pdfDataUrl} />
        </section>
      </div>

      <section className="form-button-section">
        <Button
          type="button"
          onClick={handleSave}
          children="Save"
          className="save-form-button"
        />
        <Button
          type="button"
          onClick={handleReset}
          children="Reset"
          className="reset-form-button"
        />
      </section>
    </div>
  );
}
