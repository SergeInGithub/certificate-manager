import { DepartmentDto, SupplierDto, UserDto } from '@types';

export const formatUserName = (user: UserDto): string => {
  return `${user.lastName}, ${user.firstName} (${user.plant})`;
};

export const getDepartmentNameById = (
  departmentId: number | undefined,
  departments: DepartmentDto[],
) => {
  const department = departments.find((dept) => dept.id === departmentId);
  return department ? department.name : 'Unknown';
};

export const getUserName = (userId: number, users: UserDto[]) => {
  const user = users.find((u) => u.userId === userId);
  return user ? user.firstName : 'Unknown User';
};

export const isSupplierValid = (supplier: SupplierDto | null) => {
  return supplier && supplier.id !== 0 && supplier.name.trim() !== '';
};
