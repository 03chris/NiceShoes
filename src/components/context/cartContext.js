import { createContext, useContext, useState } from 'react'

const AppContext = createContext([])
export const useAppContext = () => useContext(AppContext)

export default function AppContextProvider({children}) {
    const [cart, setCart] = useState([])

    function addToCart(item) {
        let list = [...cart]
        if(list.some(e => e.item.id === item.item.id)){
            list.find(e => e.item.id === item.item.id).quantity += item.quantity
            setCart(list)
        }else{
            setCart([...cart, item])
        }
    }

    const deleteFromCart = (item) => {
        const deleteProduct = cart.filter(prod => prod.item.id !== item.item.id);
        setCart([...deleteProduct]);
    }; 

    function clearCart() {
        setCart([])
    }

    const qtyCart = () => {
        return cart.reduce((qty, value)=> qty + value.quantity, 0) 
    }

    const priceAll =()=>{
        return cart.reduce((qty, value)=>(qty + (value.quantity * value.item.price)), 0) 
    }

    return(
        <AppContext.Provider value={{cart, setCart, addToCart, deleteFromCart, clearCart, qtyCart, priceAll}}>
            {children}
        </AppContext.Provider>
    )
}