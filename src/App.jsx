import React from 'react';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import AppRouter from './routes/AppRouter';
import { ToastProvider } from './hooks/useToast.jsx';

function App() {
    const toast = useRef(null);

    return (
        <ToastProvider toast={toast}>
            <Toast ref={toast} />
            <AppRouter />
        </ToastProvider>
    );
}

export default App;