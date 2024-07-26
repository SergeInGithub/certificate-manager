import React from 'react';
import { Button } from '../Button';
import { SvgComponent } from '../Svg';
import { LookupHeader } from '../LookupHeader';
import { Input } from '../Input';
import { Label } from '../Label';
import { UserLookupTable } from '../Tables';
import '../../assets/styles/components/userLookupModal.css';
import { useLanguage } from '@hooks';
import { hardcodedUserApplicants } from '@data';

interface UserLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserLookupModal: React.FC<UserLookupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { translations } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="supplier-lookup-modal">
      <div className="supplier-lookup-modal-content">
        <section className="lookup-modal-header-section">
          <h6 className="lookup-modal-header">
            {translations.searchForPersons}
          </h6>
          <Button
            type="button"
            children={
              <SvgComponent
                type="close"
                className="lookup-close-icon"
              />
            }
            className="lookup-close-button"
            onClick={onClose}
          />
        </section>

        <section className="user-lookup-search-criteria-container">
          <LookupHeader heading={translations.searchCriteria} />

          <section className="user-inputs-container">
            <div className="lookup-label-input-container">
              <Label className="supplier-label">
                {translations.userLookupName}
              </Label>
              <Input
                type="text"
                className="supplier-input"
              />
            </div>

            <div className="lookup-label-input-container">
              <Label className="supplier-label">
                {translations.userLookupFirstName}
              </Label>
              <Input
                type="text"
                className="supplier-input"
              />
            </div>

            <div className="lookup-label-input-container">
              <Label className="supplier-label">
                {translations.userLookupId}
              </Label>
              <Input
                type="text"
                className="supplier-input"
              />
            </div>

            <div className="lookup-label-input-container">
              <Label className="supplier-label">
                {translations.userLookupDepartment}
              </Label>
              <Input
                type="text"
                className="supplier-input"
              />
            </div>

            <div className="lookup-label-input-container">
              <Label className="supplier-label">
                {translations.userLookupPlant}
              </Label>
              <Input
                type="text"
                className="supplier-input"
              />
            </div>
          </section>

          <section className="user-lookup-search-criteria-button-section">
            <Button
              type="button"
              children={translations.searchButton}
              className="lookup-search-button"
            />
            <Button
              type="button"
              children={translations.resetButton}
              className="lookup-reset-button"
            />
          </section>
        </section>

        <section className="supplier-list-container">
          <LookupHeader heading={translations.personList} />

          <section className="supplier-list-table-container">
            <UserLookupTable users={hardcodedUserApplicants} />
          </section>

          <section className="user-lookup-person-list-button-section">
            <Button
              type="button"
              children={translations.selectButton}
              className="lookup-save-button"
            />
            <Button
              type="button"
              children={translations.cancelButton}
              className="lookup-cancel-button"
            />
          </section>
        </section>
      </div>
    </div>
  );
};
