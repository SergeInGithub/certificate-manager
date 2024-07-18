import React from 'react';
import { CertificateTable } from '@components/Tables';
import { certificates } from '@data';
import '../assets/styles/pages/exampleOne.css';
import { Button } from '@components';
import { handleNavigate } from '@utils';
import { useNavigate } from 'react-router';

export function ExampleOne() {
  const navigate = useNavigate();
  const handleClick = () => {
    handleNavigate('/ml/add-certificate', navigate);
  };
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
        <CertificateTable certificates={certificates} />
      </div>
    </div>
  );
}
