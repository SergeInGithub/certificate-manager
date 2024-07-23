import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '@data';
import { MenuItem } from '@types';
import { handleNavigate } from '@utils';
import '../assets/styles/components/sidebar.css';
import { HamburgerButton } from './HamburgerButton';
import { MenuItemComponent } from './MenuItem';
import '../assets/styles/components/sidebar.css';

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
  const mobileScreenWidthPx = 834;
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > mobileScreenWidthPx,
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 834);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateSelectedItems = (path: string) => {
    menuItems.forEach((item) => {
      if (item.url === path) {
        setSelectedMenuItem(item.icon?.type ?? null);
        setOpenDropdown((prev) => ({
          ...prev,
          [item.url]: true,
        }));
      } else if (item.subItems) {
        item.subItems.forEach((subItem) => {
          if (subItem.url === path) {
            setSelectedMenuItem(item.icon?.type ?? null);
            setSelectedSubItemUrl(subItem.url);
            setOpenDropdown((prev) => ({
              ...prev,
              [item.url]: true,
            }));
          }
        });
      }
    });
  };

  useEffect(() => {
    updateSelectedItems(location.pathname);
  }, [location.pathname]);

  const handleClick = useCallback(
    (item: MenuItem, event: React.MouseEvent, parentItemType?: string) => {
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
    },
    [navigate],
  );

  const handleSidebarOpen = () => {
    setIsSidebarOpen((prevSidebar) => !prevSidebar);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };
  return (
    <React.Fragment>
      <div className="sidebar-button-container">
        <HamburgerButton
          handleSidebarOpen={handleSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="sidebarOverlay"
          onClick={handleSidebarClose}
        />
      )}

      <aside
        className={`sidebar ${isSidebarOpen ? 'visible' : ''} ${isLargeScreen ? 'large' : ''}`}
        ref={sidebarRef}
      >
        {menuItems.map((item) => (
          <MenuItemComponent
            key={item.url}
            item={item}
            openDropdown={openDropdown}
            selectedMenuItem={selectedMenuItem}
            selectedSubItemUrl={selectedSubItemUrl}
            handleClick={handleClick}
          />
        ))}
      </aside>
    </React.Fragment>
  );
};
