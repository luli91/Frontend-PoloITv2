import { useContext, createContext } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children, toast }) => {
    return (
        <ToastContext.Provider value={toast}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};