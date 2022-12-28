const loggerMiddleware = store => next => action => {
    // 미들웨어 기본 구조
    console.log('이전 상태', store.getState())
    console.log('액션 상태', action);
    next(action)
    console.log('다음 상태', store.getState())
};
export default loggerMiddleware;