// 컨테이너 컴포넌트 
// 리덕스와 연동
// 리덕스로부터 상태를 받음
// 리덕스 스토어에서 액션을 디스패치
import CounterComponents from "../components/CounterComponents";
// CounterContainer와 리덕스 연동을 위한 connect 함수
// import { connect } from "react-redux";
// 액션 생성함수 임포트
// import { increase, decrease } from "../modules/counter";
import { increaseAsync, decreaseAsync } from "../modules/counter";
// 유틸 함수 사용
// import { bindActionCreators } from "redux";
// useSelector, useDispatch Hooks 사용
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

// 5. useSelector + useDispatch + useEffect 사용
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

// 4. useSelector + useDispatch 사용

// const CounterContainer = () => {
//     const number = useSelector(state => state.counter.number);
//     const dispatch = useDispatch();
//     return (
//         <CounterComponents
//             number={number}
//             onIncrease={() => dispatch(increase())}
//             onDecrease={() => dispatch(decrease())}
//         />
//     );
// };
// export default CounterContainer;

// 3. useSelector 사용하기 전
// const CounterContainer = ({ number, increase, decrease }) => {
//     return <CounterComponents number={number} onIncrease={increase} onDecrease={decrease} />
// }

// 2. bindActioncreators 유틸 함수 사용
//    mapStateToProps, mapDispatchToProps 대신에 익명함수 사용
// export default connect(
//     state => ({ number: state.counter.number, }),
//     dispatch => bindActionCreators({ increase, decrease }, dispatch)
// )(CounterContainer)


// // 1. mapStateToProps, mapDispatchToProps
// //    액션 생성함수 (increase(), decrease())를 dispatch로 호출 해준다.
// // 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위한 함수
// const mapStateToProps = state => ({
//     // 현재 스토어가 지니고 있는 상태를 가리킨다.
//     number: state.counter.number,
// })

// const mapDispatchToProps = dispatch => ({
//     increase: () => {
//         dispatch(increase());
//         console.log('증가')
//     },
//     decrease: () => {
//         dispatch(decrease());
//         console.log('감소')
//     }
// })


// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

