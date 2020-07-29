import { MemberActionsConstants } from "./constants.js";

function loadUserSucess(user) {
  return {
    type: MemberActionsConstants.LOAD_USER_SUCC,
    user: user,
  };
}
function loadUserFailed(error) {
  return {
    type: MemberActionsConstants.LOAD_USER_FAIL,
    error: error,
  };
}
function loadUser(name) {
  return {
    type: MemberActionsConstants.LOAD_USER,
    uri: `/api/dev/users/${name}`,
  };
}
function cancelBooking(timeslot, member) {
  return {
    type: MemberActionsConstants.CANCEL_BOOK,
    uri: "/api/timeslot/" + timeslot,
    memberDetails: {
      member,
    },
  };
}
function cancelBookingSuccess(msg) {
  return {
    type: MemberActionsConstants.CANCEL_BOOK_SUCC,
    msg: msg,
  };
}
function cancelBookingFailed(err) {
  return {
    type: MemberActionsConstants.CANCEL_BOOK_FAIL,
    err: err,
  };
}
const MemberActions = {
  loadUser,
  loadUserSucess,
  loadUserFailed,
  cancelBooking,
  cancelBookingSuccess,
  cancelBookingFailed,
};

export default MemberActions;
