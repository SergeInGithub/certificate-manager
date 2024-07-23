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
import { CERTIFICATE_TYPE } from '@types';
import { addCertificate } from '@utils';

interface CertificateFormProps {
  pdfDataUrl: string | null;
  onReset?: () => void;
}

export const CertificateForm = forwardRef(
  ({ pdfDataUrl, onReset }: CertificateFormProps, ref) => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [certificateType, setCertificateType] = useState('');
    const [supplier, setSupplier] = useState('');

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
        setDateFrom('');
        setDateTo('');
        setCertificateType('');
        setSupplier('');
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
      if (dateFromRef.current && !dateFrom) {
        dateFromRef.current.type = 'text';
      }
    }, [dateFrom]);

    const handleChangeFrom = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateFrom(e.target.value);
      },
      [],
    );

    const handleFocusTo = useCallback(() => {
      if (dateToRef.current) {
        dateToRef.current.type = 'date';
      }
    }, []);

    const handleBlurTo = useCallback(() => {
      if (dateToRef.current && !dateTo) {
        dateToRef.current.type = 'text';
      }
    }, [dateTo]);

    const handleChangeTo = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateTo(e.target.value);
      },
      [],
    );

    const handleChangeCertificateType = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCertificateType(e.target.value);
      },
      [],
    );

    const handleChangeSupplier = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSupplier(e.target.value);
      },
      [],
    );

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dateFromParsed = new Date(dateFrom);
        const dateToParsed = new Date(dateTo);

        const formData = {
          supplier,
          certificateType,
          dateFrom: dateFromParsed,
          dateTo: dateToParsed,
          pdfDataUrl,
        };

        try {
          await addCertificate('CertificatesDB', 1, formData);
          console.log(formData);
          if (formRef.current) {
            formRef.current.reset();
          }
          setDateFrom('');
          setDateTo('');
          setCertificateType('');
          setSupplier('');
          if (onReset) {
            onReset();
          }
        } catch (error) {
          console.error('Error adding certificate:', error);
        }
      },
      [dateFrom, dateTo, supplier, certificateType, pdfDataUrl, onReset],
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
            value={supplier}
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
              options={CERTIFICATE_TYPE}
              className="certificate-type-select"
              placeholder="Select your option"
              value={certificateType}
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
            value={dateFrom}
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
            value={dateTo}
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
