import React, { useState, useEffect } from 'react';
import { addUsers, fetchUsers } from '@utils';
import { TUserApplicant, UserContext } from '@types';
import { hardcodedUserApplicants } from '@data';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<TUserApplicant[]>([]);
  const [activeUser, setActiveUser] = useState<TUserApplicant | null>(null);

  useEffect(() => {
    const initializeUsers = async () => {
      try {
        const existingUsers = await fetchUsers('myDatabase', 1);

        const existingUserIds = new Set(
          existingUsers.map((user) => user.userLookupId),
        );

        const usersToAdd = hardcodedUserApplicants.filter(
          (user) => !existingUserIds.has(user.userLookupId),
        );

        if (usersToAdd.length > 0) {
          await addUsers('myDatabase', 1, usersToAdd);
        }

        const usersFromDB = await fetchUsers('myDatabase', 1);
        setUsers(usersFromDB);
        if (usersFromDB.length > 0) {
          setActiveUser(usersFromDB[0]);
        }
      } catch (error) {
        console.error('Error in initializeUsers:', error);
      }
    };

    initializeUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, activeUser, setActiveUser }}>
      {children}
    </UserContext.Provider>
  );
};
