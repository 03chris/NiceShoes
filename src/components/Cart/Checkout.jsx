import { useAppContext } from '../context/cartContext';
import { useState } from 'react';
import { getFirestore } from '../../services/getFirebase';
import firebase from "firebase/app";
import "firebase/firestore";
import { Form, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Checkout = () => {
    const { cart, clearCart, qtyCart, priceAll } = useAppContext()

    const [ formData, setFormData ] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        emailConfirm: ''
    })

    const handleOnSubmit = e =>{        
        e.preventDefault()  

        let order = {}
        order.date = firebase.firestore.Timestamp.fromDate(new Date());
        order.buyer = formData
        order.total = priceAll();
        order.quantity = qtyCart(); 
        order.items = cart.map(e => {
            const id = e.item.id;
            const title = e.item.title;
            const quantity = e.quantity;
            const price = e.item.price * e.quantity;
            return {id, title, quantity, price}   
        })

        const dataBase = getFirestore()

        if(formData.email === formData.emailConfirm){
            dataBase.collection('orders').add(order)
            .then(res => Swal.fire(
                'Exit purchase!',
                'Your order number is ' + (res.id),
                'success'
            ))
            .catch(err => console.log(err))
            .finally(()=> {
                setFormData({
                    name: '',
                    surname: '',
                    phone: '',
                    email: '',
                    emailConfirm: ''
                }) 
                clearCart()
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'The emails must be the same'
            })
        }

        const stockUpdate = dataBase.collection('products').where(
            firebase.firestore.FieldPath.documentId(), 'in', cart.map(i=> i.item.id)
        )
            
        const batch = dataBase.batch();
        
        stockUpdate.get()
        .then( collection=>{
            collection.docs.forEach(doc => {
                batch.update(doc.ref, {
                    stock: doc.data().stock - cart.find(product => product.item.id === doc.id).quantity
                })
            })

            batch.commit().then(res =>{
                console.log('Batch: ', res)
            })
        })

    }
    
    function handleOnChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div> 
            {   
                cart.length > 0 ?
                    <>
                        <ProgressBar variant="dark" className="mt-5 me-5 ms-5" animated now={90} />
                        <div className="container-fluid pt-5 w-75 text-end">
                            <Form 
                            onSubmit={handleOnSubmit} 
                            onChange={handleOnChange}
                            >
                                <Form.Group className="mb-3">
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Name"
                                            value={formData.name}
                                            name="name"
                                            onChange={handleOnChange}
                                            />
                                        <Form.Label>Name</Form.Label>
                                    </Form.Floating>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="surname"
                                            value={formData.surname}
                                            name="surname"
                                            onChange={handleOnChange}
                                            />
                                        <Form.Label>Surname</Form.Label>
                                    </Form.Floating>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Floating className="mb-3">
                                        <Form.Control 
                                            required type="phone" 
                                            placeholder="phone"
                                            value={formData.phone}
                                            name="phone"  
                                            onChange={handleOnChange} 
                                        />
                                        <Form.Label>Phone</Form.Label>
                                    </Form.Floating>
                                </Form.Group>                
                                <Form.Group className="mb-3">
                                    <Form.Floating className="mb-3">
                                        <Form.Control 
                                            required type="email" 
                                            placeholder="email"
                                            value={formData.email}
                                            name="email"  
                                            onChange={handleOnChange}
                                        />
                                        <Form.Label>Email</Form.Label>
                                    </Form.Floating>
                                </Form.Group> 
                                <Form.Group className="mb-3">
                                    <Form.Floating className="mb-3">
                                        <Form.Control 
                                            required type="email" 
                                            placeholder="emailConfirm"
                                            value={formData.emailConfirm}
                                            name="emailConfirm"  
                                            onChange={handleOnChange}
                                        />
                                        <Form.Label>Confirm email</Form.Label>
                                    </Form.Floating>
                                </Form.Group>
                                <Button className="btn btn-dark m-2" type="submit" disabled={[formData.name, formData.surname, formData.phone, formData.email, formData.emailConfirm].includes('')}> 
                                    Finish purchase
                                </Button>          
                            </Form>
                        </div>
                    </>
                :
                    <div className="p-5 text-center">
                        <p className="fs-2">The cart is empty</p>
                        <Link to={'/'} className="btn btn-dark">Back to home</Link>
                    </div>
            }          
        </div>
    )
}

export default Checkout
