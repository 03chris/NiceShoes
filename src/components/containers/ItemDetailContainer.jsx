import { useState, useEffect } from "react";
import { getFirestore } from "../../services/getFirebase";
import { useParams } from "react-router";
import ItemDetail from "../ItemDetail/ItemDetail"

const ItemDetailContainer = () => {
    const [item, setItem] = useState({})   
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(()=>{
        const dataBase = getFirestore()  
        const idProduct = dataBase.collection('products').doc(id)
        idProduct
        .get()
        .then(res => setItem({id: res.id, ...res.data()}))
        .catch((err)=> console.log(err))
        .finally(()=> setLoading(false))
    }, [id])

    return (
        <div className="container-fluid">
            { 
                loading ? 
                    <div className="d-flex justify-content-center pt-5">
                        <div className="spinner-border m-5" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> 
                : 
                    <ItemDetail item={item}/> 
            }
        </div>
    )
}

export default ItemDetailContainer
