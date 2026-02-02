import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import 'primeflex/primeflex.css';
import '../../../css/app.css'

import { Login } from './Login';
import { UserProvider } from '../context/UserContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('login')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <Login />
            </UserProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
