import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";

import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    counter
})

export function* rootSaga() {
    yield all([counterSaga()])
}

export default rootReducer