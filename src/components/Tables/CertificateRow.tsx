import React, { useState, useEffect, useRef } from 'react';
import { useFormatDate } from '@hooks';
import { SvgComponent } from '@components/Svg';
import { TCertificate } from '@types';

interface ICertificateRowProps {
  certificate: TCertificate;
  isLastRow: boolean;
}

export const CertificateRow: React.FC<ICertificateRowProps> = ({
  certificate,
  isLastRow,
}) => {
  const [isGearOpen, setIsGearOpen] = useState(false);
  const gearRef = useRef<HTMLTableDataCellElement>(null);

  const handleGearOpen = () => {
    setIsGearOpen((prevGear) => !prevGear);
  };

  useEffect(() => {
    if (isGearOpen && isLastRow && gearRef.current) {
      const menuElement = gearRef.current.querySelector(
        '.gear-menu',
      ) as HTMLElement;
      if (menuElement) {
        menuElement.style.marginTop = '-50px';
      }
    }
  }, [isGearOpen, isLastRow]);

  const formatDate = useFormatDate();

  return (
    <React.Fragment>
      <tr key={certificate.id}>
        <td
          className="gear"
          ref={gearRef}
        >
          <SvgComponent
            className="gear-button"
            type="gear"
            color="#275c79"
            onClick={handleGearOpen}
          />
          {isGearOpen && (
            <div className="gear-menu">
              <span>Edit</span>
              <span>Delete</span>
            </div>
          )}
        </td>
        <td>{certificate.supplier}</td>
        <td>{certificate.certificateType}</td>
        <td>{formatDate(certificate.dateFrom)}</td>
        <td>{formatDate(certificate.dateTo)}</td>
      </tr>
    </React.Fragment>
  );
};
