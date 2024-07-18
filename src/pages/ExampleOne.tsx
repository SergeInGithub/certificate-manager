import React from 'react';
import { CertificateTable } from '@components/Tables';
import { certificates } from '@data';
import '../assets/styles/pages/exampleOne.css';
import { Button } from '@components';

export function ExampleOne() {
  return (
    <div className="example-one">
      <div className="table-container">
        <h1>Example 1</h1>
        <CertificateTable certificates={certificates} />
        <Button
          type="button"
          children="New certificate"
          className="certificate-button"
        />
        <CertificateTable certificates={certificates} />
      </div>
    </div>
  );
}
