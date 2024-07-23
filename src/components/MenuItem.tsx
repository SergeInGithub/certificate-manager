import { MenuItem, TMenuItemComponentProps } from '@types';
import React, { useCallback } from 'react';
import { SVG_COMPONENT_TYPE, SvgComponent } from './Svg';
import { isValidSvgType } from '@utils';

export const MenuItemComponent: React.FC<TMenuItemComponentProps> = ({
  item,
  openDropdown,
  selectedMenuItem,
  selectedSubItemUrl,
  handleClick,
}) => {
  const handleItemClick = (e: React.MouseEvent) => handleClick(item, e);

  const handleSubItemClick = (subItem: MenuItem) => (e: React.MouseEvent) => {
    handleClick(subItem, e, item.icon?.type);
  };

  const getColorBasedOnSelection = useCallback(
    (iconType: string | undefined, selectedMenuItem: string | null) => {
      return iconType === selectedMenuItem ? '#3f9ac9' : '#275c79';
    },
    [],
  );

  return (
    <React.Fragment>
      <div
        onClick={handleItemClick}
        className="sub-items"
      >
        <div
          className={`selection-box ${item.icon?.type === selectedMenuItem ? 'primaryColor' : 'transparent'}`}
        />
        <SvgComponent
          type={
            isValidSvgType(item.icon?.type)
              ? item.icon.type
              : SVG_COMPONENT_TYPE.HAMBURGER
          }
          color={getColorBasedOnSelection(item.icon?.type, selectedMenuItem)}
          className="icon"
        />
        <span
          className={`itemName ${item.icon?.type === selectedMenuItem ? 'primary-color' : 'secondary-color'}`}
        >
          {item.name}
        </span>
        {item.subItems && (
          <SvgComponent
            type={SVG_COMPONENT_TYPE.ARROW_DOWN}
            color={getColorBasedOnSelection(item.icon?.type, selectedMenuItem)}
            className="arrowDown"
          />
        )}
      </div>
      {item.subItems && (
        <div
          className={`subItem ${openDropdown[item.url] ? 'subItem-flex' : 'subItem-none'}`}
        >
          {item.subItems.map((subItem) => (
            <span
              key={subItem.url}
              onClick={handleSubItemClick(subItem)}
              className={`${subItem.url === selectedSubItemUrl ? 'primary-color' : 'secondary-color'}`}
            >
              {subItem.name}
            </span>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
