import React from 'react';
import { Button } from 'primereact/button';

export const SideBar = ({ isOpen }) => {
    return (
        <div className={`fixed top-0 left-0 h-full w-64 bg-gray-100 p-4 shadow-md transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <div className="mb-6">
                <h1 className="text-purple-600 text-2xl font-bold">EvaluaTec</h1>
            </div>
            <ul>
                <li className="mb-4 flex items-center space-x-2 cursor-pointer">
                    <i className="pi pi-users"></i>
                    <span>Users</span>
                </li>
                <li className="mb-4 flex items-center space-x-2 cursor-pointer">
                    <i className="pi pi-file"></i>
                    <span>Interviews</span>
                </li>
                <li className="mb-4 flex items-center space-x-2 cursor-pointer">
                    <i className="pi pi-question-circle"></i>
                    <span>Questions</span>
                </li>
                <li className="mb-4 flex items-center space-x-2 cursor-pointer">
                    <i className="pi pi-chart-line"></i>
                    <span>Results</span>
                </li>
                <li className="mb-4 flex items-center space-x-2 cursor-pointer">
                    <i className="pi pi-cog"></i>
                    <span>Dashboard</span>
                </li>
            </ul>
            <div className="mt-auto">
                <Button label="Logout" icon="pi pi-sign-out" className="p-button-danger w-full" />
            </div>
        </div>
    );
};
