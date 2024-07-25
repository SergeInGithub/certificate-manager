import React, { useState } from 'react';
import { LookupModal } from './LookupModal';
import { LookupModalType } from '@types';
import { useLanguage, useUser } from '@hooks';

interface UserLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: any;
  setSelectedItems: any;
  cancelSelections: () => void;
}

export const UserLookupModal: React.FC<UserLookupModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  setSelectedItems,
  cancelSelections,
}) => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userId, setUserId] = useState('');
  const [department, setDepartment] = useState('');
  const [plant, setPlant] = useState('');

  const { translations } = useLanguage();
  const { users } = useUser();

  const criteria = [
    { id: 'userLookupName', label: 'Name', value: name, setValue: setName },
    {
      id: 'userLookupFirstName',
      label: 'First Name',
      value: firstName,
      setValue: setFirstName,
    },
    {
      id: 'userLookupId',
      label: 'User ID',
      value: userId,
      setValue: setUserId,
    },
    {
      id: 'userLookupDepartment',
      label: 'Department',
      value: department,
      setValue: setDepartment,
    },
    { id: 'userLookupPlant', label: 'Plant', value: plant, setValue: setPlant },
  ];

  return (
    <LookupModal
      isOpen={isOpen}
      onClose={onClose}
      title={translations.searchForPersons}
      criteria={criteria}
      users={users}
      modalType={LookupModalType.USER_LOOKUP}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      cancelSelections={cancelSelections}
    />
  );
};
