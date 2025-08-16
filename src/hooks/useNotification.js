import { useRecoilState } from 'recoil';
import { notificationState } from '../recoil/atoms';

export const useNotification = () => {
    const [notification, setNotification] = useRecoilState(notificationState);

    const showNotification = ({ type, message, duration = 3000 }) => {
        setNotification({
            isVisible: true,
            type,
            message
        });

        if (duration) {
            setTimeout(() => {
                hideNotification();
            }, duration);
        }
    };

    const hideNotification = () => {
        setNotification({
            isVisible: false,
            type: null,
            message: null
        });
    };

    return {
        notification,
        showNotification,
        hideNotification
    };
};