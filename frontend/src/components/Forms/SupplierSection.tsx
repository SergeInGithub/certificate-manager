import React from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { SvgComponent, SvgComponentType } from '@components/Svg';
import { useLanguage } from '@hooks';
import { CertificateDto, TErrors } from '@types';

interface ISupplierSectionProps {
  formData: CertificateDto;
  errors: TErrors;
  openModal: () => void;
  handleSupplierReset: () => void;
}

export const SupplierSection = ({
  formData,
  errors,
  openModal,
  handleSupplierReset,
}: ISupplierSectionProps) => {
  const { translations } = useLanguage();

  return (
    <div className="label-input-container">
      <Label className="supplier-label">{translations.supplier}</Label>
      <Input
        type="text"
        className="supplier-input"
        value={formData.supplier?.name || ''}
      />
      {errors.supplier && <div className="error">{errors.supplier}</div>}

      <div className="input-buttons">
        <Button
          type="button"
          className="search-button"
          onClick={openModal}
        >
          <SvgComponent
            type={SvgComponentType.SEARCH}
            className="search-icon"
          />
        </Button>
        <Button
          type="button"
          className="close-button"
          onClick={handleSupplierReset}
        >
          <SvgComponent
            type={SvgComponentType.CLOSE}
            className="close-icon"
          />
        </Button>
      </div>
    </div>
  );
};
