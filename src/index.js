import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import rootReducer, { rootSaga } from './modules';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
// 미들웨어 만들기
import { createLogger } from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
// import loggerMiddleware from './lib/loggerMiddleware';

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

