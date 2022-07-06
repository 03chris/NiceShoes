import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAppContext } from "../context/cartContext";
import ItemCount from "./ItemCount";
import Swal from 'sweetalert2'

const ItemDetail = ({item}) => {
    const [changeButton, setChangeButton] = useState(true)

    const {addToCart} = useAppContext()

    const onAdd = (count) =>{
        setChangeButton(false)
        addToCart({item: item, quantity: count})
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 800
          })
    }

    return (
        <>
            <div className="container pt-5 mt-3">
                <div className="card-hover">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={item.image} className="img-fluid" alt={item.title}/>
                        </div>
                        <div className="col-md-8 m-auto text-center">
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                { 
                                    changeButton ?
                                        <>
                                            {
                                                item.stock > 0 ?
                                                    <>
                                                        <p className="card-text fs-4">${item.price}</p>
                                                        <p className="card-text fs-6">Stock: {item.stock}</p>
                                                        <ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>
                                                    </>
                                                :
                                                    <p className="text-danger fs-4">Out of stock</p>   
                                            }                                      
                                        </>
                                    :
                                        <div className="row d-flex justify-content-center">
                                            <Link to={'/cart'} className="col-12 col-xl-6 btn btn-dark m-1 w-50">Go to cart</Link>
                                            <Link to={'/all'} className="col-12 col-xl-6 btn btn-dark m-1 w-50">Back</Link>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default ItemDetail
