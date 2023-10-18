import {
  SHOW_ATTACHMENT_MODAL,
  HIDE_ATTACHMENT_MODAL,
  SHOW_NEW_THREAD_MODAL,
  HIDE_NEW_THREAD_MODAL,
  SHOW_THREAD_SETTINGS_MODAL,
  HIDE_THREAD_SETTINGS_MODAL,
} from "../actions/actionTypes";

const initialState = {
  showAttachmentModal: false,
  showNewThreadModal: false,
  showThreadSettingsModal: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ATTACHMENT_MODAL:
      // Set showAttachmentModal to true
      const setAttachmentModalTrue = {
        showAttachmentModal: true,
        showNewThreadModal: false,
      };
      return setAttachmentModalTrue;

    case HIDE_ATTACHMENT_MODAL:
      // Set showAttachmentModal to false
      const setAttachmentModalFalse = {
        ...state,
        showAttachmentModal: false,
      };
      return setAttachmentModalFalse;

    case SHOW_NEW_THREAD_MODAL:
      // Set showNewThreadModal to true
      const setNewThreadModalTrue = {
        ...state,
        showNewThreadModal: true,
      };
      return setNewThreadModalTrue;

    case HIDE_NEW_THREAD_MODAL:
      // Set showNewThreadModal to false
      const setNewThreadModalFalse = {
        ...state,
        showNewThreadModal: false,
      };
      return setNewThreadModalFalse;

    case SHOW_THREAD_SETTINGS_MODAL:
      // Set showThreadSettingsModal to true
      const setThreadSettingsModalTrue = {
        ...state,
        showThreadSettingsModal: true,
      };
      return setThreadSettingsModalTrue;

    case HIDE_THREAD_SETTINGS_MODAL:
      // Set showThreadSettingsModal to false
      const setThreadSettingsModalFalse = {
        ...state,
        showThreadSettingsModal: false,
      };
      return setThreadSettingsModalFalse;

    default:
      return state;
  }
};

export default modalReducer;
