import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '@data';
import { MenuItem } from '@types';
import { handleNavigate } from '@utils';
import '../assets/styles/components/sidebar.css';
import { SvgComponent } from './Svg';

export const Sidebar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(
    'home',
  );
  const [selectedSubItemUrl, setSelectedSubItemUrl] = useState<string | null>(
    null,
  );

  const navigate = useNavigate();

  const handleClick = (
    item: MenuItem,
    event: React.MouseEvent,
    parentItemType?: string,
  ) => {
    event.stopPropagation();
    if (item.subItems) {
      setSelectedMenuItem(item.icon?.type ?? null);
      setOpenDropdown((prev) => ({
        ...prev,
        [item.url]: !prev[item.url],
      }));
    } else {
      setSelectedMenuItem(parentItemType ?? item.icon?.type ?? null);
      setSelectedSubItemUrl(item.url);
      handleNavigate(item.url, navigate);
      if (item.icon?.type === 'home') {
        setOpenDropdown({});
      }
    }
  };

  return (
    <aside className="sidebar">
      <div>
        {menuItems.map((item) => (
          <React.Fragment key={item.url}>
            <div onClick={(e) => handleClick(item, e)} className="sub-items">
              <div
                className="selection-box"
                style={{
                  backgroundColor:
                    item.icon?.type === selectedMenuItem
                      ? '#3f9ac9'
                      : 'transparent',
                }}
              />
              <SvgComponent
                type={item.icon?.type ?? ''}
                color={`${item.icon?.type === selectedMenuItem ? '#3f9ac9' : '#275c79'}`}
                className="icon"
              />
              <span
                style={{
                  color:
                    item.icon?.type === selectedMenuItem
                      ? '#3f9ac9'
                      : '#275c79',
                }}
              >
                {item.name}
              </span>
              {item.subItems && (
                <SvgComponent
                  type="arrowDown"
                  color={`${item.icon?.type === selectedMenuItem ? '#3f9ac9' : '#275c79'}`}
                  className="arrowDown"
                />
              )}
            </div>
            {item.subItems && (
              <div
                style={{ display: openDropdown[item.url] ? 'flex' : 'none' }}
                className="subItem"
              >
                {item.subItems.map((subItem) => (
                  <span
                    key={subItem.url}
                    onClick={(e) => handleClick(subItem, e, item.icon?.type)}
                    style={{
                      color:
                        subItem.url === selectedSubItemUrl
                          ? '#3f9ac9'
                          : '#275c79',
                    }}
                  >
                    {subItem.name}
                  </span>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
};
