import { createContext } from 'react';
import { TUserApplicant } from './table.types';

export type TUserContext = {
  users: TUserApplicant[];
  activeUser: TUserApplicant | null;
  setActiveUser: (user: TUserApplicant | null) => void;
};

export const UserContext = createContext<TUserContext | undefined>(undefined);
