export type MenuItem = {
  url: string;
  icon?: {
    type: string;
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
