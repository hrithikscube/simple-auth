import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastMessage = (message, type = 'success') => {
    const options = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        case 'info':
            toast.info(message, options);
            break;
        case 'warning':
            toast.warn(message, options);
            break;
        default:
            toast(message, options);
    }
};
