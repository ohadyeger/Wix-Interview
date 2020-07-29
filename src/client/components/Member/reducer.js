import initialState from "../../initialState";
import { MemberActionsConstants } from "./constants.js";
import { List } from "immutable";

const MemberReducer = (state = initialState.member, action) => {
  switch (action.type) {
    case MemberActionsConstants.LOAD_USER_SUCC:
      state = state.set("member", action.user);
      console.log("member loaded successfully", action.user);
      return state;

    case MemberActionsConstants.LOAD_USER_FAIL:
      console.log("MemberReducer LOAD_USER_FAIL");
      return state;
    case MemberActionsConstants.CANCEL_BOOK_SUCC:
      console.log("MemberActionsConstants CANCEL_BOOK_SUCC", action);
      return state;

    case MemberActionsConstants.CANCEL_BOOK_FAIL:
      console.log("MemberActionsConstants CANCEL_BOOK_FAIL", action);
      return state;
    default:
      return state;
  }
};

export default MemberReducer;
