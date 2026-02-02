import { useState } from 'react';
import { Prueba } from './Prueba';
import { SideBar } from './SideBar';

export const Main = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            <SideBar isOpen={isSidebarOpen} />
            <div className="flex-grow">
                <Prueba toggleSidebar={toggleSidebar} />
            </div>
        </div>
    );
};
