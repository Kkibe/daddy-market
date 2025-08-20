import { useRecoilState } from 'recoil';
import { ordersState } from '../recoil/atoms';
import { orderService } from '../../firebase';
import { useNotification } from './useNotification';
import { useCartActions} from './useCartActions';

export const useOrder = () => {
    const [orders, setOrders] = useRecoilState(ordersState);
    const { showNotification } = useNotification();
    const { cart, clearCart } = useCart();

    const createOrder = async (orderData) => {
        try {
            const result = await orderService.createOrder(orderData);
            if (result.success) {
                setOrders(prev => [...prev, { id: result.orderId, ...orderData }]);
                clearCart();
                showNotification({
                    type: 'success',
                    message: 'Order placed successfully!'
                });
                return result;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            showNotification({
                type: 'error',
                message: `Failed to place order: ${error.message}`
            });
            return { success: false, error: error.message };
        }
    };

    const fetchUserOrders = async (userId) => {
        try {
            const userOrders = await orderService.getUserOrders(userId);
            setOrders(userOrders);
            return userOrders;
        } catch (error) {
            showNotification({
                type: 'error',
                message: `Failed to fetch orders: ${error.message}`
            });
            return [];
        }
    };

    return {
        orders,
        createOrder,
        fetchUserOrders
    };
};