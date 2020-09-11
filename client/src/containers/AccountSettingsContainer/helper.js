export const getUserInitials = (profile) => {
  const { firstName = 'Admin', lastName = 'User' } = profile;
  const userInitials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  return userInitials;
};
