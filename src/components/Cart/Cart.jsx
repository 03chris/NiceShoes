import { useAppContext } from "../context/cartContext";
import { Link } from 'react-router-dom';
import { ProgressBar } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import "./Cart.css"

const Cart = () => {
    const {cart, deleteFromCart, clearCart, priceAll} = useAppContext()

    function backToShop() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#212529',
            confirmButtonText: 'Yes, empty it!'
          }).then((result) => {
            if (result.isConfirmed) {
              clearCart()
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Emptied!',
                showConfirmButton: false,
                timer: 800
                })
            }
          })
    }

    return (
        <div className="p-5 text-center">
            {
                cart.length > 0 ?
                    <ProgressBar className="mb-5" variant="dark" animated now={50} />
                :
                    <></>    
            }
            {
                cart.map(item=>
                    <div className="mb-2" key={item.item.id}>
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between">
                                <img src={item.item.image} alt={item.item.title} className="imgProducts"/>
                                <span className="fs-5 w-25">{item.item.title}</span>
                                <span className="quantity rounded fs-5">{item.quantity}</span>
                                <span className="fw-bold fs-5">${item.item.price * item.quantity}</span>
                                <div>
                                    <button className="btn btn-danger btn-sm" onClick={()=>deleteFromCart(item)}><BsFillTrashFill /></button>
                                </div>
                            </li>
                        </ul>
                    </div> 
                )
            }
            {   
                cart.length > 0 ?
                    <>
                        <p className="fs-3 mt-3">Total ${priceAll()}</p>
                        <button className="btn btn-dark m-2" onClick={backToShop}>Empty cart</button>
                        <Link to={'/cart/checkout'} className="btn btn-dark m-2">Buy</Link>  
                    </>
                :
                    <></>
            }
            {
                cart.length === 0 &&
                    <>
                        <p className="fs-2">The cart is empty</p>
                        <Link to={'/all'} className="btn btn-dark">Back to shop</Link>
                    </>
            }       
        </div>
    )
}

export default Cart
