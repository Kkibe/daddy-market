// hooks/useCartActions.js
import { useRecoilState, useResetRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms';
import { useNotification } from './useNotification';

export const useCartActions = () => {
    const [cart, setCart] = useRecoilState(cartState);
    const resetCart = useResetRecoilState(cartState);
    const { showNotification } = useNotification();

    const addToCart = (product) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showNotification({
            type: 'success',
            message: `${product.title} added to cart`
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        resetCart();
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };
};
/*
import { useRecoilState, useResetRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms';
import { useNotification } from './useNotification';

export const useCartActions = () => {
    const [cart, setCart] = useRecoilState(cartState);
    const resetCart = useResetRecoilState(cartState);
    const { showNotification } = useNotification();

    const addToCart = (product) => {
        setCart(prev => {
            const existingItem = prev.find(item =>
                item.id === product.id &&
                (!product.size || item.size === product.size)
            );

            if (existingItem) {
                const updatedCart = prev.map(item =>
                    item.id === product.id &&
                        (!product.size || item.size === product.size)
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
                showNotification({
                    type: 'info',
                    message: `${product.title || product.description} quantity updated in cart`
                });
                return updatedCart;
            }

            showNotification({
                type: 'success',
                message: `${product.title || product.description} added to cart`
            });
            return [...prev, {
                ...product,
                quantity: product.quantity || 1
            }];
        });
    };

    const removeFromCart = (productId, size) => {
        setCart(prev => prev.filter(item =>
            !(item.id === productId && (!size || item.size === size))
        ));
        showNotification({
            type: 'info',
            message: 'Item removed from cart'
        });
    };

    const updateQuantity = (productId, quantity, size) => {
        const newQuantity = Math.max(1, Math.min(99, parseInt(quantity) || 1));

        setCart(prev =>
            prev.map(item =>
                item.id === productId &&
                    (!size || item.size === size)
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        resetCart();
        showNotification({
            type: 'info',
            message: 'Cart cleared'
        });
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};*/


//or

/*import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms';
import { useNotification } from './useNotification';

export const useCartActions= () => {
    const [cart, setCart] = useRecoilState(cartState);
    const { showNotification } = useNotification();

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find(item => item.id === product.id);
            if (existingItem) {
                showNotification({
                    type: 'info',
                    message: `${product.description} quantity updated in cart`
                });
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            showNotification({
                type: 'success',
                message: `${product.description} added to cart`
            });
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
        showNotification({
            type: 'info',
            message: 'Item removed from cart'
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};*/
