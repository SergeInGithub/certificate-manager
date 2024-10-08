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
  SupplierDto,
  UserDto,
} from '@types';
import { searchSupplier, searchUser } from '@utils';

export const LookupModal: React.FC<LookupModalProps> = ({
  isOpen,
  onClose,
  title,
  criteria,
  users,
  modalType,
  selectedItems = [],
  setSelectedItems,
  cancelSelections,
  handleSelectButtonClick,
  handleApplicantSelection,
  handleSupplierSelection,
}) => {
  const { translations } = useLanguage();

  const [userApplicants, setUserApplicants] = useState<UserDto[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierDto[]>([]);
  const [filteredUserApplicants, setFilteredUserApplicants] = useState<
    UserDto[]
  >([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierDto[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (modalType === LookupModalType.USER_LOOKUP) {
        setUserApplicants(users as UserDto[]);
        setFilteredUserApplicants(selectedItems as UserDto[]);
      } else if (modalType === LookupModalType.SUPPLIER_LOOKUP) {
        setSuppliers(users as SupplierDto[]);
        setFilteredSuppliers(selectedItems as SupplierDto[]);
      }
    }
  }, [isOpen, users, modalType]);

  if (!isOpen) return null;

  const handleSearch = async () => {
    try {
      if (modalType === LookupModalType.USER_LOOKUP) {
        const [lastName, firstName, userIndex, departmentName, plant] =
          criteria.map((criterion) => criterion.value);
        const filtered = await searchUser(
          firstName,
          lastName,
          userIndex,
          plant,
          departmentName,
        );
        setFilteredUserApplicants(filtered as UserDto[]);
      } else if (modalType === LookupModalType.SUPPLIER_LOOKUP) {
        const [name, supplierIndex, city] = criteria.map(
          (criterion) => criterion.value,
        );
        const filtered = await searchSupplier(name, supplierIndex, city);
        setFilteredSuppliers(filtered as SupplierDto[]);
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
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

  const handleSelection = (item: UserDto | SupplierDto) => {
    if (modalType === LookupModalType.USER_LOOKUP && handleApplicantSelection) {
      handleApplicantSelection(item as UserDto);
    } else if (
      modalType === LookupModalType.SUPPLIER_LOOKUP &&
      handleSupplierSelection
    ) {
      handleSupplierSelection(item as SupplierDto);
    }
  };

  const isDisabled = !selectedItems.length;

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
                selectedSupplier={selectedItems?.[0] as SupplierDto}
              />
            ) : (
              <UserLookupTable
                selectedApplicants={filteredUserApplicants}
                modalType={modalType}
                handleApplicantSelection={
                  handleSelection as (applicant: UserDto) => void
                }
                selectedItems={selectedItems as UserDto[]}
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
              className={`lookup-save-button ${isDisabled ? 'disabled' : ''}`}
              disabled={isDisabled}
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
