// 프레젠테이셔널 컴포넌트
// 프레젠테이셔널 = 컴포넌츠 폴더
// UI를 보여주기만 하는 컴포넌트

const CounterComponents = ({ number, onIncrease, onDecrease }) => {
    return (
        <div>
            <h3>{number}</h3>
            <button onClick={onIncrease}>+1 증가</button>
            <button onClick={onDecrease}>-1 감소</button>
        </div>
    )
}

export default CounterComponents;

