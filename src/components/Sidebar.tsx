import React, { useState, Dispatch, SetStateAction } from 'react';
import { menuItems } from '@data';
import { MenuItem } from '@utils/types';

interface SidebarProps {
  setSelectedItem: Dispatch<SetStateAction<MenuItem>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ setSelectedItem }) => {
  const [openDropdown, setOpenDropdown] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleClick = (item: MenuItem, event: React.MouseEvent) => {
    event.stopPropagation();
    if (item.subItems) {
      setOpenDropdown((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <aside className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} onClick={(e) => handleClick(item, e)}>
            {item.name}
            {item.subItems && (
              <ul style={{ display: openDropdown[item.id] ? 'block' : 'none' }}>
                {item.subItems.map((subItem) => (
                  <li key={subItem.id} onClick={(e) => handleClick(subItem, e)}>
                    {subItem.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};
