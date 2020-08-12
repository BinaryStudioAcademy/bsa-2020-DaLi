export const mockProfile = {
  firstName: 'Admin',
  secondName: 'User',
  email: 'admin.user@binary-studio.com',
};

export const getUserInitials = (profile) => {
  const { firstName, secondName } = profile;
  const userInitials = `${firstName[0]}${secondName[0]}`;
  return userInitials;
};
