import React, { useEffect, useState } from 'react';
import { TableHeaderItem, UserDto, DepartmentDto } from '@types';
import { Input } from '@components/Input';
import axios from 'axios';
import { formatUserName, getDepartmentNameById } from '@utils';

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
        const response = await axios.get('/departments');
        setDepartments(response.data.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <tr key={index}>
      <td className="lookup-table-row-point-container">
        <Input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleSelection(item)}
        />
      </td>
      {columns.map((column: TableHeaderItem, colIndex: number) => {
        let value;
        if (column.id === 'firstName') {
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
