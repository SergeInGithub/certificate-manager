import React, { useState, useRef, useCallback } from 'react';
import { useFormatDate } from '@hooks';
import { SvgComponentType, SvgComponent } from '@components/Svg';
import { TCertificate } from '@types';
import { handleNavigate } from '@utils';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleGearOpen = useCallback(() => {
    setIsGearOpen((prevGear) => !prevGear);
  }, []);

  const formatDate = useFormatDate();

  const handleEditClick = useCallback(() => {
    handleNavigate(`/ml/edit-certificate/${certificate.id}`, navigate);
  }, [certificate.id, navigate]);

  return (
    <React.Fragment>
      <tr key={certificate.id}>
        <td
          className="gear"
          ref={gearRef}
        >
          <SvgComponent
            className="gear-button"
            type={SvgComponentType.GEAR}
            color="#275c79"
            onClick={handleGearOpen}
          />
          {isGearOpen && (
            <div className={`gear-menu ${isLastRow ? 'adjust-margin' : ''}`}>
              <span
                className="edit-span"
                onClick={handleEditClick}
              >
                Edit
              </span>
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
