import initialState from "../../initialState";
import { ClassListActionsConstants } from "./constants.js";
import { List } from "immutable";

const ClassListReducer = (state = initialState.classList, action) => {
  switch (action.type) {
    case ClassListActionsConstants.LOAD_CLASSES_SUCCESS:
      console.log("Class List Loaded");
      state = state.set("classes", action.payload.classes);
      return state;

    case ClassListActionsConstants.LOAD_CLASSES_FAILURE:
      console.log("Error loading classes from server");
      return state;

    case ClassListActionsConstants.JOIN_CLASS_SUCC:
      console.log("joining class success");
      return state;

    case ClassListActionsConstants.JOIN_CLASS_FAIL:
      console.log("joining class fail");
      return state;

    case ClassListActionsConstants.JOIN_WAITING_SUCC:
      console.log("joining waiting list success");
      return state;

    case ClassListActionsConstants.JOIN_WAITING_FAIL:
      console.log("joining waiting list failed");
      return state;

    default:
      return state;
  }
};

export default ClassListReducer;
