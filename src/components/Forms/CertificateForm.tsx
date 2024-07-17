import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import '../../assets/styles/components/certificateForm.css';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { Select } from '@components/Select';
import { Button } from '@components/Button';
import { SVG_COMPONENT_TYPE, SvgComponent } from '@components/Svg';
import { CertificateType, TCertificate } from '@types';
import { addCertificate } from '@utils';

interface CertificateFormProps {
  pdfDataUrl: string | null;
  onReset?: () => void;
}

export const CertificateForm = forwardRef(
  ({ pdfDataUrl, onReset }: CertificateFormProps, ref) => {
    const [formData, setFormData] = useState<TCertificate>({
      dateFrom: null,
      dateTo: null,
      certificateType: undefined,
      supplier: '',
    });

    const dateFromRef = useRef<HTMLInputElement | null>(null);
    const dateToRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    useImperativeHandle(ref, () => ({
      submit: () => {
        if (formRef.current) {
          formRef.current.dispatchEvent(
            new Event('submit', { cancelable: true, bubbles: true }),
          );
        }
      },
      reset: () => {
        setFormData({
          dateFrom: null,
          dateTo: null,
          certificateType: undefined,
          supplier: '',
        });
        if (onReset) {
          onReset();
        }
      },
    }));

    const handleFocusFrom = useCallback(() => {
      if (dateFromRef.current) {
        dateFromRef.current.type = 'date';
      }
    }, []);

    const handleBlurFrom = useCallback(() => {
      if (dateFromRef.current && !formData.dateFrom) {
        dateFromRef.current.type = 'text';
      }
    }, [formData.dateFrom]);

    const handleChangeFrom = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          dateFrom: e.target.value ? new Date(e.target.value) : null,
        }));
      },
      [],
    );

    const handleFocusTo = useCallback(() => {
      if (dateToRef.current) {
        dateToRef.current.type = 'date';
      }
    }, []);

    const handleBlurTo = useCallback(() => {
      if (dateToRef.current && !formData.dateTo) {
        dateToRef.current.type = 'text';
      }
    }, [formData.dateTo]);

    const handleChangeTo = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          dateTo: e.target.value ? new Date(e.target.value) : null,
        }));
      },
      [],
    );

    const handleChangeCertificateType = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as CertificateType;
        setFormData((prev) => ({
          ...prev,
          certificateType: selectedValue,
        }));
      },
      [],
    );

    const handleChangeSupplier = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          supplier: e.target.value,
        }));
      },
      [],
    );

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSend = {
          ...formData,
          pdfDataUrl,
        };

        try {
          await addCertificate('CertificatesDB', 1, formDataToSend);
          if (formRef.current) {
            formRef.current.reset();
          }
          setFormData({
            dateFrom: null,
            dateTo: null,
            certificateType: undefined,
            supplier: '',
          });
          if (onReset) {
            onReset();
          }
        } catch (error) {
          console.error('Error adding certificate:', error);
        }
      },
      [formData, pdfDataUrl, onReset],
    );

    return (
      <form
        className="certificate-form"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="label-input-container">
          <Label
            children="Supplier"
            className="supplier-label"
          />
          <Input
            type="text"
            className="supplier-input"
            value={formData.supplier}
            onChange={handleChangeSupplier}
          />

          <div className="input-buttons">
            <Button
              type="button"
              children={
                <SvgComponent
                  type={SVG_COMPONENT_TYPE.SEARCH}
                  className="search-icon"
                />
              }
              className="search-button"
            />
            <Button
              type="button"
              children={
                <SvgComponent
                  type={SVG_COMPONENT_TYPE.CLOSE}
                  className="close-icon"
                />
              }
              className="close-button"
            />
          </div>
        </div>

        <div className="label-input-container">
          <Label
            children="Certificate type"
            className="certificate-type-label"
          />

          <div className="custom-select-container">
            <Select
              options={Object.values(CertificateType)}
              className="certificate-type-select"
              placeholder="Select your option"
              value={formData.certificateType}
              onChange={handleChangeCertificateType}
            />
            <div className="custom-select-icon">
              <SvgComponent
                type={SVG_COMPONENT_TYPE.SELECTED_DOWN_ARROW}
                className="custom-select-arrow-icon"
              />
            </div>
          </div>
        </div>

        <div className="label-input-container">
          <Label
            children="Valid from"
            className="valid-from-label"
          />
          <Input
            ref={dateFromRef}
            type="text"
            value={
              formData.dateFrom
                ? formData.dateFrom.toISOString().split('T')[0]
                : ''
            }
            onChange={handleChangeFrom}
            placeholder="Click to select date"
            onFocus={handleFocusFrom}
            onBlur={handleBlurFrom}
            className="valid-from-input"
          />
        </div>

        <div className="label-input-container">
          <Label
            children="Valid to"
            className="valid-to-label"
          />
          <Input
            ref={dateToRef}
            type="text"
            value={
              formData.dateTo ? formData.dateTo.toISOString().split('T')[0] : ''
            }
            onChange={handleChangeTo}
            placeholder="Click to select date"
            onFocus={handleFocusTo}
            onBlur={handleBlurTo}
            className="valid-to-input"
          />
        </div>
      </form>
    );
  },
);