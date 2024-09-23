import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/pages/addCertificate.css';
import { Button, CertificateForm, FileUpload, Preview } from '@components';
import { openDB } from '@utils';

interface Certificate {
  id: number;
  name: string;
  pdfDataUrl: string;
  dateFrom: string;
  dateTo: string;
  certificateType: string;
  supplier: string;
}

export function EditCertificate() {
  const { id } = useParams<{ id: string }>();
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [certificateId, setCertificateId] = useState<number | undefined>(
    undefined,
  );
  const formRef = useRef<{
    submit: () => void;
    reset: () => void;
    setValues: (values: any) => void;
  }>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (id) {
        try {
          const db = await openDB('CertificateDb', 1);
          const transaction = db.transaction('certificates', 'readonly');
          const store = transaction.objectStore('certificates');
          const parsedCertificateId = parseInt(id, 10);
          setCertificateId(parsedCertificateId);

          const request = store.get(parsedCertificateId);

          request.onsuccess = () => {
            const certificate: Certificate = request.result;

            if (certificate && formRef.current) {
              formRef.current.setValues(certificate);
              setPdfDataUrl(certificate.pdfDataUrl);
            }
          };

          request.onerror = () => {
            console.error('Error fetching certificate:', request.error);
          };
        } catch (error) {
          console.error('Error opening database:', error);
        }
      }
    };

    fetchCertificate();
  }, [id]);

  const handleSave = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  const handleReset = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();
      setPdfDataUrl(null);
    }
  }, []);

  return (
    <div className="add-certificate-page">
      <div className="add-certificate-container">
        <section>
          <CertificateForm
            ref={formRef}
            pdfDataUrl={pdfDataUrl}
            onReset={() => setPdfDataUrl(null)}
            isEdit={true}
            certificateId={certificateId}
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
          className="save-form-button"
        >
          Save
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className="reset-form-button"
        >
          Reset
        </Button>
      </section>
    </div>
  );
}
