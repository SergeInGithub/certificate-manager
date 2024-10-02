import { apiClient } from './apiClient';

export const searchSupplier = async (
  name: string,
  supplierIndex: string,
  city: string,
) => {
  const response = await apiClient.searchSuppliers({
    name,
    supplierIndex,
    city,
  });
  return response.data.data;
};

export const searchUser = async (
  firstName: string,
  lastName: string,
  userIndex: string,
  plant: string,
  departmentName: string,
) => {
  const response = await apiClient.searchUsers({
    firstName,
    lastName,
    userIndex,
    plant,
    departmentName,
  });
  return response.data.data;
};
