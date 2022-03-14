const useState = React.useState;
const useEffect = React.useEffect;


function computeInitial() {
    console.log("Compute something ...");
    return Math.trunc(Math.random()*20)
}

function App() {
    const [count, setCount] = useState(computeInitial);
    console.log('Component render');
    let count2;

    useEffect(
      () => console.log("render"), [count2]
    )

    function increament() {
        // setCount( previv => {
        //     return previv + 1
        // })
        setCount( function(pr) {console.log(count); return pr+1})
        setCount( function(pr) { return pr + 1 })

    }

    function decreament() {
        setCount(() => {console.log(count); return count-1})


    }



    return (
      <div>
          <h2>Количество нажатий: {count}</h2>
          <button onClick={increament}>Добавить</button>
          <button onClick={decreament}>Отнять</button>

      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
