import React, {useState} from "react";

const Counter = () => {
    const [num, setNumber] = useState(0)

    const increase = () => {
        setNumber(num+1)
    }

    const decrease = () => {
        setNumber(num-1)
    }
    return (
        <div>
            <button onClick={increase}>▲</button>
            {num} 
            <button onClick={decrease}>▼</button>
        </div>
    )
}
export default Counter