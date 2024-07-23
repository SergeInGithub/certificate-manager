import React from 'react';
import { CertificateTable } from '@components/Tables';
import { certificates } from '@data';
import '../assets/styles/pages/exampleOne.css';

export function ExampleOne() {
  return (
    <div className="example-one">
      <div className="table-container">
        <h1>Example 1</h1>
        <CertificateTable certificates={certificates} />
      </div>
    </div>
  );
}
