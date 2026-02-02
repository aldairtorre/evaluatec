import React from 'react';
import { Button } from 'primereact/button';

export const Prueba = ({ toggleSidebar }) => {
    return (
        <nav className="bg-white p-4 shadow-md flex justify-between items-center">
            <Button icon="pi pi-bars" className="p-button-text" onClick={toggleSidebar} />
            <div className="flex items-center space-x-2">
                <i className="pi pi-user text-xl"></i>
                <div className="text-right">
                    <p className="text-gray-800">Juan José Bedolla Solano</p>
                    <p className="text-purple-600">Administrator</p>
                </div>
            </div>
        </nav>
    );
};
