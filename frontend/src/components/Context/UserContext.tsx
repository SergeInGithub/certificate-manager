import React, { useState, useEffect } from 'react';
import { UserContext, UserDto } from '@types';
import { apiClient } from '@utils';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [activeUser, setActiveUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const initializeUsers = async () => {
      try {
        const response = await apiClient.getUsers();
        const usersFromBackend = response.data;

        setUsers(usersFromBackend.data);
        if (usersFromBackend.data.length > 0) {
          setActiveUser(usersFromBackend.data[0]);
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
