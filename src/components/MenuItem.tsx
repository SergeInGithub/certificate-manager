import { MenuItem } from '@types';
import React from 'react';
import { SVG_COMPONENT_TYPE, SvgComponent } from './Svg';

export const MenuItemComponent: React.FC<{
  item: MenuItem;
  openDropdown: { [key: string]: boolean };
  selectedMenuItem: string | null;
  selectedSubItemUrl: string | null;
  handleClick: (
    item: MenuItem,
    event: React.MouseEvent,
    parentItemType?: string,
  ) => void;
}> = ({
  item,
  openDropdown,
  selectedMenuItem,
  selectedSubItemUrl,
  handleClick,
}) => {
  const isValidSvgType = (
    type: string | undefined,
  ): type is SVG_COMPONENT_TYPE => {
    return Object.values(SVG_COMPONENT_TYPE).includes(
      type as SVG_COMPONENT_TYPE,
    );
  };

  return (
    <React.Fragment>
      <div
        onClick={(e) => handleClick(item, e)}
        className="sub-items"
      >
        <div
          className="selection-box"
          style={{
            backgroundColor:
              item.icon?.type === selectedMenuItem ? '#3f9ac9' : 'transparent',
          }}
        />
        <SvgComponent
          type={
            isValidSvgType(item.icon?.type)
              ? item.icon.type
              : SVG_COMPONENT_TYPE.HAMBURGER
          }
          color={`${item.icon?.type === selectedMenuItem ? '#3f9ac9' : '#275c79'}`}
          className="icon"
        />
        <span
          style={{
            color: item.icon?.type === selectedMenuItem ? '#3f9ac9' : '#275c79',
          }}
          className="itemName"
        >
          {item.name}
        </span>
        {item.subItems && (
          <SvgComponent
            type={SVG_COMPONENT_TYPE.ARROW_DOWN}
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
                  subItem.url === selectedSubItemUrl ? '#3f9ac9' : '#275c79',
              }}
            >
              {subItem.name}
            </span>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
