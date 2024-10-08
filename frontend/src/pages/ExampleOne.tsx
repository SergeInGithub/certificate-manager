import React, { useEffect, useState, useCallback } from 'react';
import { CertificateTable } from '@components/Tables';
import '../assets/styles/pages/exampleOne.css';
import { Alert, Button } from '@components';
import { useNavigate } from 'react-router';
import { CertificateDto } from '@types';
import { useLanguage } from '@hooks';
import { apiClient, handleNavigate } from '@utils';

export function ExampleOne() {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [data, setData] = useState<CertificateDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

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

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      handleDelete(deleteId);
    }
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="example-one">
      <div className="table-container">
        <h1>{translations.example1}</h1>

        <Button
          type="button"
          className="certificate-button"
          onClick={handleClick}
        >
          {translations.newCertificate}
        </Button>

        <CertificateTable
          certificates={data}
          onDelete={confirmDelete}
        />

        {isModalOpen && (
          <Alert
            message={translations.areYouSure}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
}
