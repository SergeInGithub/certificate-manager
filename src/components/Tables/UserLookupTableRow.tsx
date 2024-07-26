import { TUserApplicant } from '@types';
import React from 'react';

interface ISupplierLookupRowProps {
  user: TUserApplicant;
}

export const UserLookupTableRow = ({ user }: ISupplierLookupRowProps) => {
  return (
    <React.Fragment>
      <tr>
        <td className="supplier-lookup-table-row-point-container">
          <div className="supplier-lookup-table-row-point" />
        </td>
        <td>{user.userLookupName}</td>
        <td>{user.userLookupFirstName}</td>
        <td>{user.userLookupId}</td>
        <td>{user.userLookupDepartment}</td>
        <td>{user.userLookupPlant}</td>
      </tr>
    </React.Fragment>
  );
};
