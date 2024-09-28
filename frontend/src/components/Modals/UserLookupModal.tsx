import React, { useEffect, useState } from 'react';
import { LookupModal } from './LookupModal';
import { hardcodedUserApplicants } from '@data';
import { LookupModalType, UserDto } from '@types';
import { addUsers, fetchUsers } from '@utils';
import { useLanguage } from '@hooks';

interface UserLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: UserDto[];
  setSelectedItems: React.Dispatch<React.SetStateAction<UserDto[]>>;
  cancelSelections: () => void;
}

export const UserLookupModal: React.FC<UserLookupModalProps> = ({
  isOpen,
  onClose,
  selectedItems,
  setSelectedItems,
  cancelSelections,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userIndex, setUserIndex] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [plant, setPlant] = useState('');
  const [users, setUsers] = useState<UserDto[]>([]);

  const { translations } = useLanguage();

  const criteria = [
    { id: 'lastName', label: 'Name', value: lastName, setValue: setLastName },
    {
      id: 'firstName',
      value: firstName,
      setValue: setFirstName,
    },
    {
      id: 'userIndex',
      value: userIndex,
      setValue: setUserIndex,
    },
    {
      id: 'departmentName',
      value: departmentName,
      setValue: setDepartmentName,
    },
    {
      id: 'plant',
      value: plant,
      setValue: setPlant,
    },
  ];

  const handleSelectButtonClick = () => {
    setSelectedItems(selectedItems);
    onClose();
  };

  const handleSelection = (item: UserDto) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.userId === item.userId,
      );
      if (isSelected) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem.userId !== item.userId,
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

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
      handleSelectButtonClick={handleSelectButtonClick}
      handleApplicantSelection={handleSelection}
    />
  );
};
