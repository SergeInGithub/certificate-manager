import { createContext } from 'react';
import { UserDto } from './certificate.types';

export type TUserContext = {
  users: UserDto[];
  activeUser: UserDto | null;
  setActiveUser: (user: UserDto | null) => void;
};

export const UserContext = createContext<TUserContext | undefined>(undefined);
