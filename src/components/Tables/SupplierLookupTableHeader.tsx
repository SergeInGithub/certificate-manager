import { SupplierLookupTableHeaderItems } from '@data';
import { TableHeaderItem } from '@types';
import React from 'react';

export const SupplierLookupTableHeader: React.FC = () => (
  <thead>
    <tr>
      {SupplierLookupTableHeaderItems.map((item: TableHeaderItem) => (
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
