import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GroupList } from '../../components';
import { resetError, addUserGroup, deleteUserGroup, updateUserGroup, getUserGroup, addUserToGroup } from './actions';

const UserGroupsPageContainer = ({
  userGroupsId,
  isTheGroup,
  groups,
  addUserGroup,
  deleteUserGroup,
  updateUserGroup,
  currentGroup,
  isLoading,
  users,
  addUserToGroup,
}) => {
  const deleteGroup = (id) => () => {
    deleteUserGroup(id);
  };

  const addUser = (userId) => {
    addUserToGroup(userId, userGroupsId);
  };

  return (
    <>
      {!isLoading && (
        <GroupList
          isTheGroup={isTheGroup}
          groups={groups}
          currentGroup={currentGroup}
          addUserGroup={addUserGroup}
          deleteGroup={deleteGroup}
          updateUserGroup={updateUserGroup}
          users={users}
          addUser={addUser}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.admin.people.users,
    groups: state.admin.groups.groups,
    currentGroup: state.admin.groups.currentGroup,
    isLoading: state.admin.groups.isLoading,
    messageError: state.admin.groups.messageError,
    isError: state.admin.groups.isError,
  };
};

UserGroupsPageContainer.propTypes = {
  messageError: PropTypes.string,
  isError: PropTypes.bool,
  groups: PropTypes.array,
  isLoading: PropTypes.bool,
  addUserGroup: PropTypes.func,
  deleteUserGroup: PropTypes.func,
  resetError: PropTypes.func,
  isTheGroup: PropTypes.bool,
  currentGroup: PropTypes.object,
  users: PropTypes.array,
  userGroupsId: PropTypes.string,
  updateUserGroup: PropTypes.func,
  addUserToGroup: PropTypes.func,
};

export default withRouter(
  connect(mapStateToProps, {
    resetError,
    addUserGroup,
    deleteUserGroup,
    updateUserGroup,
    getUserGroup,
    addUserToGroup,
  })(UserGroupsPageContainer)
);
