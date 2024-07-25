import { SvgComponentType } from '@components';
import { createContext } from 'react';

export type MenuItem = {
  url: string;
  icon?: {
    type: SvgComponentType;
    color: string;
  };
  name: string;
  content?: string;
  subItems?: MenuItem[];
};

export type TMenuItemComponentProps = {
  item: MenuItem;
  openDropdown: { [key: string]: boolean };
  selectedMenuItem: string | null;
  selectedSubItemUrl: string | null;
  handleClick: (
    item: MenuItem,
    event: React.MouseEvent,
    parentItemType?: string,
  ) => void;
};

export enum LanguageOptions {
  ENGLISH = 'English',
  GERMAN = 'German',
}

export type Language = LanguageOptions;

export type TLanguageContextProps = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
};

export const LanguageContext = createContext<TLanguageContextProps | undefined>(
  undefined,
);
