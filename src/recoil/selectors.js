import { selector, selectorFamily } from 'recoil';
import {
    cartState,
    filterState,
    productsState,
    userState,
    wishlistState,
    ordersState,
    searchState
} from './atoms';
import { products as localProducts } from '../../data';

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
        const shipping = subtotal > 100 ? 0 : 10;
        const discount = 0;
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
        const remoteProducts = get(productsState);
        const filter = get(filterState);
        const searchQuery = get(searchState).toLowerCase().trim();

        const source = remoteProducts.length > 0 ? remoteProducts : localProducts;

        return source
            .filter(product =>
                filter.category === 'all' || (product.categories && product.categories.includes(filter.category))
            )
            .filter(product =>
                product.price >= filter.priceRange[0] &&
                product.price <= filter.priceRange[1]
            )
            .filter(product => {
                if (!searchQuery) return true;
                const title = (product.title || '').toLowerCase();
                const desc = (product.description || '').toLowerCase();
                const cats = (product.categories || []).join(' ').toLowerCase();
                return title.includes(searchQuery) || desc.includes(searchQuery) || cats.includes(searchQuery);
            })
            .sort((a, b) => {
                if (filter.sortBy === 'price-asc') return a.price - b.price;
                if (filter.sortBy === 'price-desc') return b.price - a.price;
                if (filter.sortBy === 'rating') return (b.rating || b.stars || 0) - (a.rating || a.stars || 0);
                if (filter.sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
                return 0;
            });
    },
});

export const productSelector = selectorFamily({
    key: 'productSelector',
    get: (productId) => async () => {
        const product = localProducts.find(p => p.id === productId);
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
        const orders = get(ordersState);
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
