import { tableHeaderItems } from '@data';
import { TableHeaderItem } from '@types';
import React from 'react';
import { useLanguage } from '@hooks';

export const TableHeader: React.FC = () => {
  const { translations } = useLanguage();

  return (
    <thead>
      <tr className="table-header">
        {tableHeaderItems.map((item: TableHeaderItem) => (
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

export default TableHeader;
