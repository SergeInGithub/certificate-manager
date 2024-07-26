import React from 'react';
import { userLookupTableHeaderItems } from '@data';
import { useLanguage } from '@hooks';
import { TableHeaderItem } from '@types';

export const UserLookupTableHeader = () => {
  const { translations } = useLanguage();

  return (
    <thead>
      <tr>
        {userLookupTableHeaderItems.map((item: TableHeaderItem) => (
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
