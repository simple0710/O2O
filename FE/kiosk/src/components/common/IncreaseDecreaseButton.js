
export default function IncreaseDecreaseButton(increaseQuantity, decreaseQuantity, count, index, type){

    return 
    <div>
        <button className="btn btn-sm mx-1" onClick={() => decreaseQuantity(index, type)}>-</button>
        <span className="mx-1">{count}</span>
        <button className="btn btn-sm mx-1" onClick={() => increaseQuantity(index, type)}>+</button>
    </div>

}