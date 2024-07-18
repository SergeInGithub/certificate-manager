import React from 'react';
import '../assets/styles/pages/addCertificate.css';
import { Button, CertificateForm, Preview } from '@components';

export function AddCertificate() {
  return (
    <div className="add-certificate-page">
      <div className="add-certificate-container">
        <section>
          <CertificateForm />
        </section>

        <section className="add-file-container">
          <Button
            type="button"
            children="Upload"
            className="upload-button"
          />

          <Preview />
        </section>
      </div>

      <section className="form-button-section">
        <Button
          type="submit"
          children="Save"
          className="save-form-button"
        />
        <Button
          type="button"
          children="Reset"
          className="reset-form-button"
        />
      </section>
    </div>
  );
}
