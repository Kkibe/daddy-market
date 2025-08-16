import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { authService } from '../../firebase';

const { persistAtom } = recoilPersist({
    key: 'ecommerce-persist',
    storage: localStorage,
});

export const productsState = atom({
    key: 'productsState',
    default: [],
});

export const userState = atom({
    key: 'userState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const cartState = atom({
    key: 'cartState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const wishlistState = atom({
    key: 'wishlistState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const ordersState = atom({
    key: 'ordersState',
    default: [],
});

export const filterState = atom({
    key: 'filterState',
    default: {
        category: 'all',
        priceRange: [0, 1000],
        sortBy: 'price-asc',
        searchQuery: '',
    },
    effects_UNSTABLE: [persistAtom],
});

export const searchState = atom({
    key: 'searchState',
    default: '',
});

export const themeState = atom({
    key: 'themeState',
    default: 'light',
    effects_UNSTABLE: [persistAtom],
});

export const notificationState = atom({
    key: 'notificationState',
    default: {
        isVisible: false,
        type: null,
        message: null,
    },
});

export const authState = atom({
    key: 'authState',
    default: {
        user: null,
        isLoading: true,
        error: null
    },
    effects: [
        ({ setSelf, onSet }) => {
            const unsubscribe = authService.onAuthChange((user) => {
                setSelf({
                    user,
                    isLoading: false,
                    error: null
                });
            });

            onSet((newValue) => {
                if (!newValue.user) {
                    // User logged out
                    //cartState.init([]);
                    //wishlistState.init([]);
                }
            });

            return () => unsubscribe();
        }
    ]
});