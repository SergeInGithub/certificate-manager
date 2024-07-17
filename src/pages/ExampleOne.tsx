import React from 'react';
import { Table } from '@components/Tables';
import { certificates } from '@data';
import '../assets/styles/pages/exampleOne.css';

export function ExampleOne() {
  return (
    <div className="example-one">
      <div className="table-container">
        <h1>Example 1</h1>
        <Table certificates={certificates} />
      </div>
    </div>
  );
}
