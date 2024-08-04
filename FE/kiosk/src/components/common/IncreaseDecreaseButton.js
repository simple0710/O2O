


export default function IncreaseDecreaseButton({increaseQuantity, decreaseQuantity, count, rIndex, pIndex, type}){
    return <div className="control-button">
        <button className="btn btn-sm mx-1" onClick={() => decreaseQuantity(rIndex, pIndex, type)}>-</button>
        <p className="p-small-number imp">{count}</p>
        <button className="btn btn-sm mx-1" onClick={() => increaseQuantity(rIndex, pIndex, type)}>+</button>
    </div>;

}