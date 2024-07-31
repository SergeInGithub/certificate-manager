import React, { useEffect, useState, useCallback } from 'react';
import { CertificateTable } from '@components/Tables';
import '../assets/styles/pages/exampleOne.css';
import { Button } from '@components';
import { fetchCertificates, handleNavigate, deleteCertificate } from '@utils';
import { useNavigate } from 'react-router';
import { TCertificate } from '@types';

export function ExampleOne() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    handleNavigate('/ml/add-certificate', navigate);
  }, [navigate]);

  const [data, setData] = useState<TCertificate[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const storedData = await fetchCertificates('CertificateDb', 1);
      setData(storedData);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteCertificate('CertificateDb', 1, id);
      const updatedData = await fetchCertificates('CertificateDb', 1);

      setData(updatedData);
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  }, []);

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
          New certificate
        </Button>
        <CertificateTable
          certificates={data}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
