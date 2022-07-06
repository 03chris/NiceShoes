import { Link } from "react-router-dom";
import "./Item.css"

const Item = ({products}) => {
    return(
        <div key={products.id} className="col-12 col-xl-4">
            <div className="card mt-3 mb-3">
                <Link to={`/product/${products.id}`}><img src={products.image} className="card-img-top w-100" alt={products.title}/></Link>
                <div className="card-body">
                    <h5 className="card-title">{products.title}</h5>
                    <Link to={`/product/${products.id}`} className="btn btn-dark">Details</Link>
                </div>    
            </div>
        </div> 
    )
}

export default Item

