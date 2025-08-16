// hooks/useAuth.js
import { useRecoilState, useResetRecoilState } from 'recoil';
import { authState, cartState, wishlistState } from '../recoil/atoms';
import { authService } from '../../firebase';

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const resetCart = useResetRecoilState(cartState);
    const resetWishlist = useResetRecoilState(wishlistState);

    const signUp = async (email, password, userData) => {
        setAuth(prev => ({ ...prev, isLoading: true }));
        const result = await authService.createUser(email, password, userData);
        setAuth({
            user: result.success ? result.user : null,
            isLoading: false,
            error: result.success ? null : result.error
        });
        return result;
    };

    const signIn = async (email, password) => {
        setAuth(prev => ({ ...prev, isLoading: true }));
        const result = await authService.signInUser(email, password);
        setAuth({
            user: result.success ? result.user : null,
            isLoading: false,
            error: result.success ? null : result.error
        });
        return result;
    };

    const signInWithGoogle = async () => {
        setAuth(prev => ({ ...prev, isLoading: true }));
        const result = await authService.signInWithGoogle();
        setAuth({
            user: result.success ? result.user : null,
            isLoading: false,
            error: result.success ? null : result.error
        });
        return result;
    };

    const logout = async () => {
        setAuth(prev => ({ ...prev, isLoading: true }));
        const result = await authService.signOutUser();

        // Reset cart and wishlist on logout
        resetCart();
        resetWishlist();

        setAuth({
            user: null,
            isLoading: false,
            error: result.success ? null : result.error
        });
        return result;
    };

    return {
        ...auth,
        signUp,
        signIn,
        signInWithGoogle,
        logout
    };
};