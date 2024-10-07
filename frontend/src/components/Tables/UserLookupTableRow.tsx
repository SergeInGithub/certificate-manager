import React, { useEffect, useState } from 'react';
import { TableHeaderItem, UserDto, DepartmentDto } from '@types';
import { Input } from '@components/Input';
import { apiClient, formatUserName, getDepartmentNameById } from '@utils';
import { Button } from '@components/Button';
import { SvgComponent, SvgComponentType } from '@components/Svg';
import { participantTableHeaderItems } from '@data';

interface UserLookupTableRowProps {
  item: UserDto;
  index: number;
  columns: TableHeaderItem[];
  handleSelection: (item: UserDto) => void;
  isSelected: boolean;
}

export const UserLookupTableRow: React.FC<UserLookupTableRowProps> = ({
  item,
  index,
  columns,
  handleSelection,
  isSelected,
}) => {
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await apiClient.getDepartments();
        setDepartments(response.data.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const areColumnsParticipantHeaders = (
    columns: TableHeaderItem[],
  ): boolean => {
    return (
      JSON.stringify(columns) === JSON.stringify(participantTableHeaderItems)
    );
  };

  return (
    <tr key={index}>
      <td className="lookup-table-row-point-container">
        {areColumnsParticipantHeaders(columns) ? (
          <Button
            type="button"
            children={
              <SvgComponent
                type={SvgComponentType.CLOSE}
                className="participant-close-icon"
              />
            }
            className="participant-close-button"
            onClick={() => handleSelection(item)}
          />
        ) : (
          <Input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleSelection(item)}
          />
        )}
      </td>
      {columns.map((column: TableHeaderItem, colIndex: number) => {
        let value;
        if (column.id === 'fullName') {
          value = formatUserName(item);
        } else if (column.id === 'departmentName') {
          value = getDepartmentNameById(item.departmentId, departments);
        } else {
          value = item[column.id as keyof UserDto];
        }

        return <td key={colIndex}>{value}</td>;
      })}
    </tr>
  );
};
