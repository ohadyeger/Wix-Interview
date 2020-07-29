import { ClassListActionsConstants } from "./constants.js";

function loadClasses() {
  return {
    type: ClassListActionsConstants.LOAD_CLASSES,
    uri: "/api/class",
  };
}

function loadClassesSuccess(classes) {
  return {
    type: ClassListActionsConstants.LOAD_CLASSES_SUCCESS,
    payload: {
      classes: classes,
    },
  };
}
function loadClassesFailure(error) {
  return {
    type: ClassListActionsConstants.LOAD_CLASSES_FAILURE,
    error: error,
  };
}
function joinClass(timeslot, member) {
  return {
    type: ClassListActionsConstants.JOIN_CLASS,
    uri: "/api/timeslot/" + timeslot,
    memberDetails: {
      member,
    },
  };
}
function joinClassSuccess(msg) {
  return {
    type: ClassListActionsConstants.JOIN_CLASS_SUCC,
    msg: msg,
  };
}
function joinClassFailed(error) {
  return {
    type: ClassListActionsConstants.JOIN_CLASS_FAIL,
    error: error,
  };
}
function joinWaitingList(timeslot, member) {
  return {
    type: ClassListActionsConstants.JOIN_WAITING,
    uri: "/api/timeslot/wait/" + timeslot,
    memberDetails: {
      member,
    },
  };
}
function joinWaitingListSuccess(msg) {
  return {
    type: ClassListActionsConstants.JOIN_WAITING_SUCC,
    msg: msg,
  };
}
function joinWaitingListFailure(error) {
  return {
    type: ClassListActionsConstants.JOIN_WAITING_FAIL,
    error: error,
  };
}
const ClassListActions = {
  joinClass,
  joinClassSuccess,
  joinClassFailed,
  loadClasses,
  loadClassesSuccess,
  loadClassesFailure,
  joinWaitingList,
  joinWaitingListSuccess,
  joinWaitingListFailure,
};

export default ClassListActions;
