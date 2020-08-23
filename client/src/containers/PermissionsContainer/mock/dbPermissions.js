export const dbPermissions = [
  {
    databaseId: '8e73f489-c75d-4b02-8420-2b6b21ff2feb',
    dbNickname: 'dali',
    groups: [
      {
        groupId: '2adab60d-2c2c-4592-a19e-fb3bf5076fdf',
        groupName: 'Administrators',
        access: 'granted',
      },
      {
        groupId: '23923be5-f4df-4cc6-83f5-456b0ccde933',
        groupName: 'All Users',
        access: 'limited',
      },
    ],
  },
  {
    databaseId: '830e009b-9a34-4422-8e81-597384137f33',
    dbNickname: 'codegig',
    groups: [
      {
        groupId: '2adab60d-2c2c-4592-a19e-fb3bf5076fdf',
        groupName: 'Administrators',
        access: 'granted',
      },
      {
        groupId: '23923be5-f4df-4cc6-83f5-456b0ccde933',
        groupName: 'All Users',
        access: 'denied',
      },
    ],
  },
];
