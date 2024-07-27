import React from 'react';
import { useLanguage } from '@hooks';
import { TLookupTableHeader, TableHeaderItem } from '@types';

export const LookupTableHeader = ({ tableHeaderItems }: TLookupTableHeader) => {
  const { translations } = useLanguage();

  return (
    <thead>
      <tr>
        <th />
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
