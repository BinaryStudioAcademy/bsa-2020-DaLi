import { UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HIDE_USER_UPDATE_MESSAGE } from './actionTypes';

const accountSettingsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserMessage: 'Data successfully updated',
        updateUserStatus: 'success',
        isUpdateUserNotification: true,
      };
    }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserMessage: payload.message,
        updateUserStatus: 'error',
        isUpdateUserNotification: true,
      };
    case HIDE_USER_UPDATE_MESSAGE:
      return {
        ...state,
        isUpdateUserNotification: false,
      };
    default:
      return state;
  }
};

export default accountSettingsReducer;
