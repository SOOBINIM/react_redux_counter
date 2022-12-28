import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

// 액션 타입 = '모듈이름/액션이름'
// 모듈 이름은 액션이름이 겹치는 것을 방지
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// 액션 생성 함수
// redux-actions 사용
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined)
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined)

// 제네레이터 함수 = 리덕스 사가 (미들웨어)를 모듈에 작성
function* increaseSaga() {
    yield delay(1000);
    yield put(increase())
}

function* decreaseSaga() {
    yield delay(1000);
    yield put(decrease())
}

export function* counterSaga() {
    // takeEvery 들어오는 모든 액션에 대해 특정 작업을 처리
    yield takeEvery(INCREASE_ASYNC, increaseSaga);
    // takeLatest 기존에 진행 중이던 작업이 있다면 취소하고 가장 마지막 실행된 작업만 실행
    yield takeLatest(DECREASE_ASYNC, decreaseSaga)
}



// 기존 방식
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

// 초기상태
const initialState = {
    number: 0
};

const counter = handleActions(
    // 액션에 대한 업데이트 함수
    {
        [INCREASE]: (state, action) => ({ number: state.number + 1 }),
        [DECREASE]: (state, action) => ({ number: state.number - 1 }),
    },
    // 초기 상태
    initialState,
)
export default counter;

// // 리듀서 함수
// function counter(state = initialState, action) {
//     switch (action.type) {
//         case INCREASE:
//             return {
//                 number: state.number + 1
//             };
//         case DECREASE:
//             return {
//                 number: state.number - 1
//             };
//         default:
//             return state;
//     }
// }

// export default counter;