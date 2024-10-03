import React, { useState, useRef, useCallback } from 'react';
import { useCertificateType, useFormatDate } from '@hooks';
import { SvgComponentType, SvgComponent } from '@components/Svg';
import { CertificateDto } from '@types';
import { handleNavigate } from '@utils';
import { useNavigate } from 'react-router-dom';

interface ICertificateRowProps {
  certificate: CertificateDto;
  isLastRow: boolean;
  onDelete: (id: number) => void;
}

export const CertificateRow: React.FC<ICertificateRowProps> = ({
  certificate,
  isLastRow,
  onDelete,
}) => {
  const [isGearOpen, setIsGearOpen] = useState(false);
  const gearRef = useRef<HTMLTableDataCellElement>(null);
  const navigate = useNavigate();

  const handleGearOpen = useCallback(() => {
    setIsGearOpen((prevGear) => !prevGear);
  }, []);

  const formatDate = useFormatDate();
  const certificateType = useCertificateType();

  const handleEditClick = useCallback(() => {
    handleNavigate(`/ml/edit-certificate/${certificate.id}`, navigate);
  }, [certificate.id, navigate]);

  const handleDeleteClick = useCallback(async () => {
    try {
      await onDelete(certificate.id as number);
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  }, [certificate.id, onDelete]);

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
              <span onClick={handleDeleteClick}>Delete</span>
            </div>
          )}
        </td>
        <td>{certificate.supplier?.name}</td>
        <td>{certificateType[certificate.type]}</td>
        <td>{formatDate(certificate.validFrom)}</td>
        <td>{formatDate(certificate.validTo)}</td>
      </tr>
    </React.Fragment>
  );
};
