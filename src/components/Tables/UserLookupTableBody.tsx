import React from 'react';
import { UserLookupTableProps } from './UserLookupTable';
import { UserLookupTableRow } from './UserLookupTableRow';

export const UserLookupTableBody: React.FC<UserLookupTableProps> = ({
  users,
}) => {
  return (
    <tbody>{users?.map((user) => <UserLookupTableRow user={user} />)}</tbody>
  );
};
