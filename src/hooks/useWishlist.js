import { useRecoilState } from 'recoil';
import { wishlistState } from '../recoil/atoms';
import { useNotification } from './useNotification';

export const useWishlist = () => {
    const [wishlist, setWishlist] = useRecoilState(wishlistState);
    const { showNotification } = useNotification();

    const toggleWishlistItem = (productId, productTitle) => {
        setWishlist(current => {
            const isInWishlist = current.includes(productId);
            if (isInWishlist) {
                showNotification({
                    type: 'info',
                    message: `${productTitle} removed from wishlist`
                });
                return current.filter(id => id !== productId);
            } else {
                showNotification({
                    type: 'success',
                    message: `${productTitle} added to wishlist`
                });
                return [...current, productId];
            }
        });
    };

    const isInWishlist = (productId) => wishlist.includes(productId);

    const clearWishlist = () => {
        setWishlist([]);
    };

    return {
        wishlist,
        toggleWishlistItem,
        isInWishlist,
        clearWishlist
    };
};