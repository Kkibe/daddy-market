import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms';
import { useNotification } from './useNotification';

export const useCart = () => {
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
};