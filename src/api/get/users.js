import users from '../../../backend/data.json';

export const getAllUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return users;
};

export const getUserById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return users.find(user => user.id === parseInt(id));
};