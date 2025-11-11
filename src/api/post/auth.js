import users from '../../../backend/data.json';

export const loginUser = async (login, password) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = users.find(u => u.login === login && u.password === password);
  
  if (user) {
    return {
      success: true,
      user: {
        id: user.id,
        login: user.login,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate
      }
    };
  } else {
    return {
      success: false,
      message: 'Неверный логин или пароль'
    };
  }
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  return { success: true };
};