import React, { useEffect, useState } from 'react';
import { LookupModal } from './LookupModal';
import { hardcodedUserApplicants } from '@data';
import { LookupModalType } from '@types';
import { addUsers, fetchUsers } from '@utils';
import { useLanguage } from '@hooks';

interface UserLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserLookupModal: React.FC<UserLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userId, setUserId] = useState('');
  const [department, setDepartment] = useState('');
  const [plant, setPlant] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  const { translations } = useLanguage();

  useEffect(() => {
    const initializeUsers = async () => {
      try {
        const existingUsers = await fetchUsers('myDatabase', 1);
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
          await addUsers('myDatabase', 1, usersToAdd);
        }

        const usersFromDB = await fetchUsers('myDatabase', 1);
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
    />
  );
};
