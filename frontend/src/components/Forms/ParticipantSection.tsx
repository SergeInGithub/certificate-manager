import React from 'react';
import { Button } from '@components/Button';
import { Label } from '@components/Label';
import { SvgComponent, SvgComponentType } from '@components/Svg';
import { UserLookupTable } from '@components/Tables';
import { useLanguage } from '@hooks';
import { UserDto } from '@types';

interface IParticipantSectionProps {
  selectedApplicants: UserDto[];
  openUserModal: () => void;
  handleApplicantSelection: (applicant: UserDto) => void;
}

export const ParticipantSection = ({
  selectedApplicants,
  openUserModal,
  handleApplicantSelection,
}: IParticipantSectionProps) => {
  const { translations } = useLanguage();

  return (
    <section className="participants-section">
      <div>
        <Label className="valid-to-label">{translations.assignedUsers}</Label>
        <Button
          type="button"
          className="search-participant-button"
          onClick={openUserModal}
        >
          <SvgComponent
            type={SvgComponentType.SEARCH}
            className="search-icon"
          />
          <h5 className="add-participant">{translations.addParticipant}</h5>
        </Button>
      </div>

      <UserLookupTable
        selectedApplicants={selectedApplicants}
        handleApplicantSelection={handleApplicantSelection}
        selectedItems={selectedApplicants}
      />
    </section>
  );
};
