/* eslint-disable no-console */
import usersSeed from '../seed-data/usersSeed';

export default {
  up: async (queryInterface) => {
    try {
      // Add users.
      const usersMappedSeed = usersSeed.map((user) => ({
        ...user,
      }));
      await queryInterface.bulkInsert('users', usersMappedSeed, {});
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.bulkDelete('users', null, {});
    } catch (err) {
      console.log(`Seeding error: ${err}`);
    }
  },
};
