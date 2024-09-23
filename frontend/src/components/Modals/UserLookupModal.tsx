import React, { useEffect, useState } from 'react';
import { LookupModal } from './LookupModal';
import { hardcodedUserApplicants } from '@data';
import { LookupModalType, TUserApplicant } from '@types';
import { addUsers, fetchUsers } from '@utils';
import { useLanguage } from '@hooks';

interface UserLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: TUserApplicant[];
  setSelectedItems: React.Dispatch<React.SetStateAction<TUserApplicant[]>>;
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
  const [users, setUsers] = useState<TUserApplicant[]>([]);

  const { translations } = useLanguage();

  useEffect(() => {
    const initializeUsers = async () => {
      try {
        const existingUsers = await fetchUsers('CertificateDb', 1);
        console.log('Existing Users:', existingUsers);

        const existingUserIds = new Set(
          existingUsers.map((user) => user.userLookupId),
        );
        console.log('Existing User IDs:', existingUserIds);

        const usersToAdd = hardcodedUserApplicants.filter(
          (user) => !existingUserIds.has(user.userLookupId),
        );
        console.log('Users to Add:', usersToAdd);

        if (usersToAdd.length > 0) {
          await addUsers('CertificateDb', 1, usersToAdd);
        }

        const usersFromDB = await fetchUsers('CertificateDb', 1);
        console.log('Users from DB:', usersFromDB);
        setUsers(usersFromDB);
      } catch (error) {
        console.error('Error in initializeUsers:', error);
      }
    };

    if (isOpen) {
      initializeUsers();
    }
  }, [isOpen]);

  const criteria = [
    { id: 'userLookupName', label: 'Name', value: name, setValue: setName },
    {
      id: 'userLookupFirstName',
      value: firstName,
      setValue: setFirstName,
    },
    {
      id: 'userLookupId',
      value: userId,
      setValue: setUserId,
    },
    {
      id: 'userLookupDepartment',
      value: department,
      setValue: setDepartment,
    },
    {
      id: 'userLookupPlant',
      value: plant,
      setValue: setPlant,
    },
  ];

  const handleSelectButtonClick = () => {
    setSelectedItems(selectedItems);
    onClose();
  };

  const handleSelection = (item: TUserApplicant) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.id === item.id,
      );
      if (isSelected) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id,
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
