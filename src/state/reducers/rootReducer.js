import userReducer from "./userReducer";
import threadReducer from "./threadReducer";
import modeReducer from "./modeReducer";
import modalReducer from "./modalReducer";

const rootReducer = (state, action) => ({
  user: userReducer(state.user, action),
  threadData: threadReducer(state.threadData, action),
  mode: modeReducer(state.mode, action),
  modal: modalReducer(state.modal, action),
});

export default rootReducer;
