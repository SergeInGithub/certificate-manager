import React from 'react';
import { TUserLookupTableProps, LookupModalType } from '@types';
import { participantTableHeaderItems, userLookupTableHeaderItems } from '@data';
import { UserLookupTableBody } from './UserLookupTableBody';
import { LookupTableHeader } from './LookupTableHeader';
import { useLanguage } from '@hooks';

export const UserLookupTable: React.FC<TUserLookupTableProps> = ({
  selectedApplicants,
  handleApplicantSelection,
  modalType,
  selectedItems,
}) => {
  const { translations } = useLanguage();

  const columns =
    modalType === LookupModalType.USER_LOOKUP
      ? userLookupTableHeaderItems
      : participantTableHeaderItems;

  return (
    <section className="tableContainer">
      <table className="lookup-table">
        <LookupTableHeader tableHeaderItems={columns} />
        <UserLookupTableBody
          items={selectedApplicants}
          columns={columns}
          handleSelection={handleApplicantSelection}
          selectedItems={selectedItems}
        />
      </table>
      {!selectedApplicants?.length && (
        <div>
          <h1>{translations.noApplicants}</h1>
        </div>
      )}
    </section>
  );
};
