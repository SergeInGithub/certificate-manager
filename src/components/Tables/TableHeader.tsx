import { tableHeaderItems } from '@data';
import { TableHeaderItem } from '@types';
import React from 'react';

export const TableHeader: React.FC = () => (
  <thead>
    <tr className="table-header">
      {tableHeaderItems.map((item: TableHeaderItem) => (
        <th
          scope="col"
          key={item.id}
          className="table-header-item"
        >
          {item.label}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
