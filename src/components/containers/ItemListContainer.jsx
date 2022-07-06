import  { useState, useEffect } from "react";
import { getFirestore } from "../../services/getFirebase";
import { useParams } from "react-router";
import ItemList from '../ItemList/ItemList'

const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {genderCategory} = useParams()

    useEffect(()=>{
        setLoading(true)
        const dataBase = getFirestore()
        const shoes = dataBase.collection("products")
        const category = genderCategory ? shoes.where("gender", "==", genderCategory) : shoes
        
        category
        .get()
        .then(res => {
            setProducts(res.docs.map(item =>({id: item.id, ...item.data()})))
        })
        .catch(err =>console.log(err))
        .finally(()=>setLoading(false))
    }, [genderCategory, setLoading])

    return (  
        <div className="container-fluid p-5">
            { 
                loading ? 
                    <div className="d-flex justify-content-center m-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> 
                : 
                    <ItemList products={products}/>
            }  
        </div>
    )
}
 
export default ItemListContainer;