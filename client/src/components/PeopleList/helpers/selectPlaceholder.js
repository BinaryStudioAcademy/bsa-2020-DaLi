export const getSelectPlaceholder = (membership, userId) => {
  const groupNames = membership
    .map((elem) => {
      if (elem.users.findIndex((user) => user.userId === userId) !== -1) {
        return elem.name;
      }
      return null;
    })
    .filter((el) => el);

  if (groupNames.indexOf('Administrators') !== -1 && groupNames.length > 2) {
    return `Administrator and ${groupNames.length - 2} others groups`;
  }
  if (groupNames.indexOf('Administrators') !== -1) {
    return 'Administrator';
  }
  if (groupNames.length === 2) {
    return groupNames.filter((name) => name !== 'All Users')[0];
  }
  if (groupNames.indexOf('Administrators') === -1 && groupNames.length >= 2) {
    return `${groupNames.length - 1} others groups`;
  }
  return 'All Users';
};
