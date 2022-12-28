# 카운터 예제 (redux + reduxSaga)

## 프레젠테이셔널 컴포넌트
- UI를 보여주기만 하는 컴포넌트
---
## 컨테이너 컴포넌트
- 리덕스로부터 상태를 받음
- 리덕스 스토에서 액션을 디스패치

(기존)
```javascript
// 1. mapStateToProps, mapDispatchToProps
//    액션 생성함수 (increase(), decrease())를 dispatch로 호출 해준다.
//    리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위한 함수
const mapStateToProps = state => ({
    // 현재 스토어가 지니고 있는 상태를 가리킨다.
    number: state.counter.number,
})

const mapDispatchToProps = dispatch => ({
    increase: () => {
        dispatch(increase());
    },
    decrease: () => {
        dispatch(decrease());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
```


(useSelector + useDispatch + useCallback)
```javascript
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

// useSelector + useDispatch + useCallback 사용
const CounterContainer = () => {
    const number = useSelector(state => state.counter.number);
    const dispatch = useDispatch();
    const onIncrease = useCallback(() => dispatch(increaseAsync()), [dispatch]);
    const onDecrease = useCallback(() => dispatch(decreaseAsync()), [dispatch]);
    return (
        <CounterComponents
            number={number}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
        />
    );
};
export default CounterContainer;
```

---
## 모듈 (디스패치)
### react-actions
`액션타입, 액션생성함수`

(기존) 
```javascript
// 액션타입, 액션생성함수
const 액션타입 = '모듈이름/액션이름'
export const 액션생성함수 = () => ({type : 액션타입})
```

(redux-actions) 
```javascript
// 액션타입, 액션생성함수
const 액션타입 = '모듈이름/액션이름'
export const 액션생성함수 = createAction(액션타입)
```
`리듀서 함수`

(기존)
```javascript
// 리듀서 함수
function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return {
                number: state.number + 1
            };
        case DECREASE:
            return {
                number: state.number - 1
            };
        default:
            return state;
    }
}

export default counter;

```
(redux-actions)
```javascript
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
```
### redux-saga 
```javascript
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

// 액션타입, 액션생성함수
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// 액션 생성 함수
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록 하기 위해
// 두번째 파라미터에 () => undefined를 넣어준다.
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

```
---
## 스토어
```javascript
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import rootReducer, { rootSaga } from './modules';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
// 크롬 확장형 프로그램
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
// 액션, 디스패치 시간 확인
import { createLogger } from 'redux-logger';
// 미들웨어 만들기
import createSagaMiddleware from '@redux-saga/core';

// 로거 만들기
const logger = createLogger()
// 사가 미드웨어 만들기
const sagaMiddleware = createSagaMiddleware();
// 스토어 만들기 + 사가 + 로거 + 크롬확장
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)))
sagaMiddleware.run(rootSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));

// 리액트 컴포넌트에서 스토어를 사용할 수 있도록 Provider 컴포넌트로 App 컴포넌트를 감싸준다.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```
