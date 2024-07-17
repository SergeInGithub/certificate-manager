import React, { useEffect, useState } from 'react';
import { CertificateTable } from '@components/Tables';
import '../assets/styles/pages/exampleOne.css';
import { Button } from '@components';
import { fetchCertificates, handleNavigate } from '@utils';
import { useNavigate } from 'react-router';
import { TCertificate } from '@types';

export function ExampleOne() {
  const navigate = useNavigate();
  const handleClick = () => {
    handleNavigate('/ml/add-certificate', navigate);
  };

  const [data, setData] = useState<TCertificate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await fetchCertificates('CertificatesDB', 1);
        setData(storedData);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="example-one">
      <div className="table-container">
        <h1>Example 1</h1>

        <Button
          type="button"
          children="New certificate"
          className="certificate-button"
          onClick={handleClick}
        />
        <CertificateTable certificates={data} />
      </div>
    </div>
  );
}