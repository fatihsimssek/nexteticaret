'use client'
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import toast from "react-hot-toast";

interface CartContextProps{
    productCartQty: number,
    cartPrdcts:CardProductProps[]|null,
    addToBasket: (product: CardProductProps) => void;
    addToBasketIncrease: (product: CardProductProps) => void;
    addToBasketDecrease: (product: CardProductProps) => void;
    removeFromCart: (product: CardProductProps) => void;
    removeCart: () => void;
}
const CartContext = createContext<CartContextProps | null>(null)


interface Props{
    [propName:string]:any
}

export const CartContextProvider = (props: Props) => {
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null)

    useEffect(() => {
        let getItem: any = localStorage.getItem('cart')
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem)
        setCartPrdcts(getItemParse)
    }, [])

    const addToBasketIncrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if (product.quantity == 10) { 
            return toast.error('Daha fazla ekleyemezsin...')
        }
        if (cartPrdcts) {
            updatedCart = [...cartPrdcts];
            const existingItem = cartPrdcts.findIndex(item => item.id === product.id)
            
            if (existingItem>-1) {
                updatedCart[existingItem].quantity = ++updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart',JSON.stringify(updatedCart))
        }
    }, [cartPrdcts])

    const addToBasketDecrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if (product.quantity == 1) { 
            return toast.error('Ürün miktarı 1 den az olamaz...')
        }
        if (cartPrdcts) {
            updatedCart = [...cartPrdcts];
            const existingItem = cartPrdcts.findIndex(item => item.id === product.id)
            
            if (existingItem>-1) {
                updatedCart[existingItem].quantity = --updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart',JSON.stringify(updatedCart))
        }
    },[cartPrdcts])
    
    const removeCart = useCallback(() => {
        setCartPrdcts(null)
        toast.success('Sepet Temizlendi....')
            localStorage.setItem('cart',JSON.stringify(null))
    },[])
    
    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev,product]
            } else {
                updatedCart = [product]
            }
            toast.success('Ürün Sepete Eklendi....')
            localStorage.setItem('cart',JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [cartPrdcts])
    
    const removeFromCart = useCallback((product: CardProductProps) => {
        if (cartPrdcts) {
            const filteredProdcuts = cartPrdcts.filter(cart => cart.id !== product.id)
            setCartPrdcts(filteredProdcuts)
            toast.success('Ürün Sepetten Silindi....')
            localStorage.setItem('cart',JSON.stringify(filteredProdcuts))
        }
    },[cartPrdcts])

    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease
    }
    return (
        <CartContext.Provider value={value} {...props}/>
         
    )
}


const useCart = () => {
    const context = useContext(CartContext)
    if (context == null) {
      throw new Error('Bir hata var')
    }
    return context
}

export default useCart