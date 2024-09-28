import axios from 'axios';

export const searchSupplier = async (
  name: string,
  supplierIndex: string,
  city: string,
) => {
  const response = await axios.get(`/suppliers/search`, {
    params: {
      name,
      supplierIndex,
      city,
    },
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
  const response = await axios.get(`/users/search`, {
    params: {
      firstName,
      lastName,
      userIndex,
      plant,
      departmentName,
    },
  });
  return response.data.data;
};
