import { useAppContext } from "../context/cartContext";
import { BsBag } from 'react-icons/bs'

function CartWidget() {
    const {cart, qtyCart} = useAppContext()

    return (
        <>  
            <span className="me-1">{cart.length === 0 ? <></> : qtyCart()}</span>
            <BsBag className="mb-1"/>
        </>
    )
}

export default CartWidget
