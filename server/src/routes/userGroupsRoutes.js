import { Router } from 'express';
import * as UserGroupsService from '../services/userGroupsService';

const router = Router();

router.get('/', async (req, res, next) => {
  const result = await UserGroupsService.getUserGroups();
  const groups = result.map((group) => {
    const res = JSON.parse(JSON.stringify(group));
    res.userCount = res.Users.length;
    delete res.Users;
    return res;
  });
  res.status(200).json(groups);
  next();
});

router.get('/users', async (req, res, next) => {
  const result = await UserGroupsService.getAllGroupsWithUsers();
  // const a = result.map(({ Users, ...rest }) => {
  //   return {
  //     ...rest,
  //     users: Users.map((user) => user.id),
  //   };
  // });
  // console.log(JSON.stringify(a));
  res.status(200).json(result);
  next();
});

router.get('/:id', async (req, res, next) => {
  if (req.params.id === 'users') {
    return;
  }
  const result = await UserGroupsService.getUserGroup({
    id: req.params.id,
  });
  if (result) {
    res.status(200).json(result);
    next();
  } else {
    const err = new Error('User group not found');
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const result = await UserGroupsService.createUserGroup(req.body);
  if (result) {
    res.status(200).json(result);
    next();
  } else {
    const err = new Error('User group creation failed');
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  const result = await UserGroupsService.updateUserGroup(
    {
      id: req.params.id,
    },
    req.body
  );
  if (result) {
    res.status(200).json(result);
    next();
  } else {
    const err = new Error(`User group with id of ${req.params.id} not found`);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  let result = null;
  if (req.query.usersUserGroupsId) {
    result = await UserGroupsService.deleteUser({
      id: req.query.usersUserGroupsId,
    });
  } else {
    result = await UserGroupsService.deleteUserGroup({
      id: req.params.id,
    });
  }
  if (result) {
    res.status(200).json(result);
    next();
  } else if (req.query.usersUserGroupsId) {
    const err = new Error('User not found');
    next(err);
  } else {
    const err = new Error(`User group with id of ${req.params.id} not found`);
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  const data = {
    users_id: req.body.users_id,
    userGroups_id: req.params.id,
  };
  const result = await UserGroupsService.addUser(data);
  if (result) {
    res.status(200).json(result);
    next();
  } else {
    const err = new Error('User has not been added');
    next(err);
  }
});

export default router;
