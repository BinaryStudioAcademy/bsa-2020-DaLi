import { encryptSync } from '../../helpers/cryptoHelper';

const hash = (password) => encryptSync(password);
const now = new Date();

const usersSeed = [
  {
    email: 'demo@demo.com',
    firstName: 'demo',
    lastName: 'demo',
    password: hash('demo'),
  },
  {
    email: 'gbottoms1@arizona.edu',
    firstName: 'jhon',
    lastName: 'jhon',
    password: hash('pxlxvUyyUjE'),
  },
  {
    email: 'cclears2@state.gov',
    firstName: 'alex',
    lastName: 'alex',
    password: hash('ioyLdS9Mdgj'),
  },
  {
    email: 'htie3@chronoengine.com',
    firstName: 'kivi',
    lastName: 'kivi',
    password: hash('twn50kl'),
  },
  {
    email: 'bbirmingham4@guardian.co.uk',
    firstName: 'avocado',
    lastName: 'avocado',
    password: hash('0naQBpP9'),
  },
].map((user) => ({
  ...user,
  createdAt: now,
  updatedAt: now,
}));

export default usersSeed;
