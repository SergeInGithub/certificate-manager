import React, { useState, useRef, useCallback } from 'react';
import '../assets/styles/pages/addCertificate.css';
import { Button, CertificateForm, FileUpload, Preview } from '@components';
import { useLanguage } from '@hooks';

export function AddCertificate() {
  const [pdfDataUrl, setPdfDataUrl] = useState<string>('');
  const formRef = useRef<{ submit: () => void; reset: () => void }>(null);
  const [pdfError, setPdfError] = useState('');

  const { translations } = useLanguage();

  const handleSave = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  const handleReset = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();
      setPdfDataUrl('');
    }
  }, []);

  const handleResetPdfDataUrl = useCallback(() => {
    setPdfDataUrl('');
  }, []);

  return (
    <div className="add-certificate-page">
      <div className="add-certificate-container">
        <section>
          <CertificateForm
            ref={formRef}
            pdfDataUrl={pdfDataUrl}
            onReset={handleResetPdfDataUrl}
            setPdfError={setPdfError}
          />
        </section>

        <section className="add-file-container">
          <FileUpload
            setPdfDataUrl={setPdfDataUrl}
            setPdfError={setPdfError}
          />

          <Preview pdfDataUrl={pdfDataUrl} />
          {pdfError && <div className="error">{pdfError}</div>}
        </section>
      </div>

      <section className="form-button-section">
        <Button
          type="button"
          onClick={handleSave}
          className="save-form-button"
        >
          {translations.saveButton}
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className="reset-form-button"
        >
          {translations.resetButton}
        </Button>
      </section>
    </div>
  );
}
