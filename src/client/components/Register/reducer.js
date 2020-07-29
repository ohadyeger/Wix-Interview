import { RegisterActionsConstants } from "./constants";
import initialState from "../../initialState";

const RegisterReducer = (state = initialState.register, action) => {
  switch (action.type) {
    case RegisterActionsConstants.REGISTER_SUCC:
      state = state.set("registerComplete", true);
      return state;
    case RegisterActionsConstants.REGISTER_FAIL:
      state = state.set("registerComplete", false);
      return state;
    case RegisterActionsConstants.REGISTER_USER_CHNGE:
      state = state.set("username", action.username);
      return state;
    case RegisterActionsConstants.REGISTER_USER_VALIDATE_SUCC:
      state = state.set("userValid", true);
      return state;
    case RegisterActionsConstants.REGISTER_USER_VALIDATE_FAIL:
      state = state.set("userValid", false);
      return state;
    case RegisterActionsConstants.MODAL_OPEN:
      state = state.set("modalIsOpened", true);
      return state;
    case RegisterActionsConstants.MODAL_CLOSE:
      state = state.set("modalIsOpened", false);
      return state;
    default:
      return state;
  }
};

export default RegisterReducer;
