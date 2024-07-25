import React, { useCallback, useState } from 'react';
import '../../assets/styles/components/navbar.css';
import { Select } from '@components/Select';
import { LanguageOptions } from '@types';
import { SvgComponent } from '@components/Svg';
import { Label } from '@components/Label';

export const Navbar: React.FC = () => {
  const [languageType, setLanguageType] = useState<LanguageOptions>(
    LanguageOptions.ENGLISH,
  );

  const handleChangeLanguageType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value as LanguageOptions;
      setLanguageType(selectedValue);
    },
    [],
  );

  return (
    <>
      <nav>
        <div className="nav-header-container">
          <h1>DCCS Tuzla</h1>
        </div>

        <section className="language-selector-container">
          <Label
            children="Language:"
            className="language-selector-label"
          />

          <div className="custom-select-container">
            <Select
              options={Object.values(LanguageOptions)}
              className="language-type-select"
              value={languageType}
              onChange={handleChangeLanguageType}
            />

            <div className="language-select-icon">
              <SvgComponent
                type="selectDownArrow"
                className="custom-select-arrow-icon"
              />
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};
