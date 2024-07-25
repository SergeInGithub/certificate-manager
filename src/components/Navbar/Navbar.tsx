import React, { useCallback, useState } from 'react';
import '../../assets/styles/components/navbar.css';
import { Select } from '@components/Select';
import { LanguageOptions } from '@types';
import { SvgComponent, SvgComponentType } from '@components/Svg';
import { Label } from '@components/Label';
import { useLanguage, useUser } from '@hooks';

export const Navbar: React.FC = () => {
  const { language, setLanguage, translations } = useLanguage();
  const { users, activeUser, setActiveUser } = useUser();

  const userNames = users.map((user) => user.userLookupName);
  const userNameToIdMap = new Map(
    users.map((user) => [user.userLookupName, user.userLookupId]),
  );

  const handleChangeLanguageType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value as LanguageOptions;
      setLanguage(selectedValue);
    },
    [setLanguage],
  );

  const handleUserSelection = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedUserName = e.target.value;
      const selectedUserId = userNameToIdMap.get(selectedUserName) || '';
      const selectedUser =
        users.find((user) => user.userLookupId === selectedUserId) || null;
      setActiveUser(selectedUser);
    },
    [users, userNameToIdMap, setActiveUser],
  );

  return (
    <>
      <nav>
        <div className="nav-header-container">
          <h1>DCCS Tuzla</h1>
        </div>

        <section className="language-selector-container">
          <section className="language-selector-container">
            <Label
              children={`${translations.activeUser}:`}
              className="language-selector-label"
            />

            <div className="custom-select-container">
              <Select
                options={userNames}
                className="language-type-select"
                value={activeUser ? activeUser.userLookupName : ''}
                onChange={handleUserSelection}
              />

              <div className="language-select-icon">
                <SvgComponent
                  type={SvgComponentType.SELECTED_DOWN_ARROW}
                  className="custom-select-arrow-icon"
                />
              </div>
            </div>
          </section>

          <section className="language-selector-container">
            <Label
              children={`${translations.language}:`}
              className="language-selector-label"
            />

            <div className="custom-select-container">
              <Select
                options={Object.values(LanguageOptions)}
                className="language-type-select"
                value={language}
                onChange={handleChangeLanguageType}
              />

              <div className="language-select-icon">
                <SvgComponent
                  type={SvgComponentType.SELECTED_DOWN_ARROW}
                  className="custom-select-arrow-icon"
                />
              </div>
            </div>
          </section>
        </section>
      </nav>
    </>
  );
};
