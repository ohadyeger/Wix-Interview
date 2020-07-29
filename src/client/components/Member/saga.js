import { MemberActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import MemberActions from "./actions";

function* loadUser(action) {
  try {
    console.log("action uri", action.uri);
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = yield call([res, "json"]);
    yield put(MemberActions.loadUserSucess(json));
  } catch (e) {
    yield put(MemberActions.loadUserFailed(e));
  }
}
function* cancelClass(action) {
  try {
    console.log("joinClass action", action);
    const serverRes = yield call(fetch, action.uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.memberDetails),
    });

    const resJson = yield call([serverRes, "json"]); //retrieve body of response
    yield put(MemberActions.cancelBookingSuccess(resJson));
  } catch (e) {
    yield put(MemberActions.cancelBookingSuccess(e.message));
  }
}
function* MemberSaga() {
  yield takeEvery(MemberActionsConstants.LOAD_USER, loadUser);
  yield takeEvery(MemberActionsConstants.CANCEL_BOOK, cancelClass);
}

export default MemberSaga;
