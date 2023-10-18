import {
  SHOW_ATTACHMENT_MODAL,
  HIDE_ATTACHMENT_MODAL,
  SHOW_NEW_THREAD_MODAL,
  HIDE_NEW_THREAD_MODAL,
  SHOW_THREAD_SETTINGS_MODAL,
  HIDE_THREAD_SETTINGS_MODAL,
} from "./actionTypes";

export const setShowAttachmentModal = (show) => {
  return {
    type: SHOW_ATTACHMENT_MODAL,
    mode,
  };
};

export const setHideAttachmentModal = (hide) => {
  return {
    type: HIDE_ATTACHMENT_MODAL,
    mode,
  };
};

export const setShowNewThreadModal = (show) => {
  return {
    type: SHOW_NEW_THREAD_MODAL,
    mode,
  };
};

export const setHideNewThreadModal = (hide) => {
  return {
    type: HIDE_NEW_THREAD_MODAL,
    mode,
  };
};

export const setShowThreadSettingsModal = (show) => {
  return {
    type: SHOW_THREAD_SETTINGS_MODAL,
    mode,
  };
};

export const setHideThreadSettingsModal = (hide) => {
  return {
    type: HIDE_THREAD_SETTINGS_MODAL,
    mode,
  };
};
