import { ClassListActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import ClassListActions from "./actions";

function* loadClasses(action) {
  try {
    const classesRes = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const classesJson = yield call([classesRes, "json"]); //retrieve body of response
    yield put(ClassListActions.loadClassesSuccess(classesJson));
  } catch (e) {
    yield put(ClassListActions.loadClassesFailure(e.message));
  }
}
function* joinClass(action) {
  try {
    const serverRes = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.memberDetails),
    });

    const resJson = yield call([serverRes, "json"]); //retrieve body of response
    yield put(ClassListActions.joinClassSuccess(resJson));
  } catch (e) {
    yield put(ClassListActions.joinClassFailed(e.message));
  }
}
function* joinWaitingList(action) {
  try {
    const serverRes = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.memberDetails),
    });

    const resJson = yield call([serverRes, "json"]); //retrieve body of response
    yield put(ClassListActions.joinWaitingListFailure(resJson));
  } catch (e) {
    yield put(ClassListActions.joinWaitingListSuccess(e.message));
  }
}
function* ClassListSaga() {
  yield takeEvery(ClassListActionsConstants.LOAD_CLASSES, loadClasses);
  yield takeEvery(ClassListActionsConstants.JOIN_CLASS, joinClass);
  yield takeEvery(ClassListActionsConstants.JOIN_WAITING, joinWaitingList);
}

export default ClassListSaga;
