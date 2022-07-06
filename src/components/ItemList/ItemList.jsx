import Item from "../Item/Item"

const ItemList = ({products}) => {
    return (
        <div className="row">
            {products.map(products => 
                <Item key={products.id} products={products} />
            )}
        </div>
    )
}

export default ItemList


