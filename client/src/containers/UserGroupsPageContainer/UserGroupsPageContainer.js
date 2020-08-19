import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GroupList } from '../../components';
import { resetError, addUserGroup, deleteUserGroup } from './actions';

const UserGroupsPageContainer = ({ groups, addUserGroup, deleteUserGroup }) => {
  const deleteGroup = (id) => () => {
    deleteUserGroup(id);
  };

  return <GroupList groups={groups} addUserGroup={addUserGroup} deleteGroup={deleteGroup} />;
};

const mapStateToProps = (state) => {
  return {
    groups: state.admin.groups.groups,
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
};

export default withRouter(
  connect(mapStateToProps, { resetError, addUserGroup, deleteUserGroup })(UserGroupsPageContainer)
);
