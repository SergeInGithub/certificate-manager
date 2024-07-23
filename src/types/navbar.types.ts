import { SVG_COMPONENT_TYPE } from '@components';

export type MenuItem = {
  url: string;
  icon?: {
    type: SVG_COMPONENT_TYPE;
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
