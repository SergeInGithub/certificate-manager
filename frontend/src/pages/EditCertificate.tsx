import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/pages/addCertificate.css';
import { Button, CertificateForm, FileUpload, Preview } from '@components';
import { CertificateDto } from '@types';
import { apiClient } from '@utils';

export function EditCertificate() {
  const { id } = useParams<{ id: string }>();
  const [pdfDataUrl, setPdfDataUrl] = useState<string>('');
  const [certificateId, setCertificateId] = useState<number | undefined>(
    undefined,
  );
  const [initialFormData, setInitialFormData] = useState<CertificateDto | null>(
    null,
  );
  const formRef = useRef<{
    submit: () => void;
    reset: () => void;
    setValues: (values: CertificateDto) => void;
  }>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (id) {
        try {
          const parsedCertificateId = parseInt(id, 10);
          setCertificateId(parsedCertificateId);

          const response = await apiClient.getCertificate(parsedCertificateId);
          const certificate: CertificateDto = response.data.data;

          if (certificate && formRef.current) {
            formRef.current.setValues(certificate);
            setPdfDataUrl(certificate.fileUrl);
            setInitialFormData(certificate);
          }
        } catch (error) {
          console.error('Error fetching certificate from backend:', error);
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
    if (formRef.current && initialFormData) {
      formRef.current.setValues(initialFormData);
      setPdfDataUrl(initialFormData.fileUrl);
    }
  }, [initialFormData]);

  return (
    <div className="add-certificate-page">
      <div className="add-certificate-container">
        <section>
          <CertificateForm
            ref={formRef}
            pdfDataUrl={pdfDataUrl}
            onReset={() => setPdfDataUrl('')}
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
