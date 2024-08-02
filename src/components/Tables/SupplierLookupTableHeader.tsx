import { SupplierLookupTableHeaderItems } from '@data';
import { TableHeaderItem } from '@types';
import React from 'react';
import { useLanguage } from '@hooks';

export const SupplierLookupTableHeader: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <thead>
      <tr>
        {SupplierLookupTableHeaderItems.map((item: TableHeaderItem) => (
          <th
            scope="col"
            key={item.id}
            className="table-header-item"
          >
            {translations[item.id] || item.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
