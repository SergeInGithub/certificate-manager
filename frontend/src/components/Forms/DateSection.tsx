import React from 'react';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { useLanguage } from '@hooks';
import { CertificateDto, TErrors } from '@types';

interface IDateSectionProps {
  formData: CertificateDto;
  errors: TErrors;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const DateSection = ({
  formData,
  errors,
  handleChange,
}: IDateSectionProps) => {
  const { translations } = useLanguage();

  return (
    <React.Fragment>
      <div className="label-input-container">
        <Label className="valid-from-label">{translations.validFrom}</Label>
        <Input
          name="validFrom"
          type="date"
          value={
            formData.validFrom
              ? formData.validFrom.toISOString().split('T')[0]
              : ''
          }
          onChange={handleChange}
          placeholder={translations.selectDatePlaceholder}
          className="valid-from-input"
        />
        {errors.validFrom && <div className="error">{errors.validFrom}</div>}
      </div>

      <div className="label-input-container">
        <Label className="valid-to-label">{translations.validTo}</Label>
        <Input
          name="validTo"
          type="date"
          value={
            formData.validTo ? formData.validTo.toISOString().split('T')[0] : ''
          }
          onChange={handleChange}
          placeholder={translations.selectDatePlaceholder}
          className="valid-to-input"
        />
        {errors.validTo && <div className="error">{errors.validTo}</div>}
      </div>
    </React.Fragment>
  );
};
