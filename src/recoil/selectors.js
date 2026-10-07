import { selector, selectorFamily } from 'recoil';
import {
    cartState,
    filterState,
    productsState,
    userState,
    wishlistState,
    ordersState
} from './atoms';
import { orderService, productService } from '../../firebase';

export const userNameSelector = selector({
    key: 'userNameSelector',
    get: ({ get }) => {
        const user = get(userState);
        return user?.displayName || user?.name || '';
    },
});

export const isPremiumSelector = selector({
    key: 'isPremiumSelector',
    get: ({ get }) => {
        const user = get(userState);
        return user?.isPremium || false;
    },
});

export const cartTotalSelector = selector({
    key: 'cartTotalSelector',
    get: ({ get }) => {
        const cart = get(cartState);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const discount = 0; // Can be calculated based on coupons
        const total = subtotal - discount + shipping;
        const totalQuantity = cart.reduce((count, item) => count + item.quantity, 0);
        const uniqueItemsCount = cart.length;

        return {
            subtotal,
            shipping,
            discount,
            total,
            totalQuantity,
            uniqueItemsCount,
            itemCount: cart.reduce((count, item) => count + item.quantity, 0)
        };
    }
});

export const filteredProductsSelector = selector({
    key: 'filteredProductsSelector',
    get: ({ get }) => {
        const products = get(productsState);
        const filter = get(filterState);

        return products
            .filter(product =>
                filter.category === 'all' || product.category === filter.category
            )
            .filter(product =>
                product.price >= filter.priceRange[0] &&
                product.price <= filter.priceRange[1]
            )
            .filter(product =>
                //product.description.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
                //product.description.toLowerCase().includes(filter.searchQuery.toLowerCase())
                product.description.includes(filter.searchQuery)
            )
            .sort((a, b) => {
                if (filter.sortBy === 'price-asc') return a.price - b.price;
                if (filter.sortBy === 'price-desc') return b.price - a.price;
                if (filter.sortBy === 'rating') return b.rating - a.rating;
                if (filter.sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
                return 0;
            });
    },
});

export const productSelector = selectorFamily({
    key: 'productSelector',
    get: (productId) => async () => {
        const product = await productService.getProduct(productId);
        return product;
    },
});

export const isInWishlistSelector = selectorFamily({
    key: 'isInWishlistSelector',
    get: (productId) => ({ get }) => {
        const wishlist = get(wishlistState);
        return wishlist.includes(productId);
    }
});

export const isInCartSelector = selectorFamily({
    key: 'isInCartSelector',
    get: (productId) => ({ get }) => {
        const cart = get(cartState);
        return cart.some(item => item.id === productId);
    }
});

export const userOrdersSelector = selector({
    key: 'userOrdersSelector',
    get: async ({ get }) => {
        const user = get(userState);
        if (!user) return [];
        const orders = await orderService.getUserOrders(user.uid);
        return orders;
    },
});

export const isAuthenticatedSelector = selector({
    key: 'isAuthenticatedSelector',
    get: ({ get }) => {
        const auth = get(userState);
        return !!auth?.uid;
    }
});