import React, { useState } from 'react';
import sidebarConfig from '../../config/sidebarConfig';
import SidebarSection from './SidebarSection';
import redonaLogo from '../../assets/redona_logo.png';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="w-[240px] h-screen flex flex-col bg-white border-r border-gray-200 shadow-sm">
            {/* Menú */}
            <div className="flex-1 overflow-y-auto p-3">
                <div className="flex justify-center items-center px-4 py-4 border-b border-gray-100">
                    <img src={redonaLogo} alt="Logo" className="h-8 w-auto object-contain" />
                </div>

                {sidebarConfig.map((item, index) => (
                    <SidebarSection
                        key={item.label}
                        item={item}
                        activeIndex={activeIndex === index ? 0 : null}
                        onTabChange={() => setActiveIndex(activeIndex === index ? null : index)}
                    />
                ))}

            </div>

        </div>

    );
};

export default Sidebar;

