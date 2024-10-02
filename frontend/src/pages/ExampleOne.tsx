import React, { useEffect, useState, useCallback } from 'react';
import { CertificateTable } from '@components/Tables';
import '../assets/styles/pages/exampleOne.css';
import { Button } from '@components';
import { useNavigate } from 'react-router';
import { CertificateDto } from '@types';
import { useLanguage } from '@hooks';
import { apiClient, handleNavigate } from '@utils';

export function ExampleOne() {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [data, setData] = useState<CertificateDto[]>([]);

  const handleClick = useCallback(() => {
    handleNavigate('/ml/add-certificate', navigate);
  }, [navigate]);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiClient.getCertificates();

      const certificatesFromBackend = response.data;
      setData(certificatesFromBackend.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await apiClient.deleteCertificate(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting certificate:', error);
      }
    },
    [fetchData],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="example-one">
      <div className="table-container">
        <h1>Example 1</h1>

        <Button
          type="button"
          className="certificate-button"
          onClick={handleClick}
        >
          {translations.newCertificate}
        </Button>

        <CertificateTable
          certificates={data}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
