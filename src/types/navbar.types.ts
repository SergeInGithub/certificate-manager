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
