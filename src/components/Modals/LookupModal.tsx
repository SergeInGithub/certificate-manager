import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { SvgComponent, SvgComponentType } from '../Svg';
import { LookupHeader } from '../LookupHeader';
import { Input } from '../Input';
import { Label } from '../Label';
import '../../assets/styles/components/lookupModal.css';
import { useLanguage } from '@hooks';
import { SupplierLookupTable, UserLookupTable } from '@components/Tables';
import {
  LookupModalProps,
  LookupModalType,
  TSupplier,
  TUserApplicant,
} from '@types';
import { searchSuppliers, searchUsers } from '@utils';

export const LookupModal: React.FC<LookupModalProps> = ({
  isOpen,
  onClose,
  title,
  criteria,
  users,
  modalType,
  selectedItems,
  setSelectedItems,
  cancelSelections,
  handleSelectButtonClick,
  handleApplicantSelection,
  handleSupplierSelection,
}) => {
  const { translations } = useLanguage();

  const [userApplicants, setUserApplicants] = useState<TUserApplicant[]>([]);
  const [suppliers, setSuppliers] = useState<TSupplier[]>([]);
  const [filteredUserApplicants, setFilteredUserApplicants] = useState<
    TUserApplicant[]
  >([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<TSupplier[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (modalType === LookupModalType.USER_LOOKUP) {
        setUserApplicants(users as TUserApplicant[]);
        setFilteredUserApplicants(users as TUserApplicant[]);
      } else if (modalType === LookupModalType.SUPPLIER_LOOKUP) {
        setSuppliers(users as TSupplier[]);
        setFilteredSuppliers(users as TSupplier[]);
      }
    }
  }, [isOpen, users, modalType]);

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (modalType === LookupModalType.USER_LOOKUP) {
      const [userName, userFirstName, userId, userDepartment, userPlant] =
        criteria.map((criterion) => criterion.value);
      const filtered = await searchUsers(
        'CertificateDb',
        1,
        userName,
        userFirstName,
        userId,
        userDepartment,
        userPlant,
      );
      setFilteredUserApplicants(filtered as TUserApplicant[]);
    } else if (modalType === LookupModalType.SUPPLIER_LOOKUP) {
      const [name, index, city] = criteria.map((criterion) => criterion.value);
      const filtered = await searchSuppliers(
        'CertificateDb',
        1,
        name,
        index,
        city,
      );
      setFilteredSuppliers(filtered as TSupplier[]);
    }
  };

  const handleReset = () => {
    criteria.forEach((criterion) => criterion.setValue(''));
    if (modalType === LookupModalType.USER_LOOKUP) {
      setFilteredUserApplicants(userApplicants);
    } else if (modalType === LookupModalType.SUPPLIER_LOOKUP) {
      setFilteredSuppliers(suppliers);
    }
    if (setSelectedItems) {
      setSelectedItems([]);
    }
  };

  const handleSelection = (item: TUserApplicant | TSupplier) => {
    if (modalType === LookupModalType.USER_LOOKUP && handleApplicantSelection) {
      handleApplicantSelection(item as TUserApplicant);
    } else if (
      modalType === LookupModalType.SUPPLIER_LOOKUP &&
      handleSupplierSelection
    ) {
      handleSupplierSelection(item as TSupplier);
    }
  };

  return (
    <div className="lookup-modal">
      <div className="lookup-modal-content">
        <section className="lookup-modal-header-section">
          <h6 className="lookup-modal-header">{title}</h6>
          <Button
            type="button"
            children={
              <SvgComponent
                type={SvgComponentType.CLOSE}
                className="lookup-close-icon"
              />
            }
            className="lookup-close-button"
            onClick={onClose}
          />
        </section>

        <section
          className={`search-criteria-container ${modalType === LookupModalType.SUPPLIER_LOOKUP ? '' : 'user-search-criteria-container'}`}
        >
          <LookupHeader heading={translations.searchCriteria} />
          <section
            className={`inputs-container ${modalType === LookupModalType.SUPPLIER_LOOKUP ? '' : 'user-inputs-container'}`}
          >
            {criteria.map((criterion, index) => (
              <div
                className="lookup-label-input-container"
                key={index}
              >
                <Label
                  children={translations[criterion.id]}
                  className="supplier-label"
                />
                <Input
                  type="text"
                  value={criterion.value}
                  onChange={(e) => criterion.setValue(e.target.value)}
                  className="supplier-input"
                />
              </div>
            ))}
          </section>
          <section
            className={`search-criteria-button-section ${modalType === LookupModalType.SUPPLIER_LOOKUP ? '' : 'user-search-criteria-button-section'}`}
          >
            <Button
              type="button"
              onClick={handleSearch}
              children={translations.searchButton}
              className="lookup-search-button"
            />
            <Button
              type="button"
              onClick={handleReset}
              children={translations.resetButton}
              className="lookup-reset-button"
            />
          </section>
        </section>

        <section className="list-container">
          <LookupHeader
            heading={
              modalType === LookupModalType.SUPPLIER_LOOKUP
                ? translations.supplierList
                : translations.personList
            }
          />
          <section className="list-table-container">
            {modalType === LookupModalType.SUPPLIER_LOOKUP ? (
              <SupplierLookupTable
                selectedSuppliers={filteredSuppliers}
                handleSupplierSelection={handleSelection}
                selectedSupplier={selectedItems?.[0] as TSupplier}
              />
            ) : (
              <UserLookupTable
                selectedApplicants={filteredUserApplicants}
                modalType={modalType}
                handleApplicantSelection={
                  handleSelection as (applicant: TUserApplicant) => void
                }
                selectedItems={selectedItems as TUserApplicant[]}
              />
            )}
          </section>
          <section
            className={`search-criteria-button-section ${modalType === LookupModalType.SUPPLIER_LOOKUP ? '' : 'user-search-criteria-button-section'}`}
          >
            <Button
              type="button"
              onClick={handleSelectButtonClick}
              children={translations.selectButton}
              className="lookup-save-button"
            />
            <Button
              type="button"
              children={translations.cancelButton}
              className="lookup-cancel-button"
              onClick={cancelSelections}
            />
          </section>
        </section>
      </div>
    </div>
  );
};
