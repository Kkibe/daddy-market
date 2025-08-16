import {
    useRecoilState,
    useRecoilValue,
    useRecoilValueLoadable
} from 'recoil';
import {
    productsState,
    cartState,
    wishlistState,
    filterState
} from '../recoil/atoms';
import {
    productSelector,
    filteredProductsSelector,
    isInWishlistSelector,
    isInCartSelector
} from '../recoil/selectors';
import { productService } from '../../firebase';
import { useCart } from './useCart';
import { useWishlist } from './useWishlist';

export const useProduct = () => {
    const [products, setProducts] = useRecoilState(productsState);
    const [filter, setFilter] = useRecoilState(filterState);
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
    const { wishlist, toggleWishlistItem } = useWishlist();
    const filteredProducts = useRecoilValue(filteredProductsSelector);

    const fetchProducts = async () => {
        try {
            const products = await productService.getProducts();
            setProducts(products);
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    };

    const fetchProductById = async (productId) => {
        try {
            const product = await productService.getProduct(productId);
            return product;
        } catch (error) {
            console.error("Error fetching product:", error);
            return null;
        }
    };

    const getProduct = (productId) => {
        const productLoadable = useRecoilValueLoadable(productSelector(productId));
        return {
            loading: productLoadable.state === 'loading',
            error: productLoadable.state === 'hasError' ? productLoadable.contents : null,
            product: productLoadable.state === 'hasValue' ? productLoadable.contents : null
        };
    };

    const updateFilter = (newFilter) => {
        setFilter(prev => ({ ...prev, ...newFilter }));
    };

    const resetFilter = () => {
        setFilter({
            category: 'all',
            priceRange: [0, 1000],
            sortBy: 'price-asc',
            searchQuery: '',
        });
    };

    const isInWishlist = (productId) => useRecoilValue(isInWishlistSelector(productId));
    const isInCart = (productId) => useRecoilValue(isInCartSelector(productId));

    return {
        products,
        filteredProducts,
        filter,
        updateFilter,
        resetFilter,
        fetchProducts,
        fetchProductById,
        getProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlistItem,
        isInWishlist,
        isInCart,
        cart,
        wishlist
    };
};