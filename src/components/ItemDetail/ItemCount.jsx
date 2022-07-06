import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom"
 
const ItemCount = ({stock, initial, onAdd}) => {
    let [count, setCount] = useState(initial);

    const addItem = ()=>{
        onAdd(count)
    }

    return (  
        <div className="container-fluid">        
            <div className="row d-flex justify-content-center mt-3">
                <div className="row text-center mt-3 mb-3">
                    <div className="col-4">
                        <Button variant="dark" disabled={count === 1} onClick={() => count > initial ? setCount(count-1) : null}>-</Button>
                    </div> 
                    <div className="col-4">
                        {count}
                    </div>
                    <div className="col-4">
                        <Button variant="dark" disabled={count === stock} onClick={() => count < stock ? setCount(count+1) : null}>+</Button>
                    </div>
                </div>
                <Button variant="dark" className="m-1 mt-3 w-50" onClick={addItem}>Add to cart</Button>
                <Link to={'/all'} className="btn btn-dark m-1 mb-3 w-50">Back</Link> 
            </div>
        </div>
    );
}
 
export default ItemCount;