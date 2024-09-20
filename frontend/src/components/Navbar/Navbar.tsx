import React, { useCallback } from 'react';
import '../../assets/styles/components/navbar.css';
import { Select } from '@components/Select';
import { LanguageOptions } from '@types';
import { SvgComponent, SvgComponentType } from '@components/Svg';
import { Label } from '@components/Label';
import { useLanguage } from '@hooks';

export const Navbar: React.FC = () => {
  const { language, setLanguage, translations } = useLanguage();

  const handleChangeLanguageType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value as LanguageOptions;
      setLanguage(selectedValue);
    },
    [setLanguage],
  );

  return (
    <>
      <nav>
        <div className="nav-header-container">
          <h1>DCCS Tuzla</h1>
        </div>

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
      </nav>
    </>
  );
};
